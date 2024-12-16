import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger
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

import { Skeleton } from '@/components/ui/skeleton';
import { logout } from '@/auth/actions/logout';
import { getAuth } from '@/auth/cookie';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command';
import { Button } from './ui/button';
  
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
	{ title: 'Settings', href: '/profile' },
];

const dialogStyling = 'w-56 h-8 justify-start rounded-md dark:bg-[#17171a] dark:text-gray-400';

export async function Navbar() {
	const { user } = await getAuth();

	return (
		<nav className='sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-black/80 dark:border-gray-800'>
			<div className='max-w-8xl mx-auto'>
				<div className='flex items-center justify-between h-14'>
					<NavigationMenu className='flex-grow'>
						<NavigationMenuList className='flex items-center'>
							<NavigationMenuItem>
								<Link href='/' legacyBehavior passHref>
									<NavigationMenuLink className='text-lg font-bold text-gray-900 dark:text-white hover:opacity-80 transition-opacity'>
										Forum Name
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<div className='flex items-center'>
								<NavigationMenuItem>
									<NavigationMenuTrigger className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors ml-4'>
										Forums
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className='grid w-[300px] gap-3 p-4 md:w-[400px] bg-white dark:bg-black shadow-lg rounded-lg'>
											{forums.map((forum) => (
												<ListItem 
													key={forum.title} 
													title={forum.title} 
													href={forum.href}
													className='hover:bg-gray-100 dark:hover:bg-gray-900'
												>
													Visit the {forum.title} forum.
												</ListItem>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuTrigger className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors'>
										Categories
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className='grid w-[300px] gap-3 p-4 md:w-[400px] bg-white dark:bg-black shadow-lg rounded-lg'>
											{categories.map((category) => (
												<ListItem
													key={category.title}
													title={category.title}
													href={category.href}
													className='hover:bg-gray-100 dark:hover:bg-gray-900'
												>
													Explore {category.title} topics.
												</ListItem>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<Link href='/about' legacyBehavior passHref>
										<NavigationMenuLink className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-sm ml-4'>
											About
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<Link href='/contact' legacyBehavior passHref>
										<NavigationMenuLink className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors text-sm ml-8'>
											Contact
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</div>
						</NavigationMenuList>
					</NavigationMenu>

					{user ? (
						<div className='flex items-center space-x-2'>
							<Dialog>
								<DialogTrigger>
									<Button className={dialogStyling} variant={'outline'}>Search...</Button>
								</DialogTrigger>	
								<DialogTitle ></DialogTitle>
								<DialogDescription></DialogDescription>
								<DialogContent>
									<Command>
										<CommandInput placeholder='Search...' />
										<CommandList>
											<CommandEmpty>No results found.</CommandEmpty>
											<CommandGroup heading='Suggestions'>
												<CommandItem>
													<Link href='/search-user' legacyBehavior passHref>
														<a className='w-full'>
															Search users
														</a>
													</Link>
												</CommandItem>
												<CommandItem>
													<Link href='forums' legacyBehavior passHref>
														<a className='w-full'>
															Forums
														</a>
													</Link>
												</CommandItem>
												<CommandItem>
													<Link href='categories' legacyBehavior passHref>
														<a className='w-full'>
															Categories
														</a>
													</Link>
												</CommandItem>
											</CommandGroup>
											<CommandSeparator />
											<CommandGroup heading='Settings'>
												<CommandItem>			
													<Link href='profile' legacyBehavior passHref>
														<a className='w-full'>
															Profile
														</a>
													</Link>
												</CommandItem>
											</CommandGroup>
										</CommandList>
									</Command>
								</DialogContent>
							</Dialog>

							<Popover>
								<PopoverTrigger>
									<Avatar className='cursor-pointer'>
										<AvatarImage 
											src={`https://avatar.vercel.sh/${user.username}.svg?text=${Array.from(user.username)[0].toUpperCase()}`} 
											alt='Avatar' 
											className='hover:opacity-80 transition-opacity'
										/>
										<AvatarFallback>
											<Skeleton className='h-10 w-10 rounded-sm' />
										</AvatarFallback>
									</Avatar>
								</PopoverTrigger>
								<PopoverContent className='w-36 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg mt-4'>
									<div className='py-1 text-center'>
										{profileControl.map((profile) => (
											<Link 
												key={profile.title} 
												href={profile.href}
												className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
											>
												{profile.title}
											</Link>
										))}
										<form action={logout}>
											<button
												type='submit'
												className='w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-900'
											>
												Logout
											</button>
										</form>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					) : (
						<div className='flex items-center space-x-4'>
							<Dialog>
								<DialogTrigger>
									<Button className={dialogStyling} variant={'outline'}>Search</Button>
								</DialogTrigger>
								<DialogTitle ></DialogTitle>
								<DialogDescription></DialogDescription>
								<DialogContent>
									<Command>
										<CommandInput placeholder='Search...' />
										<CommandList>
											<CommandEmpty>No results found.</CommandEmpty>
											<CommandGroup heading='Suggestions'>
												<CommandItem>
													<Link href='forums' legacyBehavior passHref>
														<a className='w-full'>
															Forums
														</a>
													</Link>
												</CommandItem>
												<CommandItem>
													<Link href='categories' legacyBehavior passHref>
														<a className='w-full'>
															Categories
														</a>
													</Link>
												</CommandItem>
											</CommandGroup>
										</CommandList>
									</Command>
								</DialogContent>
							</Dialog>

							<Link href='login' legacyBehavior passHref>
								<a className={'bg-white text-black dark:bg-black dark:text-white border-2 px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity text-md'}>
									Log in
								</a>
							</Link>
							<Link href='register' legacyBehavior passHref>
								<a className={'bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity text-md'}>
									Sign up
								</a>
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
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
						'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none text-gray-900 dark:text-white'>{title}</div>
					<p className='line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});

ListItem.displayName = 'ListItem';