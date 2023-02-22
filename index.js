require('dotenv').config();

const express = require('express');
const cors = require('cors');
const favicon = require('serve-favicon');
const fs = require('fs');
const {port, apiURL} = require('./utils');
const versions = require('./src/versions/emoji-versions.json');
const emoji_paths = require('./src/paths/emoji-paths.json');
const emoji = require('./src/emojis/emojis.json');
const last_update = require('./src/last_update/last_update.json');
const path = require('path');

const app = express();

app.use(favicon(`${__dirname}/favicon.ico`));
app.use(cors());

app.get('/', (req, res) => {
	res.json({
		status: true,
		last_update,
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
		result: emoji_paths,
	});
});

app.get('/emojis', (req, res) => {
	res.json({
		status: true,
		result: emoji,
	});
});

fs.readdir(`${__dirname}/src/emojis`, (err, files) => {
	if (err) {
		return console.log('Error when reading emojis/ directory!');
	}

	const emojisJSON = files.filter(file => path.extname(file) === '.json');

	emojisJSON.forEach(emojiJSON => {
		const version = emojiJSON.replace(/emojis-|.json/gi, '');

		app.get(`/emojis/${version}`, (req, res) => {
			res.json(require(`./src/emojis/${emojiJSON}`));
		});
	});
});

app.listen(port, () => {
	console.log(`Running on ${apiURL}`);
});

