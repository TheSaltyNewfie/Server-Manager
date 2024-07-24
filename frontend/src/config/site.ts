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
	],
	navMenuItems: [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Logout',
			href: '/logout',
		},
	],
	links: {
		github: 'https://github.com/TheSaltyNewfie/Server-Manager',
	},
};
