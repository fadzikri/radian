const fs = require('fs');
const {load} = require('cheerio');
const pretty = require('pretty');
const {baseURL} = require('../../utils');

const emojiVersionHTML = `${__dirname}/emoji-versions.html`;
const emojiVersionJSON = `${__dirname}/emoji-versions.json`;
const filenameJSON = `${__dirname}/filenames.json`;

const getHTMLEmojiVersion = async () => {
	try {
		const webPage = await fetch(baseURL);
		const htmlPage = await webPage.text();

		fs.writeFile(emojiVersionHTML, pretty(htmlPage), 'utf-8', err => {
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
		links = $(links).slice(1, links.length);

		const arrayLinks = [];

		links.each((i, link) => {
			arrayLinks.push(`${baseURL}/${$(link).text()}`);
		});

		const arrayVersions = [];
		const filenames = [];

		arrayLinks.forEach(version => {
			let numVersion = version.replace('https://unicode.org/Public/emoji', '');
			numVersion = numVersion.replace(/\//g, '');
			arrayVersions.push(numVersion);
			filenames.push(`emojis-${numVersion}.html`);
		});

		const result = {};

		result.versions = arrayVersions;
		result.links = arrayLinks;

		fs.writeFile(emojiVersionJSON, JSON.stringify(result), 'utf-8', err => {
			if (err) {
				console.log(err);
			} else {
				console.log('Emoji Version JSON Created!');
			}
		});

		fs.writeFile(filenameJSON, JSON.stringify(filenames), 'utf-8', err => {
			if (err) {
				console.log(err);
			} else {
				console.log('Filename JSON Created!');
			}
		});
	});
};

module.exports = {getHTMLEmojiVersion, createJSONEmojiVersion};
