import styled from 'styled-components';
import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import Main from 'components/common/Main';

const Layout = styled.div`
	display: flex;
	flex-direction: column;

	min-height: 100vh;
`;

const DefaultLayout = () => {
	return (
		<Layout>
			<Header />
			<Main />
			<Footer />
		</Layout>
	);
};

export default DefaultLayout;
