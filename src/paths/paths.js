const fs = require('fs');
const pretty = require('pretty');
const {load} = require('cheerio');
const {priority} = require('../../utils');

const emojiVersions = `${__dirname}/../versions/emoji-versions.json`;
let numVers = null;

const getHTMLEmojisPath = () => {
	fs.readFile(emojiVersions, (err, data) => {
		if (err) {
			return console.log('Error when reading file JSON');
		}

		const parsedData = JSON.parse(data);
		const {versions: numVersion, links} = parsedData;

		numVers = numVersion;

		try {
			links.forEach(async (link, i) => {
				const webPage = await fetch(link);
				const htmlPage = await webPage.text();

				fs.writeFile(`${__dirname}/emojis-${numVers[i]}.html`, pretty(htmlPage), 'utf-8', err => {
					if (err) {
						console.log(err);
					} else {
						console.log('Emojis Paths HTML Downloaded!');
					}
				});
			});
		} catch (err) {
			console.log(err);
			console.log('Error when fetch data from origin server.');
		}
	});
};

const createJSONEmojiPath = () => {
	fs.readFile(`${__dirname}/../versions/filenames.json`, 'utf-8', (err, data) => {
		if (err) {
			return console.log('Error when reading JSON file.');
		}

		const files = JSON.parse(data);

		const result = [];

		files.forEach((file, i) => {
			const arrayPath = {};

			const $ = load(fs.readFileSync(`${__dirname}/${file}`));
			let fileEmojis = $('td a');
			fileEmojis = $(fileEmojis).slice(1, fileEmojis.length);

			let fileEmoji = null;

			fileEmojis.each((i, fileTXT) => {
				const fileTxt = $(fileTXT).text();

				if (priority.low === fileTxt) {
					fileEmoji = fileTxt;
				} else
				if (priority.medium === fileTxt) {
					fileEmoji = fileTxt;
				} else
				if (priority.high === fileTxt) {
					fileEmoji = fileTxt;
				}
			});

			arrayPath.version = numVers[i];
			arrayPath.filename = fileEmoji;

			result.push(arrayPath);
		});

		fs.writeFile(`${__dirname}/emoji-paths.json`, JSON.stringify(result), 'utf-8', err => {
			if (err) {
				console.log('Error when create JSON file.');
			} else {
				console.log('Emoji Path JSON Created!');
			}
		});
	});
};

module.exports = {getHTMLEmojisPath, createJSONEmojiPath};
