import React from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, Flame, Clock, TrendingUp } from 'lucide-react';
import { getActiveCategories } from '../actions/categories/getActiveCategories';
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

export default async function HomePage() {
	const categories = await getActiveCategories();
  
	const stats = [
		{ label: 'Members', value: 'placeholder', icon: Users },
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
						Welcome to Our Community
					</h1>
					<p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
						Join our members in discussions about your favorite topics
					</p>
					<div className='flex gap-4 justify-center'>
						<Link href='/register' passHref>
							<Button size='lg'>Join the Discussion</Button>
						</Link>
					</div>
				</div>

				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					{stats.map((stat, i) => (
						<Card key={i} className='text-center p-6 border-primary/20 hover:border-primary/40 transition-colors'>
							<stat.icon className='h-8 w-8 mx-auto mb-3 text-primary' />
							<h3 className='text-2xl font-bold mb-1'>{stat.value}</h3>
							<p className='text-sm text-muted-foreground'>{stat.label}</p>
						</Card>
					))}
				</div>

				<div className='space-y-8'>
					{categories.length > 0 && (
						<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
							{categories.slice(0, 3).map((category) => (
								<CategoryCard key={category.id} category={category} />
							))}
						</div>
					)}
					<div className='flex justify-center'>
						<Link href='/categories' passHref>
							<Button size='lg' variant={'ghost'}>View all categories</Button>
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}