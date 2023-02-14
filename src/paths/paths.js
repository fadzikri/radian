const fs = require('fs');
const {Dirs, Utils} = require('../../utils.js');
const pretty = require('pretty');
const {load} = require('cheerio');

const {baseURL} = Utils;
const dirEmojiPathHTML = `${Dirs.dirPath}/${Utils.nameFileEmoji}`;
const fileEmojiVersionJSON = `${Dirs.dirVersion}/${Utils.nameFileVersion}.json`;

const getEmojisPathTxt = () => {
	fs.readFile(fileEmojiVersionJSON, (err, data) => {
		if (err) {
			return console.log('Error when reading file JSON');
		}

		const parsedData = JSON.parse(data);
		const name = parsedData.versions;
		const {links} = parsedData;

		try {
			links.forEach(async (link, i) => {
				const rawData = await fetch(`${baseURL}/${link}`);
				const textData = await rawData.text();

				fs.writeFile(`${dirEmojiPathHTML}-${name[i]}.html`, pretty(textData), 'utf-8', err => {
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

const createJSONEmojiPathTxt = () => {
	const emojisVersionRaw = fs.readFileSync(fileEmojiVersionJSON);
	const emojisVersionData = JSON.parse(emojisVersionRaw);
	const emojiVersion = emojisVersionData.versions;

	fs.readFile(`${Dirs.dirVersion}/${Utils.nameFilename}.json`, 'utf-8', (err, data) => {
		if (err) {
			return console.log('Error when reading JSON file.');
		}

		const files = JSON.parse(data);

		const arrayFilesEmojiTXTs = [];

		files.forEach((file, i) => {
			const arrayFilesEmojiTXT = {};

			const $ = load(fs.readFileSync(`${Dirs.dirPath}/${file}`));
			let fileTXTs = $('td a');
			fileTXTs = $(fileTXTs).slice(1, fileTXTs.length);

			let arrayFilesEmojiSelection = null;

			fileTXTs.each((i, fileTXT) => {
				const fileTxt = $(fileTXT).text();

				if (Utils.prioritye.low === fileTxt) {
					arrayFilesEmojiSelection = fileTxt;
				} else
				if (Utils.priority.medium === fileTxt) {
					arrayFilesEmojiSelection = fileTxt;
				} else
				if (Utils.priority.high === fileTxt) {
					arrayFilesEmojiSelection = fileTxt;
				}
			});

			arrayFilesEmojiTXT.version = emojiVersion[i];
			arrayFilesEmojiTXT.filename = arrayFilesEmojiSelection;

			arrayFilesEmojiTXTs.push(arrayFilesEmojiTXT);
		});

		fs.writeFile(`${Dirs.dirPath}/${Utils.nameFileEmojiPath}.json`,
			JSON.stringify(arrayFilesEmojiTXTs),
			'utf-8',
			err => {
				if (err) {
					console.log('Error when create JSON file.');
				} else {
					console.log('Emoji Path JSON Created!');
				}
			});
	});
};

module.exports = {getEmojisPathTxt, createJSONEmojiPathTxt};
