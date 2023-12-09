import http from 'k6/http';
import { AccessTokenResponse } from './typeAuth';

//* Required Variables processed from .env file:
const baseUrl = __ENV.TOKEN_URL;
const tokenEndpoint = '/B2C_1_ropc/oauth2/v2.0/token';
const username = __ENV.USERNAME;
const password = __ENV.PASSWORD;
const scope = __ENV.SCOPE;
const clientId = __ENV.CLIENT_ID;
const requestURL = `${baseUrl}${tokenEndpoint}?username=${username}&password=${password}&grant_type=password&scope=${scope}&client_id=${clientId}&response_type=token`;
export type auth = {
	'Content-Type': string;
	Authorization: string;
};

//* Use this function to get the token for the API calls
export function getApiToken() {
	console.log('---- Auth Login...');
	console.log('---- Request URL:', requestURL);
	const loginResponse = http.post(requestURL, { 'Content-Type': 'x-www-form-urlencoded' });
	const responseJson = loginResponse.json() as AccessTokenResponse;
	const token = responseJson.access_token;
	const Auth: auth = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	console.log('---- Auth Login Successful! ✅');
	return Auth;
}
