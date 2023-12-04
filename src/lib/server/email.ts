import { createTransport } from 'nodemailer';
import {
	EMAIL_HOST,
	EMAIL_PORT,
	EMAIL_SECURE,
	EMAIL_USER,
	EMAIL_PASSWORD,
	EMAIL_REPLY_TO
} from '$env/static/private';
import { PUBLIC_SITE_NAME } from '$env/static/public';

export const transporter = createTransport({
	host: EMAIL_HOST,
	port: Number(EMAIL_PORT),
	secure: Boolean(EMAIL_SECURE),
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASSWORD
	}
});

transporter
	.verify()
	.then(() => {
		console.log('Email server is ready');
	})
	.catch((error) => {
		console.error('Error with email server', error);
	});

export const messageConfig = {
	from: `"${PUBLIC_SITE_NAME}" <${EMAIL_USER}>`,
	replyTo: EMAIL_REPLY_TO
};
