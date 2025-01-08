import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { intendedError } from '@/utils/utils';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/auth/cookie';
import { validateSession } from '@/auth/session';

export async function getCategories() {
	'use server';

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
				
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
				description: true,
				isActive: true
			}
		});
        
		if (!categories || categories.length === 0) 
			throw new Error('Error fetching categories');
 
		return categories;
	} catch (error) {
		intendedError('Request error', error);
        
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new Error(`Database query error: ${error.code}`);
		}
        
		throw new Error('Error fetching categories');
	}
}