import React, { useState, useRef } from "react";
import { createWorker } from "tesseract.js";

export default function Tool() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]); // {name, text, status, progress}
  const [running, setRunning] = useState(false);
  const workerRef = useRef(null);

  // Accept multiple images
  const onFiles = (fileList) => {
    const arr = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    const mapped = arr.map((f) => ({ name: f.name, file: f, text: "", status: "idle", progress: 0 }));
    setFiles((s) => [...s, ...mapped]);
    setResults((r) => [...r, ...mapped.map(m => ({...m}))]);
  };

  const removeFile = (index) => {
    setFiles((s) => s.filter((_, i) => i !== index));
    setResults((r) => r.filter((_, i) => i !== index));
  };

  const startOCR = async () => {
    if (!files.length) return alert("Please upload at least one image.");
    setRunning(true);

    // Create worker once
    const worker = createWorker({
      logger: (m) => {
        // m looks like { status, progress }
        if (m.status === "recognizing text") {
          // map global progress roughly to current file
          // We rely on per-job progress updates below too
        }
      },
    });

    workerRef.current = worker;

    try {
      await worker.load();
      // Load Hindi language. We use "hin" code. langPath points to a public tessdata host.
      // If you wish to host traineddata yourself, update langPath accordingly.
      await worker.loadLanguage("hin");
      await worker.initialize("hin");

      const newResults = [];

      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        // update result status
        setResults((r) => r.map((it, idx) => idx === i ? { ...it, status: 'processing', progress: 0 } : it));

        // Each recognize call accepts a File or URL
        await worker.setParameters({ tessedit_pageseg_mode: "3" }); // automatic page segmentation

        const { data } = await worker.recognize(f.file, {
          lang: "hin",
          // You can pass a custom tessedit config via worker.setParameters
        }, (m) => {
          // progress callback
          if (m && (m.status === "recognizing text" || m.status === "loaded")) {
            const prog = Math.round((m.progress || 0) * 100);
            setResults((r) => r.map((it, idx) => idx === i ? { ...it, progress: prog } : it));
          }
        });

        const text = data.text || "";
        newResults.push({ name: f.name, text, status: "done", progress: 100 });
        setResults((r) => r.map((it, idx) => idx === i ? { ...it, text, status: 'done', progress: 100 } : it));
      }

      setRunning(false);
      // keep worker alive in case user wants more runs; terminate to free memory
      await worker.terminate();
      workerRef.current = null;
    } catch (err) {
      console.error(err);
      alert("OCR failed: " + err.message);
      setRunning(false);
      if (workerRef.current) {
        await workerRef.current.terminate();
        workerRef.current = null;
      }
    }
  };

  const downloadCSV = () => {
    // Prepare CSV rows. We use simple line-per-file, column-per-line approach.
    // You may want to parse text into structured columns depending on your documents.

    const header = ["filename", "extracted_text"].join(",") + "\n";
    const body = results.map(r => {
      // escape double quotes and wrap text in quotes
      const safeText = '"' + (r.text || '').replace(/"/g, '""') + '"';
      return `${r.name},${safeText}`;
    }).join("\n");

    const csv = header + body;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setFiles([]);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-[#152259] mb-4">Hindi Handwriting → CSV (Web)</h1>

        <div className="mb-4">
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => onFiles(e.target.files)}
            className="mb-2"
          />
          <div className="text-sm text-gray-600">Upload one or more images (JPG/PNG). For best results, use clear photos or scans.</div>
        </div>

        <div className="space-y-3">
          {files.map((f, idx) => (
            <div key={idx} className="flex items-start justify-between border rounded p-3">
              <div className="w-2/3">
                <div className="font-medium">{f.name}</div>
                <div className="text-xs text-gray-600">Status: {results[idx]?.status || 'idle'}</div>
                <div className="mt-2 text-sm whitespace-pre-wrap max-h-28 overflow-auto bg-gray-50 p-2 rounded">{results[idx]?.text || ''}</div>
              </div>
              <div className="w-1/3 flex flex-col items-end">
                <div className="w-36 h-3 bg-gray-200 rounded overflow-hidden mb-2">
                  <div style={{ width: `${results[idx]?.progress || 0}%` }} className="h-full bg-green-500"></div>
                </div>
                <button onClick={() => removeFile(idx)} className="text-sm text-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={startOCR}
            disabled={running || !files.length}
            className={`px-4 py-2 rounded text-white ${running || !files.length ? 'bg-gray-400' : 'bg-[#152259] hover:bg-blue-800'}`}
          >
            {running ? 'Processing...' : 'Start OCR'}
          </button>

          <button
            onClick={downloadCSV}
            disabled={!results.length || results.every(r => r.status !== 'done')}
            className={`px-4 py-2 rounded text-white ${!results.length ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
          >
            Download CSV
          </button>

          <button onClick={clearAll} className="px-4 py-2 rounded border">Clear</button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Notes: This app runs Tesseract in the browser using the Hindi model ("hin"). Accuracy for handwriting varies — for best results use clear, high-contrast scans. If you need server-side processing for better speed/accuracy, I can provide that too.
        </div>
      </div>
    </div>
  );
}
