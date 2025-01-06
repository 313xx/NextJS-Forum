'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { 
	Dialog, 
	DialogContent, 
	DialogHeader, 
	DialogTitle, 
	DialogTrigger, 
	DialogDescription,
	DialogFooter,
	DialogClose
} from '@/components/ui/dialog';
import { useState } from 'react';
import { ServerActionResponse } from '@/types/types';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const usernameFormSchema = z.object({
	username: z
		.string()
		.min(4, {
			message: 'Username must be at least 4 characters.'
		})
		.max(15, {
			message: 'Username must not be longer than 15 characters.'
		})
});

const bioFormSchema = z.object({
	bio: z.string().max(160)
});

type UsernameFormValues = z.infer<typeof usernameFormSchema>;
type BioFormValues = z.infer<typeof bioFormSchema>;

interface ProfileFormComponentProps {
	changeUsername: (oldUsername: string, newUsername: string) => void
}	

const ProfileForm: React.FC<ProfileFormComponentProps> = ({ changeUsername }) => {
	const { authenticatedUser, isLoading } = useAuth();
	const [isDialogOpen, setIsDialogOpen,] = useState(false);

	const usernameForm = useForm<UsernameFormValues>({
		resolver: zodResolver(usernameFormSchema),
		defaultValues: {
			username: ''
		},
		mode: 'onChange'
	});

	const bioForm = useForm<BioFormValues>({
		resolver: zodResolver(bioFormSchema),
		defaultValues: {
			bio: authenticatedUser && 'bio' in authenticatedUser ? authenticatedUser.bio as string : ''
		},
		mode: 'onChange'
	});

	const onUsernameSubmit = async (data: UsernameFormValues) => {
		const result = await changeUsername(authenticatedUser!.username, data.username) as unknown as ServerActionResponse;
		if (result.success) {
			toast({
				title: 'Successfully updated username',
				description: 'Your username has been updated'
			});

			location.reload();
		} else {
			toast({
				title: 'Something went wrong!',
				description: `${result.message}`
			});
		}
		setIsDialogOpen(false);
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onBioSubmit = (data: BioFormValues) => {

	};

	if (isLoading) {
		return (
			<>
				<div>Loading...</div>
				<Skeleton className='h-4 w-[250px]' />
				<Skeleton className='h-4 w-[200px]' />
			</>
		);
	}

	return (
		<div className='space-y-8'>
			<Toaster/>
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-lg font-semibold'>Username</h2>
					<p className='text-sm text-muted-foreground'>
						{authenticatedUser?.username}
					</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button variant='outline'>Change Username</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>Change Username</DialogTitle>
							<DialogDescription>
								You can only change your username once every 30 days.
							</DialogDescription>
						</DialogHeader>
                        
						<Form {...usernameForm}>
							<form 
								onSubmit={usernameForm.handleSubmit(onUsernameSubmit)} 
								className='space-y-4'
							>
								<FormField
									control={usernameForm.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel>New Username</FormLabel>
											<FormControl>
												<Input 
													placeholder='Enter new username' 
													{...field} 
												/>
											</FormControl>
											<FormDescription className='ml-2'>
												4-15 characters long
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
                                
								<DialogFooter>
									<DialogClose asChild>
										<Button type='button' variant='secondary'>
											Cancel
										</Button>
									</DialogClose>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			<div>
				<Form {...bioForm}>
					<form 
						onSubmit={bioForm.handleSubmit(onBioSubmit)} 
						className='space-y-4'
					>
						<FormField
							control={bioForm.control}
							name='bio'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Tell us a little bit about yourself'
											className='resize-none'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Write a short description about yourself (max 160 characters)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
                        
						<Button type='submit'>Update Bio</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default ProfileForm;