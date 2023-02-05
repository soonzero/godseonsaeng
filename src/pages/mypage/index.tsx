import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const MyPageMain = lazy(() => import('pages/mypage/MyPageMain'));

const routes = [
	{
		path: '/',
		element: MyPageMain,
	},
];

const MyPage = () => {
	return (
		<Routes>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} element={<route.element />} />
			))}
			<Route path="/*" element={<Navigate to="/my-page" replace />} />
		</Routes>
	);
};

export default MyPage;
