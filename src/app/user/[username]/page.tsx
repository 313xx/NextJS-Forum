import { Navbar } from '@/components/navbar';
import { User } from '@/types/types';
import ProfileComponent from './components/profilecomponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function fetchUser(username: string): Promise<User | null> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/get-user/${username}`, {
		cache: 'no-store'
	});

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error('Failed to fetch user');
	}

	return await res.json() as User;
}

export default async function SettingsProfilePage({ 
	params 
}: { 
	params: { username: string }
}) {
	const user = await fetchUser(params.username);

	if (!user) {
		return (
			<div className='min-h-screen flex flex-col'>
				<Navbar />
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
	}
	
	

	return (
		<div>
			<Navbar />
			<ProfileComponent user={user} />
		</div>
	);
}
