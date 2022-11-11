const getPathWithVars = ({ pathname = '', vars = {} }) => {
	const replaced = pathname.replace(/:(\w+)/gi, match => {
		return vars[match.replace(':', '')];
	});

	return replaced;
};

/** @param {string} vars, @return {Object} */
const convertVarsStringIntoArray = vars => {
	const newVars = {};
	vars.split(',').forEach(v => {
		const [key, value] = v
			.trim()
			.split('=')
			.map(item => item.trim());

		newVars[key] = value;
	});

	return newVars;
};

const mergeTitleText = title => {
	return title.replace(/\s\w/gi, match => {
		return match.trim().toUpperCase();
	});
};

module.exports = {
	mergeTitleText,
	getPathWithVars,
	convertVarsStringIntoArray
};
