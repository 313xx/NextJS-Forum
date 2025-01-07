import { Navbar } from '@/components/navbar';
import SearchUserComponent from './components/searchusercomponent';
import { getMultipleUsers } from '@/app/action/admin/user/getMultipleUsers';

export default function UsersPage() {
	return (
		<div>
			<Navbar />

			<SearchUserComponent getUsers={getMultipleUsers} />
		</div>
	);
}