// backend/index.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { createWorker } = require("tesseract.js");
const path = require("path");

const app = express();
app.use(cors());

// multer config
const upload = multer({ dest: path.join(__dirname, "uploads/") });

// create OCR worker (shared)
const worker = createWorker({
  logger: (m) => {
    if (m && m.status) console.log("TESSERACT:", m);
  },
});

let ocrReady = false;

async function initOCR() {
  try {
    console.log("Loading Tesseract worker...");
    await worker.load();
    // load Hindi traineddata
    await worker.loadLanguage("hin");
    await worker.initialize("hin");
    // optional settings
    await worker.setParameters({
      tessedit_pageseg_mode: "3", // automatic page segmentation
    });
    ocrReady = true;
    console.log("Tesseract (hin) initialized.");
  } catch (err) {
    console.error("Failed to init OCR:", err);
    process.exit(1);
  }
}

// OCR endpoint - returns CSV file as attachment
app.post("/ocr-to-csv", upload.array("images"), async (req, res) => {
  if (!ocrReady) {
    return res.status(503).json({ success: false, message: "OCR engine not ready" });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "No files uploaded" });
  }

  try {
    const results = [];
    for (const file of req.files) {
      console.log("Processing:", file.originalname);

      const { data } = await worker.recognize(file.path, "hin");

      const text = (data && data.text) ? data.text.trim() : "";
      results.push({ fileName: file.originalname, text });

      // remove temp file
      try { fs.unlinkSync(file.path); } catch (e) {}
    }

    // Build CSV (escape quotes)
    const header = `"filename","extracted_text"\n`;
    const body = results.map(r => {
      const safeName = r.fileName.replace(/"/g, '""');
      const safeText = r.text.replace(/"/g, '""');
      return `"${safeName}","${safeText}"`;
    }).join("\n");

    const csv = header + body;

    // Send CSV as attachment
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=hindi_ocr_results.csv");
    res.send(csv);

  } catch (err) {
    console.error("OCR error:", err);
    res.status(500).json({ success: false, error: err.message || err });
  }
});

// Start server after initializing OCR
const PORT = process.env.PORT || 5000;
initOCR().then(() => {
  app.listen(PORT, () => console.log(`OCR server running on http://localhost:${PORT}`));
});
