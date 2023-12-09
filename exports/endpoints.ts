require('dotenv').config();

//* List of Servers URL:
export const QA_SERVER = process.env.QA_SERVER;

//* List of Endpoints by service:
export const User = {
	currentId: '/User/currentId',
};
