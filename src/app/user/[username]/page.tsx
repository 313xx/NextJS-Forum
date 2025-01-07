import { Navbar } from '@/components/navbar';
import UserNotFoundComponent from './components/usernotfoundcomponent';
import ProfileComponent from './components/ProfileComponent';
import { deleteUser } from '@/app/action/admin/user/deleteUser';
import { getUser } from '@/app/action/admin/user/getUser';

export default async function SettingsProfilePage({ 
	params 
}: { 
	params: { username: string }
}) {
	const user = await getUser(params.username);

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