import { lazy } from 'react';

const Home = lazy(() => import('pages/home/Home'));

const routes = [
	{
		path: '/',
		element: Home,
	},
];

export default routes;
