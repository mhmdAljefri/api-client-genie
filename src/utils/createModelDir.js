module.exports = async modelName => {
	const { default: chalk } = await import('chalk');
	const { mkdir } = require('fs/promises');

	try {
		const createDir = await mkdir(__dirname + '/' + modelName, {
			recursive: true
		});
		console.log(chalk.blue(`Dir ${createDir} created`));
		return createDir;
	} catch (err) {
		console.error(chalk.red(err.message));
	}
};
