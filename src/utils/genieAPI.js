import { convertVarsStringIntoArray, getPathWithVars } from './common';

const config = {};

const genieAPI = () => ({
	init: ({ endpoint, defaultHeaders }) => {
		config.endpoint = endpoint;
		config.defaultHeaders = defaultHeaders;
	},
	request: (pathname, config) => {
		if (config.endpoint) request(pathname, config);
		throw new Error('Please Init API firstly');
	}
});

const request = (pathname, { vars, params, headers } = {}) => {
	const url =
		config.endpoint +
		getPathWithVars({ pathname, vars: convertVarsStringIntoArray(vars) });

	fetch(url, {
		headers: {
			...config.defaultHeaders,
			...headers
		},
		params
	});
};

const frozenGenieAPI = Object.freeze(genieAPI());

export default frozenGenieAPI;
