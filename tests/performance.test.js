import http from 'k6/http';
import { check, sleep } from 'k6';
import { USER, SERVER } from './endpoints.js';

//* Given Variables:
const baseUrl = 'https://casegrp.b2clogin.com/casegrp.onmicrosoft.com';
const tokenEndpoint = '/B2C_1_ropc/oauth2/v2.0/token';
const scope = 'openid+9b89d9ae-ee5f-41ac-add6-8042a042a203';
const clientId = '9b89d9ae-ee5f-41ac-add6-8042a042a203';
const requestURL = `${baseUrl}${tokenEndpoint}?username=${USER.username}&password=${USER.password}&grant_type=password&scope=${scope}&client_id=${clientId}&response_type=token`;
const headers = {
	headers: { 'Content-Type': 'x-www-form-urlencoded' },
};

function getApiToken() {
	const loginResponse = http.post(requestURL, headers);
	const responseObj = loginResponse.json();
	const token = responseObj.access_token;
	console.log('---- Auth Login Successful! ✅');
	return token;
}
const endpoint = {
	currentId: '/User/currentId',
};

//* Test Config
export const options = {
	// will perform 1 user per 1 second
	vus: 10,
	duration: '10s',
};

//* Performance Test:
export default function () {
	const token = getApiToken();
	const params = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	const endpointCall = SERVER + endpoint.currentId;
	console.log('🔎Given Endpoint:', endpointCall);

	const res = http.get(endpointCall, params);

	check(res, {
		'✅ Status was 200': r => r.status == 200,
		'✅ Response has correct Data': r => r.json().length !== 0,
	});
	console.log('✅ Response Body Defined:', res.json());
	sleep(1);
}
