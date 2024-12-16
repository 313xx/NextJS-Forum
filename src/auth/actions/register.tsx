'use server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/auth/password';
import { generateRandomSessionToken, createSession } from '@/auth/session';
import { setSessionCookie } from '@/auth/cookie';
import { intendedError } from '@/utils/utils';

const register = async (formData: FormData) => {
	const formDataRaw = {
		username: (formData.get('username') as string)?.trim(),
		password: formData.get('password') as string
	};

	if (!formDataRaw.username) {
		throw new Error('Username is required');
	}
	if (!formDataRaw.password) {
		throw new Error('Password is required');
	}

	if (/\s/.test(formDataRaw.username)) {
		throw new Error('Username cannot contain spaces');
	}
	if (/\s/.test(formDataRaw.password)) {
		throw new Error('Password cannot contain spaces');
	}

	const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

	if (!PASSWORD_REGEX.test(formDataRaw.password)) {
		throw new Error('Password must be at least 8 characters long and include uppercase, lowercase, and number');
	}

	try {
		const existingUser = await prisma.user.findUnique({
			where: { username: formDataRaw.username }
		});

		if (existingUser) {
			throw new Error('Username is already in use');
		}

		const passwordHash = await hashPassword(formDataRaw.password);
		const user = await prisma.user.create({
			data: {
				username: formDataRaw.username,
				passwordHash
			}
		});

		const sessionToken = generateRandomSessionToken();
		const session = await createSession(sessionToken, user.id);
		await setSessionCookie(sessionToken, session.expiresAt);

		redirect('/');
	} catch (error) {
		intendedError('Registration error:', error);

		throw error;
	}
};

export { register };
