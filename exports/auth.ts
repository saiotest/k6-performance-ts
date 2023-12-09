import http from 'k6/http';
import { AccessTokenResponse } from './typeAuth';
require('dotenv').config();

//* Required Variables processed from .env file:
const baseUrl = process.env.TOKEN_URL;
const tokenEndpoint = process.env.GET_TOKEN_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const scope = process.env.SCOPE;
const clientId = process.env.CLIENT_ID;
const requestURL = `${baseUrl}${tokenEndpoint}?username=${username}&password=${password}&grant_type=password&scope=${scope}&client_id=${clientId}&response_type=token`;
export type authHeader = {
	'Content-Type': string;
	Authorization: string;
};

//* Use this function to get the token for the API calls
export function getApiToken() {
	const loginResponse = http.post(requestURL, { 'Content-Type': 'x-www-form-urlencoded' });
	const responseObj = loginResponse.json() as AccessTokenResponse;
	const token = responseObj.access_token;
	const Auth: authHeader = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	};
	const authHeader = {
		headers: Auth,
	};
	console.log('---- Auth Login Successful! ✅');
	return authHeader;
}
