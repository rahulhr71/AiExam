import React, { useState } from "react";
import axios from "axios";

function Tool() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    for (let file of files) {
      formData.append("images", file);
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/ocr", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResults(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Error processing OCR");
    }
    setLoading(false);
  };

  const downloadCSV = () => {
    if (results.length === 0) {
      alert("No data to export.");
      return;
    }

    const csvHeader = "File Name,Recognized Text\n";
    const csvRows = results.map(
      (r) =>
        `"${r.fileName.replace(/"/g, '""')}","${r.text.replace(/"/g, '""')}"`
    );
    const csvContent = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "hindi_ocr_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Hindi Handwriting OCR to CSV</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload & Convert"}
      </button>
      <button onClick={downloadCSV} style={{ marginLeft: "10px" }}>
        Download CSV
      </button>

      {results.length > 0 && (
        <table
          border="1"
          style={{ marginTop: "20px", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>File Name</th>
              <th>Recognized Text</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.fileName}</td>
                <td>{r.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Tool;
