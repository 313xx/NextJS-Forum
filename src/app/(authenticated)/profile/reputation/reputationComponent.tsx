import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ReputationHistoryResponse } from '@/app/actions/profile/getReputationHistory';
import Link from 'next/link';

interface ReputationComponentProps {
	isLoading?: boolean;
	reputationHistory?: ReputationHistoryResponse;
}

const ReputationComponent = ({
	isLoading = false,
	reputationHistory
}: ReputationComponentProps) => {
	if (isLoading) {
		return (
			<div className='space-y-6'>
				<Skeleton className='h-4 w-[250px]' />
				<Skeleton className='h-24 w-full' />
			</div>
		);
	}

	if (!reputationHistory) {
		return (
			<div className='text-sm text-muted-foreground'>
				Unable to load reputation history.
			</div>
		);
	}

	const ReputationEntry = ({ entry, type }: { 
		entry: (typeof reputationHistory.received)[0] | (typeof reputationHistory.given)[0], 
		type: 'received' | 'given' 
	}) => {
		const username = type === 'received' 
			? (entry as typeof reputationHistory.received[0]).giver.username
			: (entry as typeof reputationHistory.given[0]).receiver.username;

		const contentInfo = entry.thread 
			? `on thread: ${entry.thread.title}`
			: entry.comment 
				? `on comment: ${entry.comment.content.slice(0, 50)}...`
				: 'general contribution';

		return (
			<div className='flex items-center justify-between border-b pb-4 last:border-0 last:pb-0'>
				<div className='flex items-center gap-4'>
					<Avatar>
						<Link href={`/user/${username}`} passHref>
							<AvatarImage 
								src={`https://avatar.vercel.sh/${username}.svg?text=${Array.from(username)[0].toUpperCase()}`} 
								alt='Avatar'
								className='object-cover cursor-pointer'
							/>
						</Link>
						<AvatarFallback>
							<Skeleton className='h-9 w-9 rounded-full' />
						</AvatarFallback>
					</Avatar>
					<div>
						<div className='flex items-center gap-2'>
							<Link href={`/user/${username}`} passHref>
								<p className='text-sm font-medium cursor-pointer'>{username}</p>
							</Link>
						</div>
						<p className='text-sm text-muted-foreground'>
							{entry.reason}
						</p>
						<p className='text-xs text-muted-foreground'>
							{contentInfo}
						</p>
						<p className='text-xs text-muted-foreground'>
							{new Date(entry.createdAt).toLocaleDateString()}
						</p>
					</div>
				</div>
				<div className={`text-sm font-medium ${entry.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
					{entry.amount >= 0 ? '+' : '-'}{entry.amount}
				</div>
			</div>
		);
	};

	return (
		<div className='space-y-8'>
			<div>
				<h2 className='text-lg font-semibold'>Reputation Overview</h2>
				<div className='mt-2 grid grid-cols-2 gap-4 md:grid-cols-4'>
					<Card>
						<CardContent className='pt-6'>
							<p className='text-sm text-muted-foreground'>Current Reputation</p>
							<p className='text-2xl font-bold'>{reputationHistory.user.currentReputation}</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='pt-6'>
							<p className='text-sm text-muted-foreground'>Reputation Power</p>
							<p className='text-2xl font-bold'>{reputationHistory.user.reputationPower}</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='pt-6'>
							<p className='text-sm text-muted-foreground'>Total Received</p>
							<p className='text-2xl font-bold'>{reputationHistory.user.totalReceived}</p>
						</CardContent>
					</Card>
					<Card>
						<CardContent className='pt-6'>
							<p className='text-sm text-muted-foreground'>Total Given</p>
							<p className='text-2xl font-bold'>{reputationHistory.user.totalGiven}</p>
						</CardContent>
					</Card>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Reputation History</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue='received'>
						<TabsList className='mb-4'>
							<TabsTrigger value='received'>
								Received ({reputationHistory.user.receivedCount})
							</TabsTrigger>
							<TabsTrigger value='given'>
								Given ({reputationHistory.user.givenCount})
							</TabsTrigger>
						</TabsList>
            
						<TabsContent value='received'>
							<div className='space-y-4'>
								{reputationHistory.received.length === 0 ? (
									<p className='text-sm text-muted-foreground'>
										No reputation received yet. Contribute to the community to earn reputation!
									</p>
								) : (
									reputationHistory.received.map((entry) => (
										<ReputationEntry key={entry.id} entry={entry} type='received' />
									))
								)}
							</div>
						</TabsContent>

						<TabsContent value='given'>
							<div className='space-y-4'>
								{reputationHistory.given.length === 0 ? (
									<p className='text-sm text-muted-foreground'>
										You haven&apos;t given any reputation yet. Recognize valuable contributions!
									</p>
								) : (
									reputationHistory.given.map((entry) => (
										<ReputationEntry key={entry.id} entry={entry} type='given' />
									))
								)}
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
};

export default ReputationComponent;