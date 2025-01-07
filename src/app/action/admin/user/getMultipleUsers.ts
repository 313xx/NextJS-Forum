import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { intendedError } from '@/utils/utils';

export type UsersResponse = {
	users: {
		username: string;
		role: string;
	}[];
	pagination: {
		currentPage: number;
		pageSize: number;
		totalUsers: number;
		totalPages: number;
	};
}

export async function getMultipleUsers({
	page = 1,
	limit = 10,
	search = ''
}: {
	page?: number;
	limit?: number;
	search?: string;
}): Promise<UsersResponse> {
	'use server';
    
	try {
		const skip = (page - 1) * limit;
		const whereCondition: Prisma.UserWhereInput = search
			? { username: { contains: search } }
			: {};

		const [users, totalUsers,] = await Promise.all([
			prisma.user.findMany({
				where: whereCondition,
				select: {
					username: true,
					role: true
				},
				skip,
				take: limit,
				orderBy: {
					id: 'asc'
				}
			}),
			prisma.user.count({ where: whereCondition }),
		]);

		return {
			users,
			pagination: {
				currentPage: page,
				pageSize: limit,
				totalUsers,
				totalPages: Math.ceil(totalUsers / limit)
			}
		};
	} catch (error) {
		intendedError('User fetch error:', error);
        
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new Error(`Database query error: ${error.code}`);
		}
        
		throw new Error('Error fetching users');
	}
}