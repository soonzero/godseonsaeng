import styled from 'styled-components';
import { ReactComponent as IconAssignment } from 'assets/svgs/assignment.svg';
import { ReactComponent as IconGroup } from 'assets/svgs/group.svg';
import { ReactComponent as IconSingle } from 'assets/svgs/single.svg';
import { ReactComponent as IconClass } from 'assets/svgs/class.svg';
import { ReactComponent as IconStudent } from 'assets/svgs/student.svg';

const Nav = ({ opened }) => {
	return (
		<NavStyled opened={opened}>
			<ul>
				<li>
					<IconAssignment />
					<span>과제 관리</span>
				</li>
				<ul>
					<li>
						<IconGroup />
						<span>그룹 과제</span>
					</li>
					<li>
						<IconSingle />
						<span>개인 과제</span>
					</li>
				</ul>
				<li>
					<IconStudent />
					<span>학생 관리</span>
				</li>
				<li>
					<IconClass />
					<span>클래스 관리</span>
				</li>
			</ul>
		</NavStyled>
	);
};

export default Nav;

interface SNav {
	opened: boolean;
}

const NavStyled = styled.nav<SNav>`
	width: 100%;
	height: ${(props) => (props.opened ? '20.6rem' : '0')};
	max-height: calc(100vh - 5rem);
	position: absolute;
	top: 5rem;
	left: 0;
	visibility: ${(props) => (props.opened ? 'visible' : 'hidden')};
	background-color: white;
	transition: all 0.2s ease-in-out;
	z-index: -1;
	padding: ${(props) => (props.opened ? '1rem 0' : '')};
	box-sizing: border-box;
	font-size: 1.5rem;
	font-weight: 500;
	letter-spacing: -0.05rem;
	overflow: hidden;

	& > ul {
		transition: all 0.2s ease-in-out;
		height: ${(props) => (props.opened ? '100%' : '0')};
		padding-left: 2rem;

		& > ul {
			padding-left: 2rem;
			margin-bottom: 1.5rem;

			li:not(:last-of-type) {
				margin-bottom: 0.5rem;
			}
		}
	}

	li {
		padding: 0.75rem 0;
		cursor: pointer;
		user-select: none;
		display: flex;
		align-items: center;
		color: black;

		svg {
			width: 1.5rem;
			height: auto;
			margin-right: 0.75rem;
		}

		&:not(:first-of-type) {
			margin-bottom: 1.5rem;
		}

		&:last-of-type {
			margin-bottom: 0;
		}

		&.current {
			color: #00a110;
		}
	}
`;
