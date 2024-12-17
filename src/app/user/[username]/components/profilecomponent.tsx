import React from 'react';
import { User } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface ProfileComponentProps {
	user: User,
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ user }) => {
	return (
		<Card className='w-full max-w-md mx-auto mt-8 sm:mt-16 md:mt-32 p-4 sm:p-6'>
			<CardHeader>
				<div className='flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4'>
					<Avatar className='h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-sm'>
						<AvatarImage
							src={`https://avatar.vercel.sh/${user.username}.svg?text=${Array.from(user.username)[0].toUpperCase()}`}
							alt='Avatar'
							className='object-cover'
						/>
						<AvatarFallback>
							<Skeleton className='h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-sm' />
						</AvatarFallback>
					</Avatar>
					<div className='text-center sm:text-left space-y-1 w-full'>
						<h2 className='text-base sm:text-lg md:text-xl font-semibold truncate'>
							{user.username}
						</h2>
						<p className='text-sm sm:text-md text-muted-foreground'>
							Bio
						</p>
					</div>
				</div>
			</CardHeader>
			<Separator className='my-4' />
			<CardContent>
				<p className='text-sm sm:text-md text-muted-foreground'>
					1 Post
				</p>
			</CardContent>
		</Card>
	);
};

export default ProfileComponent;