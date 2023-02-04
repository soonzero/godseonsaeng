import { useEffect, useState } from 'react';
import styled from 'styled-components';
import iconLogo from 'assets/svgs/icon-no-bg.svg';
import { ReactComponent as IconMyPage } from 'assets/svgs/user.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();

	const [navOpened, setNavOpened] = useState(false);

	useEffect(() => {
		if (navOpened) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'unset';
	}, [navOpened]);

	return (
		<HeaderStyled>
			<div className="hamburger-container">
				<div
					className={`hamburger${navOpened ? ' opened' : ''}`}
					onClick={() => setNavOpened((prev) => !prev)}
				>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			<div className="logo-container" onClick={() => navigate('/')}>
				<img className="logo" src={iconLogo} alt="godseonsaeng" />
			</div>
			<div className="my-page-container">
				<IconMyPage />
			</div>
		</HeaderStyled>
	);
};

export default Header;

const HeaderStyled = styled.header`
	width: 100%;
	max-width: 37.5rem;
	margin: 0 auto;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: sticky;
	border-bottom: 0.1rem solid #e5e5e5;
	z-index: 5;

	.hamburger-container {
		position: absolute;
		left: 1.75rem;

		.hamburger {
			width: 2.5rem;
			height: 2.5rem;
			position: relative;
			cursor: pointer;

			span {
				position: absolute;
				left: 0.5rem;
				display: inline-block;
				width: 1.5rem;
				height: 0.2rem;
				background-color: #e5e5e5;
				transition: all 0.2s ease-in-out;
				border-radius: 0.5rem;
				transform: rotate(0deg);
			}

			span:first-of-type {
				top: 0.6rem;
			}

			span:nth-of-type(2),
			span:nth-of-type(3) {
				top: 1.15rem;
			}

			span:last-of-type {
				top: 1.7rem;
			}

			&.opened {
				span {
					background-color: #a5a5a5;
				}

				span:first-of-type {
					top: 1.15rem;
					left: 50%;
					width: 0%;
				}

				span:nth-of-type(2) {
					top: 1.15rem;
					transform: rotate(45deg);
				}

				span:nth-of-type(3) {
					transform: rotate(-45deg);
				}

				span:last-of-type {
					top: 1.15rem;
					left: 50%;
					width: 0%;
				}
			}
		}
	}

	.logo-container {
		width: 4rem;
		height: 4rem;
		display: flex;
		align-items: center;
		cursor: pointer;

		img {
			width: 100%;
			height: auto;
		}
	}

	.my-page-container {
		position: absolute;
		width: 2.5rem;
		height: 2.5rem;
		right: 1.75rem;
		cursor: pointer;

		svg {
			fill: #e5e5e5;

			&.current {
				fill: #00a100;
			}
		}
	}
`;
