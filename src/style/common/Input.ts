import styled from 'styled-components';

export const DefaultInput = styled.fieldset`
	display: flex;
	flex-direction: column;
	font-size: 1.5rem;

	& > div:has(label) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.guide-msg {
		color: red;
		font-size: 1.25rem;
	}

	label {
		width: max-content;
		font-weight: 500;
	}

	div:has(input#email),
	div.address {
		display: flex;

		input {
			margin-right: 0.5rem;
		}
	}

	div.radio-input-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 0.75rem;
		margin-bottom: 0;

		div {
			padding: 1.2rem 1.5rem;
			border-radius: 0.5rem;
			border: 0.1rem solid #ced4da;
			transition: all 0.2s ease-in-out;
			cursor: pointer;

			&:has(input:checked) {
				border-color: #00a100;
			}
		}

		input {
			display: none;
		}

		label {
			cursor: pointer;
		}
	}

	input {
		flex-grow: 1;
		border: 0.1rem solid #ced4da;
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
		outline: none;
		transition: 0.2s ease-in-out;

		&:not(:disabled) {
			&:focus,
			&:active {
				border-color: #00a100;
			}
		}

		&.businessNum {
			text-align: center;

			&:first-of-type {
				width: 9rem;
			}

			&:nth-of-type(2) {
				width: 7rem;
			}

			&:last-of-type {
				width: 10.75rem;
			}
		}

		&.institution-code {
			position: absolute;
			width: 100%;
			transition: all 0.2s ease-in-out;

			&.inactive {
				visibility: hidden;
				opacity: 0;
				bottom: -3.5rem;
			}

			&.active {
				visibility: visible;
				opacity: 1;
				bottom: -4.1rem;
			}
		}
	}

	&:not(:last-of-type) {
		margin-bottom: 1.5rem;
	}

	.address:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	.divider {
		color: #ced4da;
		padding: 0 1rem;
	}
`;
