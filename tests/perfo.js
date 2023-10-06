import http from 'k6/http';
import encoding from 'k6/encoding';
import { check, sleep } from 'k6';
// at the top of your script:
import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const user = {
	username: 'automated_tester03@casegrp.onmicrosoft.com',
	password: 'ZX0vL1sr4wJ3cY6Ha1pnZncTO',
};
const baseUrl = 'https://casegrp.b2clogin.com/casegrp.onmicrosoft.com';
const tokenEndpoint = '/B2C_1_ropc/oauth2/v2.0/token';
const scope = 'openid+9b89d9ae-ee5f-41ac-add6-8042a042a203';
const clientId = '9b89d9ae-ee5f-41ac-add6-8042a042a203';

const requestURL = `${baseUrl}${tokenEndpoint}?username=${user.username}&password=${user.password}&grant_type=password&scope=${scope}&client_id=${clientId}&response_type=token`;
const options = {
	headers: { 'Content-Type': 'x-www-form-urlencoded' },
};

function getApiToken() {
	const loginResponse = http.post(requestURL, options);
	const responseObj = loginResponse.json();
	const token = responseObj.access_token;
	console.log('---- Auth Login Successful! ✅');
	return token;
}

// export const options = {
// 	vus: 1,
// 	duration: '30s',
// };

const server = 'https://cascade-mobile.eus2.nonprod.kubeit.dnv.com/cas-mobile-svc';
const endpoint = {
	currentId: '/User/currentId',
};
export default function () {
	const token = getApiToken();
	const params = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	const endpointCall = server + endpoint.currentId;
	console.log('🔎Given Endpoint:', endpointCall);

	const res = http.get(endpointCall, params);

	check(res, {
		'✅ status was 200': r => r.status == 200,
		'✅ Json Response is defined': r => r.json().length !== 0,
	});
	console.log(res.json());
	sleep(1);
}
