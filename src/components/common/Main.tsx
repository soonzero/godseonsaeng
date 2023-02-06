import { Navigate, Route, Routes } from 'react-router-dom';
import routes from 'routes';
import styled from 'styled-components';

const Main = () => {
	return (
		<RoutesStyled>
			<Routes>
				{routes.map((route, index) => (
					<Route key={index} path={route.path} element={<route.element />} />
				))}
				<Route path="/*" element={<Navigate to="/" replace />} />
			</Routes>
		</RoutesStyled>
	);
};

export default Main;

const RoutesStyled = styled.main`
	margin-top: 5rem;
`;
