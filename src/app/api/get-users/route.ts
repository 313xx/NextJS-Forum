import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { intendedError } from '@/utils/utils';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const page = Number(searchParams.get('page') || '1');
		const limit = Number(searchParams.get('limit') || '10');
		const search = searchParams.get('search') || '';
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

		return NextResponse.json({
			users,
			pagination: {
				currentPage: page,
				pageSize: limit,
				totalUsers,
				totalPages: Math.ceil(totalUsers / limit)
			}
		}, { status: 200 });
	} catch (error) {
		intendedError('User fetch error:', error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json(
				{ message: 'Database query error', errorCode: error.code },
				{ status: 500 }
			);
		}
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}