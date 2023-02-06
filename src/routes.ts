import { lazy } from 'react';

const Home = lazy(() => import('pages/home/Home'));
const Users = lazy(() => import('pages/users/index'));

const routes = [
	{
		path: '/',
		element: Home,
	},
	{
		path: '/users/*',
		element: Users,
	},
];

export default routes;
