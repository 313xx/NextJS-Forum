import { Separator } from '@/components/ui/separator';
import { AppearanceForm } from './appearance-form';

export default function SettingsAppearancePage() {
	return (
		<div className='space-y-6'>
			<div className='space-y-0.5'>
				<h3 className='text-lg font-semibold'>Appearance</h3>
				<p className='text-sm text-muted-foreground'>
					Customize the appearance of the forum.
				</p>
			</div>
			<Separator />
			<AppearanceForm />
		</div>
	);
}
