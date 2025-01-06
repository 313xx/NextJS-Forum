'use client';
import React, { useState } from 'react';
import { login } from '../actions/login';
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

const loginSchema = z.object({
	username: z.string().min(1, 'Username is required'),
	password: z.string().min(1, 'Password is required')
});

export function LoginForm() {
	const { authenticatedUser } = useAuth();
	
	const [error, setError,] = useState<string | null>(null);
    
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: ''
		}
	});

	const handleLogin = async (data: z.infer<typeof loginSchema>) => {
		setError(null);
		try {
			const formData = new FormData();
			formData.append('username', data.username);
			formData.append('password', data.password);
			await login(formData);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unexpected error occurred');
		}
	};

	if (authenticatedUser)
		redirect('/');

	return (
		<Card>
			{error && (
				<div
					className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
					role='alert'
				>
					<span className='block sm:inline'>{error}</span>
				</div>
			)}
			<CardHeader>
				<CardTitle className='text-2xl'>Login</CardTitle>
				<CardDescription>
					Enter your username below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleLogin)} className='grid gap-4'>
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
											required 
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full'>
							Login
						</Button>
					</form>
				</Form>
				<div className='mt-4 text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/register' className='underline underline-offset-4'>
						Register
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}