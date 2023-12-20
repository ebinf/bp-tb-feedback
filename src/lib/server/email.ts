import { createTransport, type SentMessageInfo } from 'nodemailer';
import {
	EMAIL_HOST,
	EMAIL_PORT,
	EMAIL_SECURE,
	EMAIL_USER,
	EMAIL_PASSWORD,
	EMAIL_REPLY_TO
} from '$env/static/private';
import { PUBLIC_SITE_NAME } from '$env/static/public';
import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import { render } from 'svelte-email';
import type Mail from 'nodemailer/lib/mailer';
import type { User as DBUser } from '@prisma/client';
import type { User as AuthUser } from 'lucia';

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

export const renderMail: <Component extends SvelteComponent>(
	template: ComponentType<Component>,
	props: ComponentProps<Component>
) => Promise<{ html: string; text: string }> = async (template, props) => {
	return new Promise((resolve) => {
		resolve({
			html: render({ template, props }),
			text: render({ template, props, options: { plainText: true } })
		});
	});
};

export const sendMail = async (mailOptions: Mail.Options) => {
	return transporter.sendMail(mailOptions);
};

export const sendMailFromTemplate: <Component extends SvelteComponent>(
	to: DBUser | AuthUser,
	subject: string,
	template: ComponentType<Component>,
	props: ComponentProps<Component>
) => Promise<SentMessageInfo> = async (to, subject, template, props) => {
	const { html, text } = await renderMail(template, props);
	return sendMail({
		...messageConfig,
		to: leadToMail(to),
		subject: subject,
		html,
		text
	});
};

export const leadToMail: (lead: DBUser | AuthUser) => string = (lead) => {
	return `"${lead.full_name}" <${lead.email}>`;
};
