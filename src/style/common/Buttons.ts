import styled from 'styled-components';

export const Button = styled.button`
	height: max-content;
	min-width: 5rem;
	max-width: 100%;
	background-color: #00a100;
	padding: 1rem;
	border-radius: 0.5rem;
	color: white;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	visibility: visible;
	font-size: 1.5rem;
	font-weight: 500;

	&:disabled {
		background-color: #00a10050;
		cursor: not-allowed;
	}

	&.full {
		width: 100%;
		margin-top: 0.75rem;
	}
`;
