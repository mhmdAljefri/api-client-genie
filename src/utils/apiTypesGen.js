module.exports = async ({ modelName, types = [] }) => {
	const createModelDir = require('./createModelDir');
	const fs = require('fs');
	const dir = createModelDir(modelName);

	const typesToString = types.reduce(type => {
		JSON.stringify(type) + '\n';
	}, '');

	console.log('typesToString', typesToString);

	// generate types file
	fs.writeFile(dir + '/types.ts', typesToString, error => {
		console.log(error.message);
	});
	// generate function file
	// generate index file
};
