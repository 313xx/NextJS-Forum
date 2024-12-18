'use client';

import React, { useState } from 'react';
import { User } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
	DropdownMenu, 
	DropdownMenuContent, 
	DropdownMenuItem, 
	DropdownMenuLabel, 
	DropdownMenuSeparator, 
	DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
	AlertDialog, 
	AlertDialogAction, 
	AlertDialogCancel, 
	AlertDialogContent, 
	AlertDialogDescription, 
	AlertDialogFooter, 
	AlertDialogHeader, 
	AlertDialogTitle, 
	AlertDialogTrigger 
} from '@/components/ui/alert-dialog';

import { MoreVertical, Trash2, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';

interface ProfileComponentProps {
	user: User,
	deleteUser: (username: string) => void
}

type DeleteUserResponse = {
	success: boolean;
	message: string;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ user, deleteUser }) => {
	const { authenticatedUser, isLoading } = useAuth();
	const [alertIsOpened, setAlertIsOpened,] = useState(false);
	const router = useRouter();

	const handleDeleteUser = async () => {
		const result = await deleteUser(user.username) as unknown as DeleteUserResponse;
		if (result.success) {
			toast({
				title: 'Successfully removed',
				description: 'User has been removed'
			});

			router.push('/');
		} else {
			toast({
				title: 'Something went wrong!',
				description: `${result.message}`
			});
		}
	};

	if (isLoading) {
		return (
			<Card className='w-full max-w-md mx-auto mt-8 sm:mt-16 md:mt-32 p-4 sm:p-6 select-none'>
				<Skeleton className='h-full w-full' />
			</Card>
		);
	}

	return (
		<div>
			<Toaster/>
			<Card className='w-full max-w-md mx-auto mt-8 sm:mt-16 md:mt-32 p-4 sm:p-6'>
				<CardHeader>
					<div className='flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 relative'>
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

						{authenticatedUser?.role === 'ADMIN' && authenticatedUser.username !== user.username && (
							<AlertDialog onOpenChange={(open) => setAlertIsOpened(open)}>
								{!alertIsOpened && (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant='ghost' size='icon'>
												<MoreVertical className='h-4 w-4' />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
											<DropdownMenuSeparator />

											<DropdownMenuItem>
												<Shield className='mr-2 h-4 w-4' /> Change Role
											</DropdownMenuItem>

											<AlertDialogTrigger asChild>
												<DropdownMenuItem className='text-destructive focus:text-destructive'>
													<Trash2 className='mr-2 h-4 w-4' /> Delete User
												</DropdownMenuItem>
											</AlertDialogTrigger>
										</DropdownMenuContent>
									</DropdownMenu>
								)}

								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete the user account.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											className='bg-destructive'
											onClick={(e) => {
												e.preventDefault();
												void handleDeleteUser();
											}}
										>
											Delete User
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</div>
				</CardHeader>
				<Separator className='my-4' />
				<CardContent>
					<p className='text-sm sm:text-md text-muted-foreground'>
						1 Post
					</p>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProfileComponent;