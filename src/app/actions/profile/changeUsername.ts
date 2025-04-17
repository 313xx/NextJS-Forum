import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/auth/cookie';
import { validateSession } from '@/auth/session';

export const changeUsername = async (oldUsername: string, newUsername: string) => {
	'use server';

	if (!newUsername || !oldUsername) {
		return { success: false, message: 'Username is required' };
	}
	
	try {
		const sessionToken = (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;

		if (!sessionToken)
			return { success: false, message: 'You are not logged in or your session is invalid' };

		const authResult = await validateSession(sessionToken);

		if (!authResult || !authResult.user)
			return { success: false, message: 'You are not logged in or your session is invalid' };

		const existingUser = await prisma.user.findUnique({
			where: {
				username: oldUsername
			}
		});

		if (!existingUser || existingUser.id !== authResult.user.id) {
			return { success: false, message: 'You are not authorized to change this username' };
		}

		const usernameExists = await prisma.user.findUnique({
			where: {
				username: newUsername
			}
		});

		if (usernameExists) {
			return { success: false, message: 'Username is already taken' };
		}

		await prisma.$transaction(async (tx) => {
			await tx.user.update({
				where: {
					id: existingUser.id
				},
				data: {
					username: newUsername
				}
			});
		});

		return { success: true, message: 'Username updated successfully' };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return { success: false, message: 'Database query error' };
		}
		return { success: false, message: 'Error changing username' };
	}
};