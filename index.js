import express from 'express';
import cors from 'cors';
import favicon from 'serve-favicon';
import path from "path";
import Utils from "./utils.js";
import versions from "./src/versions/emoji-versions.json" assert { type: "json" };

const app = express();
const port = 3000

app.use(favicon(`${path.resolve()}/favicon.ico`));
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    status: true,
    versions: `${Utils.apiURL}/versions`,
    emojis: `${Utils.apiURL}/emojis`
  });
});

app.get('/versions', (req, res) => {
  res.json({
    status: true,
    result: versions
  });
});

app.get('/emojis', (req, res) => {
  res.json({
    status: true,
    result: null
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})