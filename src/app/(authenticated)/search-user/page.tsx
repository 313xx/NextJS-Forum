import { Navbar } from '@/components/navbar';
import SearchUserComponent from './components/search-user';

export default function SettingsProfilePage() {
	return (
		<div>
			<Navbar/>

			<SearchUserComponent />
		</div>
	);
}