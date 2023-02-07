import { useEffect, useState } from 'react';
import styled from 'styled-components';
import iconLogo from 'assets/svgs/icon-no-bg.svg';
import { ReactComponent as IconMyPage } from 'assets/svgs/user.svg';
import Nav from 'components/common/Nav';
import Dimmed from 'components/common/Dimmed';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const [navOpened, setNavOpened] = useState(false);

	useEffect(() => {
		if (navOpened) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'unset';
	}, [navOpened]);

	useEffect(() => {
		setNavOpened(() => false);
	}, [pathname]);

	return (
		<HeaderStyled opened={navOpened}>
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
			<Dimmed visible={navOpened} setVisible={setNavOpened} />
			<Nav opened={navOpened} />
		</HeaderStyled>
	);
};

export default Header;

interface SHeader {
	opened: boolean;
}

const HeaderStyled = styled.header<SHeader>`
	width: 100%;
	max-width: 37.5rem;
	height: 5rem;
	background-color: white;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	position: fixed;
	top: 0;
	z-index: 5;
	transition: all 0.2s ease-in-out;

	.hamburger-container {
		position: absolute;
		top: 0;
		left: 1.75rem;
		height: 5rem;

		.hamburger {
			top: 1.25rem;
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
		height: 5rem;
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
		top: 1.25rem;
		width: 2.5rem;
		height: 5rem;
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
