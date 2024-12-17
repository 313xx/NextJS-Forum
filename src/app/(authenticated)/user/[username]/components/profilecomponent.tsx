import React from 'react';
import { User } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileComponentProps {
	user: User,
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ user }) => {
	return (
		<Card className='w-full max-w-md mx-auto'>
			<CardHeader>
				<div className='flex items-center space-x-4'>
					<Avatar>
						<AvatarImage 
							src={`https://avatar.vercel.sh/${user.username}.svg?text=${Array.from(user.username)[0].toUpperCase()}`} 
							alt='Avatar' 
						/>
						<AvatarFallback>
							<Skeleton className='h-10 w-10 rounded-sm' />
						</AvatarFallback>
					</Avatar>
					<div className='space-y-1'>
						<h2 className='text-lg font-semibold'>{user.username}</h2>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
};

export default ProfileComponent;