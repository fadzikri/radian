require('dotenv').config();

let apiURL = null;

if (process.env.NODE_ENV === 'development') {
	apiURL = 'http://localhost:3000';
} else {
	apiURL = 'https://radian.vercel.app';
}

const port = process.env.PORT;
const baseURL = 'https://unicode.org/Public/emoji';
const priority = {
	high: 'emoji-test.txt',
	medium: 'emoji-sequences.txt',
	low: 'emoji-data.txt',
};

module.exports = {port, apiURL, baseURL, priority};
