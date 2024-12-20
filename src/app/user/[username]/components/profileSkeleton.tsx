import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const ProfileSkeleton = () => {
	return (
		<Card className='w-full max-w-md mx-auto mt-8 sm:mt-16 md:mt-32 p-4 sm:p-6'>
			<CardHeader>
				<div className='flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 relative'>
					<div className='flex flex-col items-center'>
						{/* Avatar */}
						<Skeleton className='h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-sm' />
            
						{/* Badge */}
						<Skeleton className='h-5 w-16 mt-2 rounded-full' />
					</div>
          
					<div className='text-center sm:text-left space-y-1 w-full'>
						{/* Username */}
						<Skeleton className='h-6 w-32 sm:w-48' />
            
						{/* Bio */}
						<Skeleton className='h-4 w-24 sm:w-32' />
					</div>
				</div>
			</CardHeader>
      
			<Separator className='my-4' />
      
			<CardContent>
				{/* Posts count (temp) */}
				<Skeleton className='h-4 w-20' />
			</CardContent>
		</Card>
	);
};

export default ProfileSkeleton;