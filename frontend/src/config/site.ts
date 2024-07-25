export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'Vite + NextUI',
	description:
		'Make beautiful websites regardless of your design experience.',
	navItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Shares',
			href: '/shares',
		},
	],
	navMenuItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Shares',
			href: '/shares',
		},
		{
			label: 'Logout',
			href: '/logout',
		},
	],
	links: {
		github: 'https://github.com/TheSaltyNewfie/Server-Manager',
	},
	api_endpoint: 'http://192.168.4.123:8000',
	ftp_endpoint: 'ftp://192.168.4.123:21',
};
