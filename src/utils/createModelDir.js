module.exports = async modelName => {
	const { default: chalk } = await import('chalk');
	const { mkdir } = require('fs/promises');
	const path = require('path');

	console.log('modelName', modelName);
	try {
		const dirPath = path.join(__dirname, modelName);
		await mkdir(dirPath);

		console.log(chalk.blue(`Dir ${dirPath} created`));
		return dirPath;
	} catch (err) {
		console.error(chalk.red(err?.message));
	}
};
