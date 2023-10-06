import http from 'k6/http';
import { check, sleep } from 'k6';
import { getApiToken } from '../helper/environment';
import { USER, SERVER } from '../helper/endpoints';

//* Preconditions
export function setup() {
	console.log('🧪LoadTest: VUS = 10, duration = 10s');
	const token = getApiToken();
	const params = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return params;
}

//* Test Config
export const options = {
	// will perform 1 user per 1 second
	vus: 10,
	duration: '10s',
};
//* Performance Test:
export default function (data) {
	const userCurrentId = SERVER + USER.currentId;
	console.log('🔎Given Endpoint:', userCurrentId);

	const res = http.get(userCurrentId, data);

	check(res, {
		'✅ Status was 200': r => r.status == 200,
		'✅ Response has correct Data': r => r.json().length !== 0,
	});
	console.log('✅ Response Body Defined:', res.json());
	sleep(1);
}
