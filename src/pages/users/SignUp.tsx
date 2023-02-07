import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useLocation } from 'react-router-dom';
import { Button } from 'style/common/Buttons';
import { DefaultInput } from 'style/common/Input';
import styled from 'styled-components';
import { isValidDate, isValidEmail } from 'utils/validation';

const SignUp = () => {
	const open = useDaumPostcodePopup(
		'//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
	);
	const { state } = useLocation();
	const [presidentMode, setPresidentMode] = useState(state);

	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
		institution: false,
		institutionCode: '',
	});
	const [businessInfo, setBusinessInfo] = useState({
		institutionName: '',
		institutionAddress: {
			postcode: '',
			main: '',
			detail: '',
		},
		b_no: {
			top: '',
			mid: '',
			bottom: '',
		},
		p_nm: '',
		start_dt: '',
	});
	const [validChecked, setValidChecked] = useState({
		email: false,
		businessNum: false,
	});
	const [validSignUp, setValidSignUp] = useState(false);

	const handleComplete = ({
		address,
		addressType,
		bname,
		buildingName,
		zonecode,
	}) => {
		let fullAddress = address;
		let extraAddress = '';

		if (addressType === 'R') {
			if (bname !== '') {
				extraAddress += bname;
			}
			if (buildingName !== '') {
				extraAddress +=
					extraAddress !== '' ? `, ${buildingName}` : buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		setData((prev) => ({
			...prev,
			institutionAddress: {
				postcode: zonecode,
				main: fullAddress,
				detail: '',
			},
		}));
	};

	const checkBusiness = async () => {
		if (validChecked.businessNum) {
			setValidChecked((prev) => ({ ...prev, businessNum: false }));
			setBusinessInfo((prev) => ({
				...prev,
				b_no: {
					top: '',
					mid: '',
					bottom: '',
				},
				p_nm: '',
				start_dt: '',
			}));
		} else {
			try {
				const { data: response } = await axios.post(
					`//api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${process.env.REACT_APP_PUBLIC_DATA_KEY}`,
					{
						businesses: [
							{
								b_no: `${businessInfo.b_no.top}${businessInfo.b_no.mid}${businessInfo.b_no.bottom}`,
								start_dt: businessInfo.start_dt.replaceAll('-', ''),
								p_nm: businessInfo.p_nm,
							},
						],
					}
				);
				if (response.status_code === 'OK' && response.data[0].valid === '01') {
					setValidChecked((prev) => ({ ...prev, businessNum: true }));
				} else {
					alert('사업자 정보가 일치하지 않습니다.');
				}
			} catch (e) {
				alert(e?.message);
			}
		}
	};

	// 회원가입 버튼 활성화/비활성화
	useEffect(() => {
		if (!presidentMode) {
			if (
				data.name.length >= 2 &&
				validChecked.email &&
				data.password === data.passwordConfirm &&
				data.password.length > 8 &&
				(!data.institution ||
					(data.institution && data.institutionCode.length === 5))
			) {
				setValidSignUp(true);
			} else {
				setValidSignUp(false);
			}
		} else {
			if (
				data.name.length >= 2 &&
				validChecked.email &&
				validChecked.businessNum &&
				data.password === data.passwordConfirm &&
				data.password.length > 8 &&
				businessInfo.institutionName.length > 0 &&
				businessInfo.institutionAddress.postcode.length > 0 &&
				businessInfo.institutionAddress.main.length > 0
			) {
				setValidSignUp(true);
			} else {
				setValidSignUp(false);
			}
		}
	}, [data, businessInfo, validChecked]);

	useEffect(() => {
		if (data.institution) {
			setData((prev) => ({ ...prev, institutionCode: '' }));
		}
	}, [data.institution]);

	return (
		<MainStyled>
			<h1>회원가입</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					console.log(!state ? data : { ...data, ...businessInfo });
				}}
			>
				{/* 기본 */}
				<section>
					<DefaultInput>
						<div>
							<label htmlFor="name">이름</label>
						</div>
						<input
							id="name"
							type="text"
							placeholder="이름을 입력해주세요."
							value={data.name}
							onChange={(e) =>
								setData((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
					</DefaultInput>
					<DefaultInput>
						<div>
							<label htmlFor="email">이메일</label>
							<span className="guide-msg"></span>
						</div>
						<div>
							<input
								id="email"
								type="email"
								placeholder="이메일을 입력해주세요."
								value={data.email}
								disabled={validChecked.email}
								onChange={(e) =>
									setData((prev) => ({ ...prev, email: e.target.value }))
								}
							/>
							<Button
								type="button"
								disabled={!isValidEmail(data.email)}
								onClick={() => {
									if (!validChecked.email) {
										if (isValidEmail(data.email)) {
											setValidChecked((prev) => ({ ...prev, email: true }));
										} else {
											alert('이메일을 올바르게 입력해주세요.');
										}
									} else {
										setValidChecked((prev) => ({ ...prev, email: false }));
										setData((prev) => ({ ...prev, email: '' }));
									}
								}}
							>
								{validChecked.email ? '새로입력' : '중복확인'}
							</Button>
						</div>
					</DefaultInput>
					<DefaultInput>
						<div>
							<label htmlFor="password">비밀번호</label>
						</div>
						<input
							id="password"
							type="password"
							placeholder="비밀번호를 입력해주세요."
							value={data.password}
							onChange={(e) =>
								setData((prev) => ({ ...prev, password: e.target.value }))
							}
						/>
					</DefaultInput>
					<DefaultInput>
						<div>
							<label htmlFor="password-confirm">비밀번호 확인</label>
						</div>
						<input
							id="password-confirm"
							type="password"
							placeholder="비밀번호를 한 번 더 입력해주세요."
							value={data.passwordConfirm}
							onChange={(e) =>
								setData((prev) => ({
									...prev,
									passwordConfirm: e.target.value,
								}))
							}
						/>
					</DefaultInput>
				</section>

				{presidentMode ? (
					// 대표자
					<>
						<section>
							<DefaultInput>
								<div>
									<label htmlFor="institutionName">학원명</label>
								</div>
								<input
									id="institutionName"
									type="text"
									placeholder="학원명을 입력해주세요."
									value={businessInfo.institutionName}
									onChange={(e) =>
										setBusinessInfo((prev) => ({
											...prev,
											institutionName: e.target.value,
										}))
									}
								/>
							</DefaultInput>
							<DefaultInput>
								<div>
									<label>학원 주소</label>
								</div>
								<div className="address">
									<input
										type="text"
										placeholder="우편번호"
										disabled={true}
										value={businessInfo.institutionAddress.postcode}
									/>
									<Button
										type="button"
										className="active"
										onClick={() => open({ onComplete: handleComplete })}
									>
										{businessInfo.institutionAddress.postcode &&
										businessInfo.institutionAddress.main
											? '재검색'
											: '검색'}
									</Button>
								</div>
								<input
									type="text"
									className="address"
									placeholder="기본 주소"
									disabled={true}
									value={businessInfo.institutionAddress.main}
								/>
								<input
									type="text"
									className="address"
									placeholder="상세 주소를 입력해주세요."
									value={businessInfo.institutionAddress.detail}
									onChange={(e) =>
										setBusinessInfo((prev) => ({
											...prev,
											institutionAddress: {
												...prev.institutionAddress,
												detail: e.target.value,
											},
										}))
									}
								/>
							</DefaultInput>
						</section>
						<section>
							<DefaultInput>
								<div>
									<label>사업자등록번호</label>
								</div>
								<div>
									<input
										type="text"
										className="businessNum"
										maxLength={3}
										disabled={validChecked.businessNum}
										value={businessInfo.b_no.top}
										onChange={(e) =>
											setBusinessInfo((prev) => ({
												...prev,
												b_no: {
													...prev.b_no,
													top: e.target.value.replace(/\D/, ''),
												},
											}))
										}
									/>
									<span className="divider">—</span>
									<input
										type="text"
										className="businessNum"
										maxLength={2}
										disabled={validChecked.businessNum}
										value={businessInfo.b_no.mid}
										onChange={(e) =>
											setBusinessInfo((prev) => ({
												...prev,
												b_no: {
													...prev.b_no,
													mid: e.target.value.replace(/\D/, ''),
												},
											}))
										}
									/>
									<span className="divider">—</span>
									<input
										type="text"
										className="businessNum"
										maxLength={5}
										disabled={validChecked.businessNum}
										value={businessInfo.b_no.bottom}
										onChange={(e) =>
											setBusinessInfo((prev) => ({
												...prev,
												b_no: {
													...prev.b_no,
													bottom: e.target.value.replace(/\D/, ''),
												},
											}))
										}
									/>
								</div>
							</DefaultInput>
							<DefaultInput>
								<div>
									<label htmlFor="president">대표자</label>
								</div>
								<input
									id="president"
									type="text"
									placeholder="대표자를 입력해주세요."
									disabled={validChecked.businessNum}
									value={businessInfo.p_nm}
									onChange={(e) =>
										setBusinessInfo((prev) => ({
											...prev,
											p_nm: e.target.value,
										}))
									}
								/>
							</DefaultInput>
							<DefaultInput>
								<div>
									<label htmlFor="date">개업일자</label>
								</div>
								<input
									id="date"
									type="date"
									disabled={validChecked.businessNum}
									value={businessInfo.start_dt}
									onChange={(e) => {
										setBusinessInfo((prev) => ({
											...prev,
											start_dt: e.target.value,
										}));
									}}
								/>
							</DefaultInput>
							<Button
								type="button"
								className="business full"
								disabled={
									!(
										businessInfo.b_no.top.length +
											businessInfo.b_no.mid.length +
											businessInfo.b_no.bottom.length ===
											10 &&
										businessInfo.p_nm.length > 0 &&
										isValidDate(businessInfo.start_dt)
									)
								}
								onClick={() => checkBusiness()}
							>
								{validChecked.businessNum
									? '사업자 등록번호 재입력'
									: '사업자 등록번호 중복확인'}
							</Button>
						</section>
					</>
				) : (
					<section
						className={`institution-input-group${
							data.institution ? ' margin-bottom' : ''
						}`}
					>
						<DefaultInput>
							<div>
								<label htmlFor="institution">소속 학원</label>
							</div>
							<div className="radio-input-group">
								<div
									onClick={() =>
										setData((prev) => ({ ...prev, institution: false }))
									}
								>
									<input
										id="no"
										name="institution"
										type="radio"
										checked={!data.institution}
										onChange={() =>
											setData((prev) => ({ ...prev, institution: false }))
										}
									/>
									<label htmlFor="no">없음</label>
								</div>
								<div
									onClick={() =>
										setData((prev) => ({ ...prev, institution: true }))
									}
								>
									<input
										id="yes"
										name="institution"
										type="radio"
										checked={data.institution}
										onChange={() =>
											setData((prev) => ({ ...prev, institution: true }))
										}
									/>
									<label htmlFor="yes">있음</label>
								</div>
							</div>
							<input
								id="institution"
								className={`institution-code${
									data.institution ? ' active' : ' inactive'
								}`}
								type="text"
								maxLength={5}
								placeholder="학원 코드를 입력해주세요."
								value={data.institutionCode}
								onChange={(e) =>
									setData((prev) => ({
										...prev,
										institutionCode: e.target.value,
									}))
								}
							/>
						</DefaultInput>
					</section>
				)}

				<Button type="submit" className="full" disabled={!validSignUp}>
					{presidentMode ? '학원 추가하고 가입하기' : '가입하기'}
				</Button>
			</form>
			<div onClick={() => setPresidentMode((prev) => !prev)}>
				{presidentMode
					? '학원 코드가 있으신가요?'
					: '학원 추가가 필요하신가요?'}
			</div>
		</MainStyled>
	);
};

export default SignUp;

const MainStyled = styled.section`
	flex-grow: 1;
	width: 100%;
	max-width: 37.5rem;
	margin: 0 auto;
	position: relative;
	padding: 1rem 2rem;
	box-sizing: border-box;

	form {
		section:not(:first-of-type) {
			margin-top: 1.5rem;
		}

		section.institution-input-group {
			position: relative;
			transition: all 0.2s ease-in-out;

			&.margin-bottom {
				margin-bottom: 3.9375rem;
			}
		}
	}

	& > div {
		margin-top: 3rem;
		text-align: center;
		font-size: 1.25rem;
		color: #555555;
		font-weight: 500;
		cursor: pointer;
	}
`;
