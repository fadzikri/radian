const fs = require('fs');
const emojiRegex = require('emoji-regex');
const {baseURL} = require('../../utils');

const getHTMLEmojiText = () => {
	const emojiPathsRaw = fs.readFileSync(`${__dirname}/../paths/emoji-paths.json`);
	const emojiPathsData = JSON.parse(emojiPathsRaw);

	emojiPathsData.forEach(async data => {
		try {
			const emojiPage = await fetch(`${baseURL}/${data.version}/${data.filename}`);
			const emojiFile = await emojiPage.text();

			fs.writeFile(`${__dirname}/emojis-${data.version}.txt`, emojiFile, 'utf-8', err => {
				if (err) {
					console.log(err);
				} else {
					console.log('Emojis Text Downloaded!');
				}
			});
		} catch (err) {
			console.log(err);
			console.log('Error when fetch data from origin server.');
		}
	});
};

const createJSONEmojiText = () => {
	const emojisNamesRaw = fs.readFileSync(filenameEmoji);
	const emojisNames = JSON.parse(emojisNamesRaw);
	const emoji = [];

	emojisNames.forEach((data, i) => {
		const fileEmojiText = data.replace(/html/ig, 'txt');
		const emojiObject = {};
		const emojiDataArray = [];

		emojiObject.version = fileEmojiText.replace(/emojis-|.txt/ig, '');

		try {
			let emojiTextData = fs.readFileSync(`${Dirs.dirEmoji}/${fileEmojiText}`, 'utf-8');
			emojiTextData = emojiTextData.replace(/.+non-fully-qualified.+/g, '');
			emojiTextData = emojiTextData.replace(/.+minimally-qualified.+/g, '');
			emojiTextData = emojiTextData.replace(/.+unqualified.+/g, '');
			const regex = emojiRegex();

			for (const match of emojiTextData.matchAll(regex)) {
				emojiDataArray.push(match[0]);
			}
		} catch (err) {
			console.log('Error when create JSON file.');
		}

		emojiObject.emoji = emojiDataArray;
		emojiObject.unicode = null;

		emoji.push(emojiObject);
	});

	fs.writeFile(`${Dirs.dirEmoji}/${Utils.nameFileEmoji}.json`, JSON.stringify(emoji), 'utf-8', (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Emojis JSON Created!');
		}
	});
};

module.exports = {getHTMLEmojiText, createJSONEmojiText};
