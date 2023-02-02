'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const qr=require('qr-image');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Home Post',
    code: 200
  })
});

app.get('/qr', function (req, res) {
    const url = req.query.url;

  if (!url) {
    return res.status(400).send("Please provide a URL");
  }

  const code = qr.imageSync(url, { type: "png" });

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Disposition", `attachment; filename="qr.png"`);
  res.send(code);
});

function start(port) {
  app.listen(port, () => console.log(`Up an running on port ${port}`));
}

module.exports = {
  start,
  app
};