import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds);
	return bcrypt.hash(password, salt);
};

export const verifyPasswordHash = async (
	hashedPassword: string,
	password: string
): Promise<boolean> => {
	return bcrypt.compare(password, hashedPassword);
};