const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const handleRoute = require('./routes/index');
require('dotenv').config();
const port = process.env.PORT;
const dbUrl = process.env.DB;
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174','http://localhost:5175'];
const corsOptions = {
  origin: function (origin, callback) {
   
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', handleRoute);

mongoose.connect(dbUrl)
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(port, () => console.log(`server started at http://localhost:${port}`));
  })
  .catch(e => console.log(e));
