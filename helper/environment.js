import http from 'k6/http';

const user = {
	username: 'automated_tester03@casegrp.onmicrosoft.com',
	password: 'ZX0vL1sr4wJ3cY6Ha1pnZncTO',
};
const baseUrl = 'https://casegrp.b2clogin.com/casegrp.onmicrosoft.com';
const tokenEndpoint = '/B2C_1_ropc/oauth2/v2.0/token';
const scope = 'openid+9b89d9ae-ee5f-41ac-add6-8042a042a203';
const clientId = '9b89d9ae-ee5f-41ac-add6-8042a042a203';
const requestURL = `${baseUrl}${tokenEndpoint}?username=${user.username}&password=${user.password}&grant_type=password&scope=${scope}&client_id=${clientId}&response_type=token`;
const headers = {
	headers: { 'Content-Type': 'x-www-form-urlencoded' },
};

export function getApiToken() {
	const loginResponse = http.post(requestURL, headers);
	const responseObj = loginResponse.json();
	const token = responseObj.access_token;
	console.log('---- Auth Login Successful! ✅');
	return token;
}
