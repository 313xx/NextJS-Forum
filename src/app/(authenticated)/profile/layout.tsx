import { Metadata } from 'next';
import { SidebarNav } from './components/sidebar-nav';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/navbar';
import { getAuth } from '@/auth/cookie';

export const metadata: Metadata = {
	title: 'Profile Settings',
	description: 'Edit your profile.'
};

const allSidebarNavItems = [
	{
		title: 'Profile',
		href: '/profile'
	},
	{
		title: 'Appearance',
		href: '/profile/appearance'
	},
	{
		title: 'Admin',
		href: '/profile/admin'
	},
];

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
	const { user } = await getAuth();

	const sidebarNavItems = allSidebarNavItems.filter(
		(item) => item.title !== 'Admin' || user?.role === 'ADMIN'
	);

	return (
		<>
			<Navbar/>
			<div className='block space-y-6 p-10 pb-16'>
				<div className='space-y-0.5'>
					<h2 className='text-2xl font-bold tracking-tight'>Profile</h2>
					<p className='text-muted-foreground'>
						Manage your account
					</p>
				</div>
				<Separator className='my-6' />
				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/5'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex-1 lg:max-w-2xl'>{children}</div>
				</div>
			</div>
		</>
	);
}
