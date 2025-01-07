import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const ProfileSkeleton = () => {
	return (
		<div className='min-h-screen bg-gradient-to-b from-background to-muted/20 py-8'>
			<Card className='w-full max-w-2xl mx-auto shadow-lg transition-shadow duration-300'>
				<CardHeader className='pb-6'>
					<div className='flex flex-col sm:flex-row items-start gap-6 relative'>
						<div className='flex flex-col items-center sm:items-start gap-3 w-full sm:w-auto'>
							<Skeleton className='h-24 w-24 rounded-lg' />
							<Skeleton className='h-6 w-20 rounded-full' />
						</div>

						<div className='flex-1 space-y-3'>
							<div className='flex items-start justify-between'>
								<Skeleton className='h-6 w-32' />
								<Skeleton className='h-6 w-8 rounded-full' />
							</div>

							<Skeleton className='h-4 w-48' />
						</div>
					</div>
				</CardHeader>

				<Separator />

				<CardContent className='pt-6'>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex items-center gap-2 p-4 rounded-lg bg-muted/50'>
							<Skeleton className='h-5 w-5 rounded-full' />
							<div className='space-y-2'>
								<Skeleton className='h-4 w-16' />
								<Skeleton className='h-6 w-12' />
							</div>
						</div>
						<div className='flex items-center gap-2 p-4 rounded-lg bg-muted/50'>
							<Skeleton className='h-5 w-5 rounded-full' />
							<div className='space-y-2'>
								<Skeleton className='h-4 w-16' />
								<Skeleton className='h-6 w-12' />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProfileSkeleton;
