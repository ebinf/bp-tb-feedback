<script lang="ts">
	import { PUBLIC_SITE_NAME } from '$env/static/public';
	import { Head, Html } from 'svelte-email';
	import Container from '../components/container.server.svelte';
	import Footer from '../components/footer.server.svelte';
	import colors from 'tailwindcss/colors';

	export let title: string = PUBLIC_SITE_NAME;
	export let group_number: string | number | null = null;
	export let heading: string;
	export let name: string;
</script>

<Html lang="de">
	<Head>
		<meta charset="utf-8" />
		<!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
		<title>{title}</title>
		<style>
			html,
			body,
			.body {
				font-family:
					ui-sans-serif,
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					'Helvetica Neue',
					Arial,
					'Noto Sans',
					sans-serif,
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji';
				background-color: #f3f4f6;
			}

			.body {
				padding: 3%;
			}

			h2 {
				font-weight: 600;
				color: #111827;
				font-size: inherit;
			}

			div.container {
				background-color: #ffffff;
				padding: 0.25rem 1rem;
				border-radius: 0.5rem;
				box-shadow:
					0 1px 3px 0 #00000019,
					0 1px 2px 0 #00000019;
				color: #374151;
				line-height: 1.5rem;
			}

			.container a {
				color: #111827;
				font-weight: 600;
			}

			div.footer {
				width: 70%;
				max-width: 550px;
				min-width: 300px;
				margin: 2rem auto;
			}

			.footer p {
				text-align: center;
				color: #6b7280;
			}

			.footer a {
				color: #6b7280;
				font-weight: 600;
			}

			a.button {
				text-decoration: none;
				background-color: #ea580c;
				font-size: 0.875rem;
				line-height: 1.25rem;
				border-radius: 0.375rem;
				padding: 0.5rem 1rem;
				color: white;
			}
		</style>
	</Head>
	<body>
		<div class="body">
			<h1 style="font-weight: 700;">
				{#if group_number}<span style="font-weight: 500; color: #6b7280; padding-right: 0.75rem;"
						>{group_number}&nbsp;</span
					>{/if}{heading}
			</h1>

			<Container>
				<h2>Hallo {name},</h2>
				<slot />
				<p>
					Viele Grüße<br />
					{PUBLIC_SITE_NAME}
				</p>
			</Container>

			<Footer />
		</div>
	</body>
</Html>
