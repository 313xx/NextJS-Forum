import { Separator } from '@/components/ui/separator';
import ProfileForm from './profile-form';
import { changeUsername } from '@/app/actions/profile/changeUsername';

export default function SettingsProfilePage() {
	return (
		<div className='space-y-6'>
			<div className='space-y-0.5'>
				<h2 className='text-lg font-semibold'>Profile Overview</h2>
				<p className='text-sm text-muted-foreground'>
					Customize how you appear on the forum.
				</p>
			</div>
			<Separator />
			<ProfileForm changeUsername={changeUsername} />
		</div>
	);
}
