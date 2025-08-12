import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { createWorker } from 'tesseract.js';
import fs from 'fs';

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });
const worker = createWorker({ logger: m => console.log(m) });

await worker.load();
await worker.loadLanguage('hin');
await worker.initialize('hin');

// ... rest of code
