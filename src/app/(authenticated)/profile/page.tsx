import ProfileForm from './profile-form';
import { changeUsername } from '@/app/action/profile/changeUsername';

export default function SettingsProfilePage() {
	return (
		<div className='space-y-6'>
			<ProfileForm changeUsername={changeUsername} />
		</div>
	);
}
