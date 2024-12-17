import { Navbar } from '@/components/navbar';
import { User } from '@/types/types';
import ProfileComponent from './components/profilecomponent';

async function fetchUser(username: string): Promise<User> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/get-user/${username}`, {
		cache: 'no-store'
	});

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

	return (
		<div>
			<Navbar/>

			<ProfileComponent user={user}/>
		</div>
	);
}