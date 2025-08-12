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
  try {
    let results = [];
    for (const file of req.files) {
      const { data: { text } } = await worker.recognize(file.path);
      results.push({ fileName: file.originalname, text: text.trim() });
      fs.unlinkSync(file.path);
    }
    res.json({ success: true, data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
