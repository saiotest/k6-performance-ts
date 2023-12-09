import http from 'k6/http';
import { JSONValue } from 'k6';
type setup = {
	data: JSONValue;
};
export function setup() {
	const res = http.get('https://httpbin.test.k6.io/get');
	return { data: res.json() };
}

export function teardown(data: setup) {
	console.log(JSON.stringify(data));
}

export default function (data: setup) {
	console.log(JSON.stringify(data));
}
