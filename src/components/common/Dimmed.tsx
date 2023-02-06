import styled from 'styled-components';

const Dimmed = ({ visible, setVisible }) => {
	return <DimmedStyled visible={visible} onClick={() => setVisible(false)} />;
};

export default Dimmed;

interface SDimmed {
	visible: boolean;
}

const DimmedStyled = styled.div<SDimmed>`
	position: absolute;
	top: 5rem;
	left: 0;
	right: 0;
	bottom: -100vh;
	background-color: #000000;
	visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
	opacity: ${(props) => (props.visible ? '0.3' : '0')};
	transition: all 0.2s ease-in-out;
	z-index: -2;
`;
