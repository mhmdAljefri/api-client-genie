// @ts-check

module.exports = async () => {
	const createConfigFile = require('../utils/createConfig');
	const inquirer = (await import('inquirer')).default;

	const prompt = inquirer.createPromptModule();

	try {
		const { token, domain } = await prompt([
			{
				name: 'domain',
				message: 'What is your API domain?'
			},
			{
				name: 'token',
				message: 'What is your API auth token?'
			}
		]);

		// todo validate user inputs
		createConfigFile({ token, domain });
	} catch (error) {}
};
