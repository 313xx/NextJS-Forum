import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { intendedError } from '@/utils/utils';

export async function getReputationHistory(username: string) {
	'use server';
   
	try {
		const reputationHistory = await prisma.user.findUnique({
			where: { username },
			select: {
				id: true,
				username: true,
				userInfo: {
					select: {
						reputation: true,
						reputationPower: true
					}
				},
				receivedReputation: {
					select: {
						id: true,
						amount: true,
						reason: true,
						createdAt: true,
						giver: {
							select: {
								username: true,
								userInfo: {
									select: {
										reputationPower: true
									}
								}
							}
						},
						thread: {
							select: {
								id: true,
								title: true
							}
						},
						comment: {
							select: {
								id: true,
								content: true
							}
						}
					},
					orderBy: {
						createdAt: 'desc'
					}
				},
				givenReputation: {
					select: {
						id: true,
						amount: true,
						reason: true,
						createdAt: true,
						receiver: {
							select: {
								username: true
							}
						},
						thread: {
							select: {
								id: true,
								title: true
							}
						},
						comment: {
							select: {
								id: true,
								content: true
							}
						}
					},
					orderBy: {
						createdAt: 'desc'
					}
				}
			}
		});

		if (!reputationHistory) {
			throw new Error('User not found');
		}

		const stats = {
			totalReceived: reputationHistory.receivedReputation.reduce((sum, rep) => sum + rep.amount, 0),
			totalGiven: reputationHistory.givenReputation.reduce((sum, rep) => sum + rep.amount, 0),
			receivedCount: reputationHistory.receivedReputation.length,
			givenCount: reputationHistory.givenReputation.length,
			currentReputation: reputationHistory.userInfo?.reputation || 0,
			reputationPower: reputationHistory.userInfo?.reputationPower || 0
		};

		return {
			user: {
				username: reputationHistory.username,
				...stats
			},
			received: reputationHistory.receivedReputation,
			given: reputationHistory.givenReputation
		};

	} catch (error) {
		intendedError('Request error', error);
       
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			throw new Error(`Database query error: ${error.code}`);
		}
       
		throw new Error('Error fetching reputation history');
	}
}

export type ReputationHistoryResponse = {
	user: {
		username: string;
		totalReceived: number;
		totalGiven: number;
		receivedCount: number;
		givenCount: number;
		currentReputation: number;
		reputationPower: number;
	};
	received: {
		id: string;
		amount: number;
		reason: string;
		createdAt: Date;
		giver: {
			username: string;
			userInfo: {
				reputationPower: number;
			} | null;
		};
		thread?: {
			id: string;
			title: string;
		} | null;
		comment?: {
			id: string;
			content: string;
		} | null;
	}[];
	given: {
		id: string;
		amount: number;
		reason: string;
		createdAt: Date;
		receiver: {
			username: string;
		};
		thread?: {
			id: string;
			title: string;
		} | null;
		comment?: {
			id: string;
			content: string;
		} | null;
	}[];
};