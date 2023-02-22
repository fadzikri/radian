const fs = require('fs');
const emojiRegex = require('emoji-regex');

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
		const emojiArrays = [];
		const emojis = {};

		emojis.version = emojiName.replace(/emojis-/gi, '');

		try {
			let emojiData = fs.readFileSync(`${__dirname}/${emojiName}.txt`, 'utf-8');
			emojiData = emojiData.replace(/.+non-fully-qualified.+|.+minimally-qualified.+|.+unqualified.+/ig, '');
			const regex = emojiRegex();

			for (const match of emojiData.matchAll(regex)) {
				emojiArrays.push(match[0]);
			}
		} catch (err) {
			console.log(err);
			console.log(`Error when reading ${emojiName}.txt!`);
		}

		emojis.emoji = emojiArrays;
		emojis.unicode = null;

		fs.writeFile(`${__dirname}/${emojiName}.json`, JSON.stringify(emojis), 'utf-8', err => {
			if (err) {
				console.log(err);
				console.log(`Error when create ${emojiName}.json!`);
			} else {
				console.log(`${emojiName}.json Created!`);
			}
		});
	});
};

module.exports = {getHTMLEmojiText, createJSONEmojiText};
