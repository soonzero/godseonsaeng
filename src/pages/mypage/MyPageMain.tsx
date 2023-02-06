import { useEffect, useState } from 'react';
import { Button } from 'style/common/Buttons';
import { DefaultInput } from 'style/common/Input';
import styled from 'styled-components';
import { isValidEmail } from 'utils/validation';

const MyPageMain = () => {
	// 이메일 관련
	const [email, setEmail] = useState({
		origin: 'sykeum0912@naver.com',
		modified: '',
		changeMode: false,
	});

	// 학원 코드
	const [institutionCode] = useState('fI2gL');

	// 비밀번호 관련
	const [passwords, setPasswords] = useState({
		prev: '',
		new: '',
		newConfirm: '',
	});

	// 비밀번호 validation 관련
	const [validPasswords, setValidPasswords] = useState({
		prev: false,
		prevMsg: '',
		new: false,
		newMsg: '',
		newConfirm: false,
		newConfirmMsg: '',
		checked: false,
	});

	const changeEmail = () => {
		if (email.origin !== email.modified) {
			if (isValidEmail(email.modified)) {
				setEmail((prev) => ({
					...prev,
					origin: prev.modified,
					changeMode: false,
				}));
			} else {
				alert('이메일 형식이 올바르지 않습니다.');
			}
		} else {
			alert('변경할 이메일이 이전 이메일과 동일합니다.');
		}
	};

	useEffect(() => {
		if (validPasswords.checked) {
			if (passwords.prev.length >= 8 && passwords.prev.length <= 15) {
				setValidPasswords((pre) => ({ ...pre, prev: true, prevMsg: '' }));
			} else {
				setValidPasswords((pre) => ({
					...pre,
					prev: false,
					prevMsg: '영문, 숫자 포함 8~15자',
				}));
			}

			if (
				passwords.new.length >= 8 &&
				passwords.new.length <= 15 &&
				passwords.prev !== passwords.new &&
				passwords.new === passwords.newConfirm
			) {
				setValidPasswords((pre) => ({
					...pre,
					new: true,
					newMsg: '',
					newConfirm: true,
					newConfirmMsg: '',
				}));
			} else {
				// 새 비밀번호
				if (passwords.new.length < 8 || passwords.new.length > 15) {
					setValidPasswords((pre) => ({
						...pre,
						new: false,
						newMsg: '영문, 숫자 포함 8~15자',
					}));
				} else if (passwords.new === passwords.prev) {
					setValidPasswords((pre) => ({
						...pre,
						new: false,
						newMsg: '동일한 비밀번호로 변경할 수 없습니다.',
					}));
				} else {
					setValidPasswords((pre) => ({
						...pre,
						new: true,
						newMsg: '',
					}));
				}

				// 새 비밀번호 확인
				if (
					passwords.newConfirm.length < 8 ||
					passwords.newConfirm.length > 15
				) {
					setValidPasswords((pre) => ({
						...pre,
						newConfirm: false,
						newConfirmMsg: '영문, 숫자 포함 8~15자',
					}));
				} else if (passwords.new !== passwords.newConfirm) {
					setValidPasswords((pre) => ({
						...pre,
						newConfirm: false,
						newConfirmMsg: '비밀번호가 다릅니다.',
					}));
				} else {
					setValidPasswords((pre) => ({
						...pre,
						newConfirm: true,
						newConfirmMsg: '',
					}));
				}
			}
		}
	}, [passwords, validPasswords.checked]);

	return (
		<MyPageMainStyled>
			<h1>마이 페이지</h1>
			<section>
				<form>
					<DefaultInput>
						<div>
							<label htmlFor="email">이메일</label>
						</div>
						<div>
							<input
								id="email"
								type="email"
								disabled={!email.changeMode}
								placeholder="변경하실 이메일을 입력해주세요."
								value={email.changeMode ? email.modified : email.origin}
								onChange={(e) =>
									setEmail((prev) => ({ ...prev, modified: e.target.value }))
								}
							/>
							<Button
								type="button"
								onClick={() => {
									if (!email.changeMode) {
										setEmail((prev) => ({
											...prev,
											changeMode: true,
										}));
									} else {
										changeEmail();
									}
								}}
							>
								{email.changeMode ? '저장' : '변경'}
							</Button>
						</div>
					</DefaultInput>
					<DefaultInput>
						<div>
							<label htmlFor="institution-code">학원 코드</label>
						</div>
						<input
							id="institution-code"
							type="type"
							disabled={true}
							value={institutionCode}
						/>
					</DefaultInput>
				</form>
			</section>
			<section>
				<form>
					<DefaultInput>
						<div>
							<label htmlFor="prevPassword">이전 비밀번호</label>
							<span className="guide-msg">{validPasswords.prevMsg}</span>
						</div>
						<input
							id="prevPassword"
							type="password"
							placeholder="이전 비밀번호를 입력해주세요."
							value={passwords.prev}
							onChange={(e) =>
								setPasswords((prev) => ({ ...prev, prev: e.target.value }))
							}
						/>
					</DefaultInput>
					<DefaultInput>
						<div>
							<label htmlFor="newPassword">새 비밀번호</label>
							<span className="guide-msg">{validPasswords.newMsg}</span>
						</div>
						<input
							id="newPassword"
							type="password"
							placeholder="새 비밀번호를 입력해주세요."
							value={passwords.new}
							onChange={(e) =>
								setPasswords((prev) => ({ ...prev, new: e.target.value }))
							}
						/>
					</DefaultInput>
					<DefaultInput>
						<div>
							<label htmlFor="newPasswordConfirm">새 비밀번호 확인</label>
							<span className="guide-msg">{validPasswords.newConfirmMsg}</span>
						</div>
						<input
							id="newPasswordConfirm"
							type="password"
							placeholder="새 비밀번호를 한 번 더 입력해주세요."
							value={passwords.newConfirm}
							onChange={(e) =>
								setPasswords((prev) => ({
									...prev,
									newConfirm: e.target.value,
								}))
							}
						/>
					</DefaultInput>
					<Button
						type="button"
						className="full"
						disabled={
							!validPasswords.checked
								? !(
										passwords.prev.length > 0 &&
										passwords.new.length > 0 &&
										passwords.newConfirm.length > 0
								  )
								: !validPasswords.prev ||
								  !validPasswords.new ||
								  !validPasswords.newConfirm
						}
						onClick={() =>
							setValidPasswords((prev) => ({ ...prev, checked: true }))
						}
					>
						비밀번호 변경
					</Button>
				</form>
			</section>
		</MyPageMainStyled>
	);
};

export default MyPageMain;

const MyPageMainStyled = styled.main`
	width: 100%;
	max-width: 37.5rem;
	margin: 0 auto;
	padding: 1rem 2rem;

	section {
		padding: 2rem;
		border: 0.1rem solid #e5e5e5;
		border-radius: 0.2rem;
		margin-bottom: 3rem;
	}

	button.full {
		margin-top: 1.5rem;
	}
`;
