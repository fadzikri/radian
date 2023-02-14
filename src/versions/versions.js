import fs from 'fs';
import {load} from 'cheerio';
import pretty from 'pretty';
import {Dirs, Utils} from '../../utils.js';

const {baseURL} = Utils;
const pathVersionHTML = `${Dirs.dirVersion}/${Utils.nameFileVersion}.html`;
const pathVersionJSON = `${Dirs.dirVersion}/${Utils.nameFileVersion}.json`;
const pathFilenameJSON = `${Dirs.dirVersion}/${Utils.nameFilename}.json`;

const getEmojiRawDataVersion = async () => {
	try {
		const rawData = await fetch(baseURL);
		const textData = await rawData.text();

		fs.writeFile(pathVersionHTML, pretty(textData), 'utf-8', (err, data) => {
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
	fs.readFile(pathVersionHTML, (err, data) => {
		if (err) {
			return console.log('Error when reading raw HTML data.');
		}

		const $ = load(data);
		let links = $('td a');
		links = $(links).slice(1, links.length);

		const arrayLinks = [];

		links.each((i, link) => {
			arrayLinks.push($(link).text());
		});

		const arrayVersions = [];
		const filenameVersions = [];

		arrayLinks.map(version => {
			const ver = version.replace('/', '');
			arrayVersions.push(ver);
			filenameVersions.push(`${Utils.nameFileEmoji}-${ver}.html`);
		});

		const emojiVerJSON = {};

		emojiVerJSON.versions = arrayVersions;
		emojiVerJSON.links = arrayLinks;

		fs.writeFile(pathVersionJSON, JSON.stringify(emojiVerJSON), 'utf-8', (err, data) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Emoji Version JSON Created!');
			}
		});

		fs.writeFile(pathFilenameJSON, JSON.stringify(filenameVersions), 'utf-8', (err, data) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Filename JSON Created!');
			}
		});
	});
};

export {getEmojiRawDataVersion, createJSONEmojiVersion};
