module.exports = async () => {
	const { default: chalk } = await import('chalk');
	try {
	} catch (error) {
		console.log(chalk.red('something went wrong'));
	}
};
