const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { createWorker } = require('tesseract.js');
const fs = require('fs');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });
const worker = createWorker({
  logger: m => console.log(m),
});

async function initOCR() {
  await worker.load();
  await worker.loadLanguage('hin');
  await worker.initialize('hin');
}

initOCR().then(() => {
  console.log("OCR engine ready!");
});

// OCR endpoint
app.post('/ocr', upload.array('images'), async (req, res) => {
  const results = [];
  try {
    for (const file of req.files) {
      const tempWorker = createWorker({ logger: m => console.log(m) });
      await tempWorker.load();
      await tempWorker.loadLanguage('hin');
      await tempWorker.initialize('hin');
      const { data: { text } } = await tempWorker.recognize(file.path);
      results.push({ fileName: file.originalname, text: text.trim() });
      await tempWorker.terminate();
      fs.unlinkSync(file.path);
    }
    res.json({ success: true, data: results });
  } catch (err) {
    // Clean up uploaded files on error
    req.files.forEach(file => {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    });
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
