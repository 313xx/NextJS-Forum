import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';

const UserNotFoundComponent = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<Navbar/>
			<div className='flex flex-1 items-center justify-center px-4'>
				<Card className='w-full max-w-md mx-auto'>
					<CardHeader>
						<CardTitle className='text-center text-2xl font-semibold'>
							User Not Found!
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-center'>
							<p className='text-muted-foreground'>
								We couldn’t find the user you’re looking for. Please check the username and try again.
							</p>
							<Link href='/'>
								<Button variant='outline' className='mt-6 text-sm'>Go Back Home</Button>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default UserNotFoundComponent;