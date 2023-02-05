import { Navigate, Route, Routes } from 'react-router-dom';
import routes from 'routes';

const Main = () => {
	return (
		<Routes>
			{routes.map((route, index) => (
				<Route key={index} path={route.path} element={<route.element />} />
			))}
			<Route path="/" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default Main;
