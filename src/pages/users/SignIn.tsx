import { useEffect, useState } from 'react';
import { Button } from 'style/common/Buttons';
import { DefaultInput } from 'style/common/Input';
import styled from 'styled-components';
import Check from 'assets/svgs/checkbox.svg';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from 'utils/validation';

const SignIn = () => {
	const navigate = useNavigate();

	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const [validLogin, setValidLogin] = useState(false);

	useEffect(() => {
		if (isValidEmail(loginData.email) && loginData.password.length > 8) {
			setValidLogin(true);
		} else {
			setValidLogin(false);
		}
	}, [loginData]);

	return (
		<MainStyled>
			<h1>로그인</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<section>
					<DefaultInput>
						<div>
							<label htmlFor="email">이메일</label>
						</div>
						<input
							id="email"
							type="email"
							placeholder="이메일을 입력해주세요."
							value={loginData.email}
							onChange={(e) =>
								setLoginData((prev) => ({ ...prev, email: e.target.value }))
							}
						/>
					</DefaultInput>
					<DefaultInput>
						<div>
							<label htmlFor="password">비밀번호</label>
						</div>
						<input
							id="password"
							type="password"
							placeholder="비밀번호를 입력해주세요."
							value={loginData.password}
							onChange={(e) =>
								setLoginData((prev) => ({ ...prev, password: e.target.value }))
							}
						/>
					</DefaultInput>
				</section>
				<section>
					<div>
						<input
							id="keepLogin"
							type="checkbox"
							style={{ backgroundImage: `url(${Check})` }}
						/>
						<label htmlFor="keepLogin">로그인 상태 유지</label>
					</div>
					<div>비밀번호를 잊으셨나요?</div>
				</section>
				<Button type="submit" className="full" disabled={!validLogin}>
					로그인
				</Button>
			</form>
			<div>
				<span>아직 회원이 아니신가요?</span>
				<span onClick={() => navigate('/users/sign-up')}>회원가입하기</span>
			</div>
		</MainStyled>
	);
};

export default SignIn;

const MainStyled = styled.section`
	padding: 1rem 2rem;
	width: 100%;
	max-width: 37.5rem;
	margin: 0 auto;
	flex-grow: 1;

	form {
		padding: 1.5rem;
		border-radius: 0.5rem;
		border: 0.1rem solid #ced4da;
		margin-bottom: 1.5rem;

		section {
			margin-bottom: 1.5rem;

			&:nth-child(2) {
				display: flex;
				justify-content: space-between;

				div {
					font-size: 1.25rem;
					display: flex;
					align-items: center;
					cursor: pointer;

					input[type='checkbox'] {
						appearance: none;
						border-radius: 0.5rem;
						width: 1.8rem;
						height: 1.8rem;
						margin-right: 0.5rem;
						background-repeat: no-repeat;
						background-position: center center;
						transition: all 0.2s ease-in-out;
						border: 0.1rem solid #ced4da;
						cursor: pointer;

						&:checked {
							background-color: #00a100;
							border-color: #00a100;
						}
					}

					label {
						cursor: pointer;
					}
				}
			}
		}
	}

	& > div {
		color: #555555;
		margin-top: 1.5rem;
		display: flex;
		justify-content: center;

		span {
			font-size: 1.25rem;

			&:first-child {
				margin-right: 0.5rem;
			}

			&:last-child {
				cursor: pointer;
				transition: all 0.2s ease-in-out;

				&:hover {
					font-weight: 500;
					color: black;
					text-decoration: underline;
				}
			}
		}
	}
`;
