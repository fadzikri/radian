const fs = require('fs');
const emojiRegex = require('emoji-regex');
const {apiURL} = require('../../utils');

const emojiFileName = [];

const getHTMLEmojiText = () => {
	const emojiPathsRaw = fs.readFileSync(`${__dirname}/../paths/emoji-paths.json`);
	const emojiPathsData = JSON.parse(emojiPathsRaw);

	emojiPathsData.forEach(async data => {
		try {
			const emojiPage = await fetch(data.filename);
			const emojiFile = await emojiPage.text();

			fs.writeFile(`${__dirname}/emojis-${data.version}.txt`, emojiFile, 'utf-8', err => {
				if (err) {
					console.log(err);
					console.log(`Error when create emojis-${data.version}.txt!`);
				} else {
					console.log(`emojis-${data.version}.txt Downloaded!`);
				}
			});
		} catch (err) {
			console.log(err);
			console.log(`Error when fetch data from ${data.filename}!`);
		}
	});
};

const createJSONEmojiText = () => {
	const emojiFileJSON = fs.readFileSync(`${__dirname}/../versions/filenames.json`);
	const emojiFiles = JSON.parse(emojiFileJSON);

	emojiFiles.forEach(data => {
		const emojiName = data.replace(/.html/ig, '');
		const emojiVersion = emojiName.replace(/emojis-/gi, '');
		const emojis = {};

		emojis.status = true;
		emojis.version = emojiVersion;
		emojis.result = [];

		try {
			const regex = emojiRegex();
			let emojiData = fs.readFileSync(`${__dirname}/${emojiName}.txt`, 'utf-8');
			emojiData = emojiData.replace(/.+non-fully-qualified.+|.+minimally-qualified.+|.+unqualified.+/ig, '');

			const arraysOfEmoji = emojiData.match(regex);
			const arraysOfUnicode = emojiData.match(/^(?:[0-9A-F]{4,5}\s?){1,}(?:;|\s+(?:;|#))/gm);

			arraysOfEmoji.forEach((emoji, i) => {
				const resultEmoji = {};
				const unicode = String(arraysOfUnicode[i]).replace(/;|#/g, '').trim();

				resultEmoji.emoji = emoji;
				resultEmoji.unicode = unicode;

				emojis.result.push(resultEmoji);
			});
		} catch (err) {
			console.log(err);
			console.log(`Error when reading ${emojiName}.txt!`);
		}

		try {
			fs.writeFileSync(`${__dirname}/${emojiName}.json`, JSON.stringify(emojis), 'utf-8');
			console.log(`${emojiName}.json Created!`);
			emojiFileName.push(`${apiURL}/emojis/${emojiVersion}`);
		} catch (err) {
			console.log(err);
			console.log(`Error when create ${emojiName}.json!`);
		}
	});
};

const createJSONEmojiFileName = () => {
	fs.writeFile(`${__dirname}/emojis.json`, JSON.stringify(emojiFileName), 'utf-8', err => {
		if (err) {
			console.log(err);
			console.log('Error when create emojis.json!');
		} else {
			console.log('emojis.json Created!');
		}
	});
};

module.exports = {getHTMLEmojiText, createJSONEmojiText, createJSONEmojiFileName};
