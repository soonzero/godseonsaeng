export const isValidEmail = (email) => {
	return /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};

export const isValidDate = (date) => {
	return /^[12]{1}[0-9]{3}-([0]{1}[1-9]{1}|[1]{1}[0-2]{1})-([0]{1}[1-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-9]{1}|[3]{1}[01]{1})$/.test(
		date
	);
};
