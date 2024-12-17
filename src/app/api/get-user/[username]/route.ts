import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { intendedError } from '@/utils/utils';

export async function GET(
	req: NextRequest, 
	{ params }: { params: { username: string } }
) {
	try {
		const username = params.username;

		const user = await prisma.user.findUnique({
			where: { username },
			select: {
				username: true,
				role: true
			}
		});
 
		if (!user) {
			return NextResponse.json(
				{ message: 'User not found' },
				{ status: 404 }
			);
		}
 
		return NextResponse.json(
			user , { status: 200 }
		);
	} catch (error) {
		intendedError('Request error', error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json(
				{ message: 'Database query error', errorCode: error.code },
				{ status: 500 }
			);
		}
		return NextResponse.json(
			{ message: 'Error fetching user' },
			{ status: 500 }
		);
	}
}