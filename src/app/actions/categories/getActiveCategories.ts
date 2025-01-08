import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { intendedError } from '@/utils/utils';

export async function getActiveCategories() {
	'use server';

	try {
		const categories = await prisma.category.findMany({
			where: {
				isActive: true
			},
			select: {
				id: true,
				name: true,
				description: true,
				isActive: true
			}
		});
        
		if (!categories || categories.length === 0) 
			throw new Error('No active categories found');
		
		return categories;
	} catch (error) {
		intendedError('Request error', error);
        
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new Error(`Database query error: ${error.code}`);
		}
        
		throw new Error('Error fetching categories');
	}
}