'use server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { verifyPasswordHash } from '@/auth/password';
import { generateRandomSessionToken, createSession } from '@/auth/session';
import { setSessionCookie } from '@/auth/cookie';

const login = async (formData: FormData) => {
	const username = formData.get('username') as string;
	const password = formData.get('password') as string;

	if (!username || !password) {
		throw new Error('Username and password are required');
	}

	// eslint-disable-next-line no-useless-catch
	try {
		const user = await prisma.user.findUnique({
			where: { username }
		});

		if (!user) {
			throw new Error('Incorrect username or password');
		}

		const validPassword = await verifyPasswordHash(user.passwordHash, password);
		if (!validPassword) {
			throw new Error('Incorrect username or password');
		}

		const sessionToken = generateRandomSessionToken();
		const session = await createSession(sessionToken, user.id);
		await setSessionCookie(sessionToken, session.expiresAt);

		redirect('/');
	} catch (error) {
		throw error;
	}
};

export { login };