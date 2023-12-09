import http from 'k6/http';
import { sleep, check } from 'k6';
import { Options } from 'k6/options';
import { getApiToken, type auth } from '../tools/auth';
import { User, QA_SERVER } from '../tools/endpoints';

//* Preconditions
export function setup() {
	console.log('🧪Starting Performance Tests...');
	const auth = getApiToken();
	return auth;
}

//* Test Config
export const options: Options = {
	// will perform 1 user per 1 second
	vus: 10,
	duration: '10s',
};

//* Performance Test:
export default function (data: auth) {
	const endpointCall = QA_SERVER + User.currentId;
	const res = http.get(endpointCall, { headers: data });

	check(res, {
		'✅ Status was 200': res => res.status == 200,
		'✅ res has correct Data': res => res.json()?.toString().length !== 0,
	});
	console.log('✅ Response Body Defined:', res.json());
	sleep(1);
}
