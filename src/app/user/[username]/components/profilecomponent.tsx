'use client';

import React, { useState } from 'react';
import { ServerActionResponse, User } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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

import { MoreVertical, Trash2, Shield, MessageCircle, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import ProfileSkeleton from './profileSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileComponentProps {
	user: User,
	deleteUser: (username: string) => void
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ user, deleteUser }) => {
	const { authenticatedUser, isLoading } = useAuth();
	const [alertIsOpened, setAlertIsOpened,] = useState(false);
	const router = useRouter();

	const handleDeleteUser = () => {
		const result = deleteUser(user.username) as unknown as ServerActionResponse;
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

	if (isLoading) return <ProfileSkeleton/>;

	return (
		<div className='min-h-screen bg-gradient-to-b from-background to-muted/20 py-8'>
			<Toaster/>
			<Card className='w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300'>
				<CardHeader className='pb-6'>
					<div className='flex flex-col sm:flex-row items-start gap-6 relative'>
						<div className='flex flex-col items-center sm:items-start gap-3 w-full sm:w-auto'>
							<Avatar className='h-24 w-24 rounded-lg ring-2 ring-primary/10'>
								<AvatarImage
									src={`https://avatar.vercel.sh/${user.username}.svg?text=${Array.from(user.username)[0].toUpperCase()}`}
									alt={user.username}
									className='object-cover'
								/>
								<AvatarFallback><Skeleton/></AvatarFallback>
							</Avatar>
                            
							<Badge
								className='px-3 py-1 text-sm font-medium capitalize self-center'
								variant={user.role === 'ADMIN' ? 'default' : 'secondary'}
							>
								{user.role.toLowerCase()}
							</Badge>
						</div>

						<div className='flex-1'>
							<div className='flex items-start justify-between'>
								<div className='flex-1'>
									<h2 className='text-3xl font-bold tracking-tight'>{user.username}</h2>
									<p className='text-muted-foreground text-sm'>
										Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
											year: 'numeric', 
											month: 'long', 
											day: 'numeric'
										})}
									</p>
									{user.userInfo?.bio && (
										<p className='text-muted-foreground mt-2'>
											{user.userInfo.bio}
										</p>
									)}
								</div>

								<div className='flex flex-col gap-2 ml-4'>
									<Card className='w-36'>
										<CardContent className='p-4'>
											<div className='space-y-1'>
												<p className='text-md font-medium text-muted-foreground'>Reputation</p>
												<p className={`text-xl font-bold ${user.userInfo?.reputation ?? 0 >= 0 ? 'text-green-400' : 'text-red-400'}`}>{user.userInfo?.reputation ?? 0}</p>
											</div>
										</CardContent>
									</Card>
									<Card className='w-36'>
										<CardContent className='p-4'>
											<div className='space-y-1'>
												<p className='text-md font-medium text-muted-foreground'>Rep Power</p>
												<p className='text-xl font-bold'>{user.userInfo?.reputationPower}</p>
											</div>
										</CardContent>
									</Card>
								</div>

								{authenticatedUser?.role === 'ADMIN' && authenticatedUser.username !== user.username && (
									<AlertDialog onOpenChange={setAlertIsOpened}>
										{!alertIsOpened && (
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant='ghost' size='icon' className='hover:bg-muted ml-2'>
														<MoreVertical className='h-4 w-4' />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align='end' className='w-48'>
													<DropdownMenuLabel>Admin Actions</DropdownMenuLabel>
													<DropdownMenuSeparator />
													<DropdownMenuItem className='cursor-pointer'>
														<Shield className='mr-2 h-4 w-4' /> Change Role
													</DropdownMenuItem>
													<AlertDialogTrigger asChild>
														<DropdownMenuItem className='text-destructive focus:text-destructive cursor-pointer'>
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
													className='bg-destructive hover:bg-destructive/90'
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
						</div>
					</div>
				</CardHeader>
        
				<Separator />
        
				<CardContent className='pt-6'>
					<div className='grid grid-cols-2 gap-4'>
						<div className='flex items-center gap-2 p-4 rounded-lg bg-muted/50'>
							<FileText className='h-5 w-5 text-muted-foreground' />
							<div>
								<p className='text-sm font-medium'>Threads</p>
								<p className='text-2xl font-bold'>{user._count.threads}</p>
							</div>
						</div>
						<div className='flex items-center gap-2 p-4 rounded-lg bg-muted/50'>
							<MessageCircle className='h-5 w-5 text-muted-foreground' />
							<div>
								<p className='text-sm font-medium'>Comments</p>
								<p className='text-2xl font-bold'>{user._count.comments}</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProfileComponent;