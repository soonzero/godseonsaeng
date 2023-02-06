import styled from 'styled-components';
import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import Main from 'components/common/Main';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 37.5rem;
	min-height: 100vh;
	margin: 0 auto;
	overflow: hidden;
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
