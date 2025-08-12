const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { createWorker } = require('tesseract.js');
const fs = require('fs');

const app = express();
app.use(cors());

// Multer storage
const upload = multer({ dest: 'uploads/' });

// OCR worker for Hindi
const worker = createWorker({
  logger: m => console.log(m), // progress logging
});

(async () => {
  await worker.load();
  await worker.loadLanguage('hin');
  await worker.initialize('hin');
})();

// OCR endpoint
app.post('/ocr', upload.array('images'), async (req, res) => {
  try {
    let results = [];
    for (const file of req.files) {
      const { data: { text } } = await worker.recognize(file.path);
      results.push({
        fileName: file.originalname,
        text: text.trim()
      });
      fs.unlinkSync(file.path); // cleanup uploaded file
    }
    res.json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
