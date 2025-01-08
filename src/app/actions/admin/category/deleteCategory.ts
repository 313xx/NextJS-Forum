import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/auth/cookie';
import { validateSession } from '@/auth/session';

export const deleteCategory = async (id: string) => {
	'use server';

	if (!id) {
		return { success: false, message: 'Missing field' };
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
        
		const category = await prisma.category.findUnique({
			where: { id },
			select: { id: true, isActive: true }
		});
          
		if (!category)
			return { success: false, message: 'Category not found' };

		if (category.isActive) 
			return { success: false, message: 'Category is active, deactivate it first' };
          
		await prisma.category.delete({
			where: { id }
		});  

		return { success: true, message: 'Category deleted successfully' };
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return { success: false, message: 'Database query error' };
		}
		return { success: false, message: 'Error deleting category' };
	}
};