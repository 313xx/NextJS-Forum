'use client';
import React, { useState } from 'react';
import { register } from '../actions/register';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';

const registerSchema = z.object({
	username: z.string()
		.min(4, 'Username must be at least 4 characters.')
		.max(15, 'Username must not be longer than 15 characters.')
		.regex(/^\S*$/, 'Username cannot contain spaces.'),
	password: z.string()
		.min(6, 'Password must be at least 6 characters')
		.regex(/^\S*$/, 'Password cannot contain spaces.'),
	confirmPassword: z.string()
})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword',]
	});
  
export function RegisterForm() {
	const { user } = useAuth();
	const [error, setError,] = useState<string | null>(null);
   
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: '',
			password: '',
			confirmPassword: ''
		}
	});

	const handleRegister = async (data: z.infer<typeof registerSchema>) => {
		setError(null);
		try {
			const formData = new FormData();
			formData.append('username', data.username);
			formData.append('password', data.password);
			await register(formData);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unexpected error occurred');
		}
	};

	if (user?.username) 
		redirect('/');

	return (
		<Card className='mx-auto max-w-sm'>
			{error && (
				<div
					className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
					role='alert'
				>
					<span className='block sm:inline'>{error}</span>
				</div>
			)}
			<CardHeader>
				<CardTitle className='text-2xl'>Sign Up</CardTitle>
				<CardDescription>
					Create a new account by entering your details below
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					{/* eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
					<form onSubmit={form.handleSubmit(handleRegister)} className='grid gap-4'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='text'
											placeholder='Enter your username'
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='password'
											placeholder='Enter your password'
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='password'
											placeholder='Confirm your password'
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full'>
							Sign Up
						</Button>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Link href='/login' className='underline underline-offset-4'>
						Login
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}