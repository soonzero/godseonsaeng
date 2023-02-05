import { useState } from 'react';
import { Button } from 'style/common/Buttons';
import { DefaultInput } from 'style/common/Input';
import styled from 'styled-components';
import { isValidEmail } from 'utils/validation';

const FindPassword = () => {
	const [email, setEmail] = useState('');

	return (
		<MainStyled>
			<h1>비밀번호 찾기</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<DefaultInput>
					<div>
						<label htmlFor="email">이메일</label>
						<span className="guide-msg"></span>
					</div>
					<input
						type="email"
						placeholder="이메일을 입력해주세요."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</DefaultInput>
				<Button type="submit" className="full" disabled={!isValidEmail(email)}>
					비밀번호 찾기
				</Button>
			</form>
		</MainStyled>
	);
};

export default FindPassword;

const MainStyled = styled.main`
	width: 100%;
	max-width: 37.5rem;
	margin: 0 auto;
	padding: 1rem 2rem;
	flex-grow: 1;

	form {
		padding: 2rem;
		border-radius: 0.2rem;
		border: 0.1rem solid #ced4da;
	}
`;
