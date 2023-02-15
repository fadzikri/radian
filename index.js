const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const {apiURL, baseURL} = require('./utils');
const versions = require('./src/versions/emoji-versions.json');
const emoji_paths = require('./src/paths/emoji-paths.json');
const emoji = require('./src/emojis/emojis.json');

const app = express();
const port = 3000;

app.use(favicon(`${__dirname}/favicon.ico`));
app.use(cors());

app.get('/', (req, res) => {
	res.json({
		status: true,
		versions: `${apiURL}/versions`,
		emojis_path: `${apiURL}/emoji_paths`,
		emojis: `${apiURL}/emojis`,
	});
});

app.get('/versions', (req, res) => {
	res.json({
		status: true,
		result: versions,
	});
});

app.get('/emoji_paths', (req, res) => {
	res.json({
		status: true,
		url_origin: `${baseURL}/{version}/`,
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
