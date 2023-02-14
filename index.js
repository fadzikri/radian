const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const path = require('path');
const {Utils} = require('./utils.js');
const versions = require('./src/versions/emoji-versions.json');
const emoji_paths = require('./src/paths/emoji-paths.json');
const emoji = require('./src/emojis/emojis.json');

const app = express();
const port = 3000;

app.use(favicon(`${path.resolve()}/favicon.ico`));
app.use(cors());

app.get('/', (req, res) => {
	res.json({
		status: true,
		versions: `${Utils.apiURL}/versions`,
		emojis_path: `${Utils.apiURL}/emoji_paths`,
		emojis: `${Utils.apiURL}/emojis`,
	});
});

app.get('/versions', (req, res) => {
	res.json({
		status: true,
		url_origin: `${Utils.baseURL}/`,
		result: versions,
	});
});

app.get('/emoji_paths', (req, res) => {
	res.json({
		status: true,
		url_origin: `${Utils.baseURL}/{versions.links}/`,
		result: emoji_paths,
	});
});

app.get('/emojis', (req, res) => {
	res.json({
		status: true,
		result: emoji,
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
