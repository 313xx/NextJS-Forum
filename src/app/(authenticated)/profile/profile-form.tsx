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

const profileFormSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: 'Username must be at least 2 characters.'
		})
		.max(15, {
			message: 'Username must not be longer than 15 characters.'
		}),
	bio: z.string().max(160)
});

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
	bio: ''
};

export function ProfileForm() {
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
		mode: 'onChange'
	});

	const onSubmit = () => {

	};

	return (
		<Form {...form}>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
			<form onSubmit={form.handleSubmit(onSubmit)} autoComplete='off' className='space-y-8'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder='username' autoComplete='new-username' {...field} />
							</FormControl>
							<FormDescription>
								This is your public display name. You can only change this once every 30 days.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Update profile</Button>
			</form>
		</Form>
	);
}
