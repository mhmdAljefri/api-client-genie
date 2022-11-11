const init = require('./src/scripts/init');
const path = require('path');

(async () => {
	global.appRoute = path.resolve(__dirname);

	await init({});
})();
