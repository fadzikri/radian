const fs = require('fs');

const isoTime = () => (new Date().toISOString()).toString();

const markLastUpdate = () => {
	fs.writeFile(`${__dirname}/last_update.json`, JSON.stringify(isoTime()), 'utf-8', err => {
		if (err) {
			console.log(err);
			console.log('Error when create last_update.txt!');
		} else {
			console.log('last_update.txt Created!');
		}
	});
};

module.exports = markLastUpdate;
