import {
	__ModelName__Response,
	__ModelName__Params,
	__ModelName__Vars,
	HttpHeaders
} from '@types';
import frozenGenieAPI from '../utils/genieAPI';

const get__ModelName__: Promise<__ModelName__Response> = ({
	vars,
	params,
	headers
}: {
	params: __ModelName__Params;
	vars: __ModelName__Vars;
	headers: HttpHeaders;
}) => {
	frozenGenieAPI.request(__ModelName__pathname, { vars, params, headers });
};

export default get__ModelName__;
