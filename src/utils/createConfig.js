module.exports = async ({ domain, token }) => {
	const ora = (await import('ora')).default;
	const chalk = (await import('chalk')).default;
	const fs = require('fs');

	const spinner = ora('Initializing the app config');
	spinner.color = 'green';
	spinner.start();

	try {
		await fs.writeFileSync(
			'config.json',
			`{ "endpoint": "${domain}", "token": "${token}" }`
		);

		setTimeout(() => {
			spinner.color = 'green';
			spinner.text = chalk.green('App config Initializing');
		}, 1000);

		setTimeout(() => {
			spinner.stop();
		}, 3000);
	} catch (error) {
		log(
			chalk.red('Something went wrong pleas fill an issues on!') +
				' https://github.com/mhmdAljefri/api-client-genie/issues/new'
		);
	}
};
