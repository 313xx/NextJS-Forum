import { Navbar } from '@/components/navbar';
import { User } from '@/types/types';
import UserNotFoundComponent from './components/usernotfoundcomponent';
import ProfileComponent from './components/ProfileComponent';
import { deleteUser } from '@/app/action/admin/deleteUser';

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
			<UserNotFoundComponent/>
		);
	}
	
	return (
		<div>
			<Navbar />
			<ProfileComponent user={user} deleteUser={deleteUser} />
		</div>
	);
}