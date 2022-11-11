const {
	mergeTitleText,
	convertVarsStringIntoArray,
	getPathWithVars
} = require('./common');

// @ts-check
module.exports = async () => {
	try {
		const convertJsonToTypes = require('./convertJsonToTypes');
		const apiTypesGen = require('./apiTypesGen');
		const { default: chalk } = await import('chalk');
		const { default: fetch } = await import('node-fetch');
		const { default: inquirer } = await import('inquirer');
		const prompt = inquirer.createPromptModule();
		const config = require('../../config.json');

		const { pathname, title, vars } = await prompt([
			{
				name: 'pathname',
				message: 'API endpoint pathname?',
				default: 'users/:id'
			},
			{
				name: 'title',
				message: 'API endpoint title?',
				default: 'users list'
			},
			{
				name: 'vars',
				message:
					'Pathname dynamic variables such :id it array of variables separated by comma ' +
					chalk.red('(,)')
			}
		]);
		const capitalizedName = mergeTitleText(title);

		const url =
			config.endpoint +
			getPathWithVars({ pathname, vars: convertVarsStringIntoArray(vars) });

		fetch(url, {
			headers: {
				authorization: `Bearer ${config.token}`
			}
		})
			.then(res => res.json())
			.then(
				(
					/** @type {any} */
					{ data, ...res }
				) => {
					if (typeof res.success === 'boolean' && !res.success) {
						throw res.errors;
					}

					const types = convertJsonToTypes({
						[capitalizedName + 'Response']: {
							...res,
							[capitalizedName + 'Data']: data
						}
					});

					// add types to namespace/types.ts file
					apiTypesGen({
						modelName: capitalizedName,
						types
					});
					// export types to namespace/types.ts file
					// add function to namespace/modelName.ts file
					// export function from namespace/modelName.ts
					// export function from namespace/index.ts
					// generate typed function for this endpoint
				}
			)
			.catch(error => {
				if (error?.code === 'ERR_INVALID_URL') {
					return console.log(
						chalk.red(`${url} is invalid, please pass correct url!`)
					);
				}

				console.log(
					chalk.red(
						`Something went wrong please check the endpoint or config! url: ` +
							url
					)
				);
			});
	} catch (error) {
		console.log('error: ', error);
	}
};
