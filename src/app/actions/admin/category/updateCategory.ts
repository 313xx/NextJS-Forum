import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/auth/cookie';
import { validateSession } from '@/auth/session';

export const updateCategory = async (id: string, { name, description, isActive }: { name: string; description: string; isActive: boolean }) => {
	'use server';

	if (!name || !description || isActive === null) {
		return { success: false, message: 'Missing field' };
	}

	try {
		const sessionToken = (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;

		if (!sessionToken) 
			return { success: false, message: 'You are not logged in or your session is invalid' };

		const authResult = await validateSession(sessionToken);

		if (!authResult || !authResult.user) 
			return { success: false, message: 'You are not logged in or your session is invalid' };

		const currentUser = authResult.user;

		if (currentUser.role !== 'ADMIN') 
			return { success: false, message: 'Permission denied' };
		
		await prisma.category.update({
			where: {
				id
			},
			data: {
				name,
				description,
				isActive
			}
		});

		return { success: true, message: 'Category updated successfully' };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return { success: false, message: 'Database query error' };
		}
		return { success: false, message: 'Error updating category' };
	}
};