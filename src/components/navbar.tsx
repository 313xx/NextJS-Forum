'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/components/ui/avatar';

import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover';

const categories = [
	{ title: 'General Discussion', href: '/categories/general' },
	{ title: 'Help & Support', href: '/categories/help' },
	{ title: 'Feedback', href: '/categories/feedback' },
];

const forums = [
	{ title: 'Something', href: '/forums/something' },
	{ title: 'Off-Topic', href: '/forums/off-topic' },
];

const profileControl = [
	{ title: 'Settings', href: '/profile/settings' },
	{ title: 'Log Out', href: '/auth/logout' },
];

export function Navbar() {
	return (
		<div className='dark text-white bg-black'>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link href='/' legacyBehavior passHref>
							<NavigationMenuLink className={'ml-4 text-lg whitespace-nowrap'}>
								Forum Name
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuList className='ml-4'>
						<NavigationMenuItem>
							<NavigationMenuTrigger>Forums</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[300px] gap-3 p-4 md:w-[400px]'>
									{forums.map((forum) => (
										<ListItem key={forum.title} title={forum.title} href={forum.href}>
											Visit the {forum.title} forum.
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<NavigationMenuTrigger>Categories</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className='grid w-[300px] gap-3 p-4 md:w-[400px]'>
									{categories.map((category) => (
										<ListItem
											key={category.title}
											title={category.title}
											href={category.href}
										>
											Explore {category.title} topics.
										</ListItem>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href='/about' legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									About
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>

						<NavigationMenuItem>
							<Link href='/contact' legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Contact
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenuList>

				<NavigationMenuItem className='w-screen flex justify-end'>
					<NavigationMenuLink>
						<Avatar className='mr-12'>
							<Popover>
								<PopoverTrigger>
									<AvatarImage src='https://avatar.vercel.sh/jamal.svg?text=J' alt='@shadcn' />
									<AvatarFallback>Avatar</AvatarFallback>
								</PopoverTrigger>
								<PopoverContent className='bg-[#09090b] border-[1.3px] border-[#27272a] mt-2 w-32'>
									<ul className='grid w-[150px] gap-3 p-4 md:w-[100px] -mt-4'>
										{profileControl.map((profile) => (
											<ListItem
												key={profile.title}
												title={profile.title}
												href={profile.href}
												className='text-white hover:text-white hover:bg-[#27272a]'
											>
											</ListItem>
										))}
									</ul>
								</PopoverContent>
							</Popover>
						</Avatar>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenu>
		</div>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<'a'>,
	React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none'>{title}</div>
					<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});

ListItem.displayName = 'ListItem';