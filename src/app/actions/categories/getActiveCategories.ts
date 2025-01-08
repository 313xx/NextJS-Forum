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
				isActive: true,
				_count: {
					select: {
						threads: true
					}
				}
			}
		});
        
		if (!categories || categories.length === 0) 
			return { success: false, message: 'Error fetching categories, no active categories' };
		
		return categories;
	} catch (error) {
		intendedError('Request error', error);
        
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new Error(`Database query error: ${error.code}`);
		}
        
		throw new Error('Error fetching categories');
	}
}