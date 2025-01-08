import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { intendedError } from '@/utils/utils';

export async function getUser(username: string) {
	'use server';
    
	try {
		const user = await prisma.user.findUnique({
			where: { username },
			select: {
				username: true,
				role: true,
				createdAt: true,
				_count: {
					select: {
						threads: true,
						comments: true
					}
				}
			}
		});
       
		if (!user) {
			throw new Error('User not found');
		}
 
		return user;
	} catch (error) {
		intendedError('Request error', error);
       
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new Error(`Database query error: ${error.code}`);
		}
       
		throw new Error('Error fetching user');
	}
}