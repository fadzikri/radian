const fs = require('fs');
const pretty = require('pretty');
const {load} = require('cheerio');
const {priority, baseURL} = require('../../utils');

const emojiVersions = `${__dirname}/../versions/emoji-versions.json`;
const numVersions = [];

const getHTMLEmojisPath = () => {
	fs.readFile(emojiVersions, (err, data) => {
		if (err) {
			return console.log('Error when reading emoji-versions.json!');
		}

		const parsedData = JSON.parse(data);

		parsedData.forEach(async (data, i) => {
			const {version, link} = data;

			numVersions.push(version);

			try {
				const webPage = await fetch(link);
				const htmlPage = await webPage.text();

				fs.writeFile(`${__dirname}/emojis-${numVersions[i]}.html`, pretty(htmlPage), 'utf-8', err => {
					if (err) {
						console.log(err);
					} else {
						console.log(`emojis-${numVersions[i]}.html Downloaded!`);
					}
				});
			} catch (err) {
				console.log(err);
				console.log(`Error when fetch data from ${link}!`);
			}
		});
	});
};

const createJSONEmojiPath = () => {
	fs.readFile(`${__dirname}/../versions/filenames.json`, 'utf-8', (err, data) => {
		if (err) {
			return console.log('Error when reading filenames.json!');
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

			arrayPath.version = numVersions[i];
			arrayPath.filename = `${baseURL}/${numVersions[i]}/${fileEmoji}`;

			result.push(arrayPath);
		});

		fs.writeFile(`${__dirname}/emoji-paths.json`, JSON.stringify(result), 'utf-8', err => {
			if (err) {
				console.log('Error when create emoji-paths.json!');
			} else {
				console.log('emoji-paths.json Created!');
			}
		});
	});
};

module.exports = {getHTMLEmojisPath, createJSONEmojiPath};
