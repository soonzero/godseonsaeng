import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const SignUp = lazy(() => import('./SignUp'));
const SignIn = lazy(() => import('./SignIn'));
const FindPassword = lazy(() => import('./FindPassword'));

const routes = [
	{
		path: '/sign-up',
		element: SignUp,
	},
	{
		path: '/sign-in',
		element: SignIn,
	},
	{
		path: '/find-password',
		element: FindPassword,
	},
];

const Users = () => {
	return (
		<Routes>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} element={<route.element />} />
			))}
			<Route path="/*" element={<Navigate to="/users/sign-in" replace />} />
		</Routes>
	);
};

export default Users;
