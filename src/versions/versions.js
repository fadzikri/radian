const fs = require('fs');
const {load} = require('cheerio');
const pretty = require('pretty');
const {baseURL} = require('../../utils');

const emojiVersionHTML = `${__dirname}/emoji-versions.html`;
const emojiVersionJSON = `${__dirname}/emoji-versions.json`;
const filenameJSON = `${__dirname}/filenames.json`;

const getHTMLEmojiVersion = async () => {
	try {
		const htmlPage = await fetch(baseURL);
		const textPage = await htmlPage.text();

		fs.writeFile(emojiVersionHTML, pretty(textPage), 'utf-8', err => {
			if (err) {
				console.log(err);
			} else {
				console.log('Emoji Version HTML Downloaded!');
			}
		});
	} catch (err) {
		console.log(err);
		console.log('Error when fetch data from origin server.');
	}
};

const createJSONEmojiVersion = () => {
	fs.readFile(emojiVersionHTML, (err, data) => {
		if (err) {
			return console.log('Error when reading raw HTML data.');
		}

		const $ = load(data);
		let links = $('td a');
		links = $(links).slice(1, links.length - 1);

		const arrayLinks = [];

		links.each((i, link) => {
			arrayLinks.push(`${baseURL}/${$(link).text()}`);
		});

		const arrayVersions = [];
		const filename = [];

		arrayLinks.forEach(version => {
			let numVersion = version.replace('https://unicode.org/Public/emoji', '');
			numVersion = numVersion.replace(/\//g, '');
			arrayVersions.push(numVersion);
			filename.push(`emojis-${numVersion}.html`);
		});

		const emojiVerJSON = {};

		emojiVerJSON.versions = arrayVersions;
		emojiVerJSON.links = arrayLinks;

		fs.writeFile(emojiVersionJSON, JSON.stringify(emojiVerJSON), 'utf-8', err => {
			if (err) {
				console.log(err);
			} else {
				console.log('Emoji Version JSON Created!');
			}
		});

		fs.writeFile(filenameJSON, JSON.stringify(filename), 'utf-8', err => {
			if (err) {
				console.log(err);
			} else {
				console.log('Filename JSON Created!');
			}
		});
	});
};

module.exports = {getHTMLEmojiVersion, createJSONEmojiVersion};
