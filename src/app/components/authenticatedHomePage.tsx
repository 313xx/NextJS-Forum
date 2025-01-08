import React from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
	MessageSquare, 
	Users, 
	Flame, 
	Clock, 
	TrendingUp, 
	Bell,
	Bookmark,
	History,
	User
} from 'lucide-react';
import { getActiveCategories } from '@/app/actions/categories/getActiveCategories';
import Link from 'next/link';

interface Category {
	id: string;
	name: string;
	description: string | null;
	_count: {
		threads: number;
	};
}

interface StatBadgeProps {
	icon: React.ComponentType<{ className?: string }>;
	value: string | number;
	label: string;
}

interface UserActivity {
	id: string;
	title: string;
	category: string;
	timestamp: string;
}

const StatBadge: React.FC<StatBadgeProps> = ({ icon: Icon, value, label }) => (
	<div className='flex items-center gap-2 text-sm text-muted-foreground'>
		<Icon className='h-4 w-4 text-primary' />
		<span className='font-medium'>{value}</span>
		<span className='text-xs'>{label}</span>
	</div>
);

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
	<Card className='group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-accent/50 cursor-pointer border border-primary/10'>
		<CardHeader>
			<div className='flex justify-between items-start'>
				<CardTitle className='text-xl group-hover:text-primary transition-colors'>
					{category.name}
				</CardTitle>
			</div>
			<CardDescription className='line-clamp-2'>
				{category.description}
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div className='flex justify-between items-center'>
				<StatBadge icon={MessageSquare} value={category._count.threads} label={`${category._count.threads > 1 ? 'threads' : 'thread'}`} />
				<Button variant='ghost' size='sm' className='group-hover:bg-primary group-hover:text-primary-foreground'>
					View Category →
				</Button>
			</div>
		</CardContent>
	</Card>
);

const ActivityCard: React.FC<{ activity: UserActivity }> = ({ activity }) => (
	<Card className='border-primary/10'>
		<CardContent className='pt-6'>
			<div className='flex items-center gap-4'>
				<History className='h-4 w-4 text-primary' />
				<div className='flex-1'>
					<p className='font-medium text-sm'>{activity.title}</p>
					<p className='text-xs text-muted-foreground'>in {activity.category}</p>
				</div>
				<span className='text-xs text-muted-foreground'>{activity.timestamp}</span>
			</div>
		</CardContent>
	</Card>
);

export default async function AuthenticatedHomePage() {
	const categories = await getActiveCategories();
  
	const userStats = [
		{ label: 'Your Total Posts', value: 'placeholder', icon: MessageSquare },
		{ label: 'Bookmarks', value: 'placeholder', icon: Bookmark },
		{ label: 'Notifications', value: 'placeholder', icon: Bell },
		{ label: 'Reputation', value: 'placeholder', icon: TrendingUp },
	];

	const recentActivity = [
		{ id: '1', title: 'Replied to "Best practices for React"', category: 'Frontend Dev', timestamp: '2h ago' },
		{ id: '2', title: 'Bookmarked "Getting Started Guide"', category: 'Tutorials', timestamp: '5h ago' },
		{ id: '3', title: 'Created new post "Help with TypeScript"', category: 'TypeScript', timestamp: '1d ago' },
	];

	const communityStats = [
		{ label: 'Active Members', value: 'placeholder', icon: Users },
		{ label: 'Hot Topics', value: 'placeholder', icon: Flame },
		{ label: 'Posts Today', value: 'placeholder', icon: Clock },
		{ label: 'Growing Topics', value: 'placeholder', icon: TrendingUp },
	];

	return (
		<div className='min-h-screen bg-gradient-to-b from-background to-accent/10'>
			<Navbar />
			<main className='container mx-auto py-12 px-4 space-y-12'>
				<div className='text-center space-y-6'>
					<h1 className='text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent'>
						Welcome back, User!
					</h1>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
						Stay up to date with your favorite discussions
					</p>
					<div className='flex gap-4 justify-center'>
						<Button size='lg'>Create New Post</Button>
						<Button size='lg' variant='outline'>View Bookmarks</Button>
					</div>
				</div>

				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					{userStats.map((stat, i) => (
						<Card key={i} className='text-center p-6 border-primary/20 hover:border-primary/40 transition-colors'>
							<stat.icon className='h-8 w-8 mx-auto mb-3 text-primary' />
							<h3 className='text-2xl font-bold mb-1'>{stat.value}</h3>
							<p className='text-sm text-muted-foreground'>{stat.label}</p>
						</Card>
					))}
				</div>

				<div className='grid md:grid-cols-3 gap-8'>
					<div className='md:col-span-2 space-y-8'>
						{categories.length > 0 && (
							<div>
								<h2 className='text-2xl font-bold mb-4'>Popular Categories</h2>
								<div className='grid gap-6 md:grid-cols-2'>
									{categories.slice(0, 4).map((category) => (
										<CategoryCard key={category.id} category={category} />
									))}
								</div>
							</div>
						)}

						<div>
							<h2 className='text-2xl font-bold mb-4'>Community Stats</h2>
							<div className='grid grid-cols-2 gap-4'>
								{communityStats.map((stat, i) => (
									<Card key={i} className='text-center p-6 border-primary/20 hover:border-primary/40 transition-colors'>
										<stat.icon className='h-8 w-8 mx-auto mb-3 text-primary' />
										<h3 className='text-2xl font-bold mb-1'>{stat.value}</h3>
										<p className='text-sm text-muted-foreground'>{stat.label}</p>
									</Card>
								))}
							</div>
						</div>
					</div>

					<div className='space-y-8'>
						<div>
							<h2 className='text-2xl font-bold mb-4'>Your Recent Activity</h2>
							<div className='space-y-4'>
								{recentActivity.map((activity) => (
									<ActivityCard key={activity.id} activity={activity} />
								))}
							</div>
						</div>

						<Card className='p-6'>
							<h3 className='text-lg font-bold mb-4'>Quick Actions</h3>
							<div className='space-y-3'>
								<Link href='/profile' legacyBehavior passHref>
									<Button variant='outline' className='w-full justify-start'>
										<User className='mr-2 h-4 w-4' /> Profile Settings
									</Button>
								</Link>
								<Button variant='outline' className='w-full justify-start'>
									<Bell className='mr-2 h-4 w-4' /> Notification Settings
								</Button>
								<Button variant='outline' className='w-full justify-start'>
									<Bookmark className='mr-2 h-4 w-4' /> Saved Posts
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}