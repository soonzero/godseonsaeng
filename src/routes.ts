import { lazy } from 'react';

const Home = lazy(() => import('pages/home/Home'));
const Users = lazy(() => import('pages/users/index'));
const MyPage = lazy(() => import('pages/mypage/MyPageMain'));

const routes = [
	{
		path: '/*',
		element: Home,
	},
	{
		path: '/users/*',
		element: Users,
	},
	{
		path: '/my-page/*',
		element: MyPage,
	},
];

export default routes;
