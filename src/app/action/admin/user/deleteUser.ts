import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/auth/cookie';
import { validateSession } from '@/auth/session';

export const deleteUser = async (username: string) => {
	'use server';

	if (!username) {
		return { success: false, message: 'Username is required' };
	}

	const testUsername = username.trim().toLowerCase();
	if (!testUsername.match(/^[a-z0-9_-]+$/i)) {
		return { success: false, message: 'Invalid username format' };
	}

	try {
		const sessionToken = cookies().get(SESSION_COOKIE_NAME)?.value ?? null;

		if (!sessionToken) 
			return { success: false, message: 'You are not logged in or your session is invalid' };

		const authResult = await validateSession(sessionToken);

		if (!authResult || !authResult.user) 
			return { success: false, message: 'You are not logged in or your session is invalid' };

		const currentUser = authResult.user;

		if (currentUser.role !== 'ADMIN') 
			return { success: false, message: 'Permission denied' };

		await prisma.$transaction(async (transaction) => {
			const user = await transaction.user.findUnique({
				where: { username },
				select: { username: true }
			});

			if (!user) {
				throw new Error('User not found');
			}

			if (user.username === currentUser.username) {
				throw new Error('You cannot delete your own account');
			}

			await transaction.user.delete({
				where: { username }
			});
		});

		return { success: true, message: 'User deleted successfully' };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return { success: false, message: 'Database query error' };
		}
		return { success: false, message: 'Error deleting user' };
	}
};