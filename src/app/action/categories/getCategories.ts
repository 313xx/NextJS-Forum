import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { intendedError } from '@/utils/utils';

export async function getCategories() {
	'use server';

	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
				description: true,
				isActive: true
			}
		});
        
		if (!categories) {
			throw new Error('Error fetching categories');
		}
 
		return categories;
	} catch (error) {
		intendedError('Request error', error);
        
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new Error(`Database query error: ${error.code}`);
		}
        
		throw new Error('Error fetching categories');
	}
}