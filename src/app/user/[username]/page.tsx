import { Navbar } from '@/components/navbar';
import UserNotFoundComponent from './components/usernotfoundcomponent';
import ProfileComponent from './components/profilecomponent';
import { deleteUser } from '@/app/actions/admin/user/deleteUser';
import { getUser } from '@/app/actions/users/getUser';

export default async function SettingsProfilePage(
	props: { 
		params: Promise<{ username: string }>
	}
) {
	const params = await props.params;
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