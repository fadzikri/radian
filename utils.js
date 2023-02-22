require('dotenv').config();

const port = process.env.PORT;
const baseURL = 'https://unicode.org/Public/emoji';
const priority = {
	high: 'emoji-test.txt',
	medium: 'emoji-sequences.txt',
	low: 'emoji-data.txt',
};

let apiURL = 'https://radian.vercel.app';

if (process.env.NODE_ENV === 'development') {
	apiURL = `http://localhost:${port}`;
}

module.exports = {port, apiURL, baseURL, priority};
