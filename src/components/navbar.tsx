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
import { getActiveCategories } from '@/app/actions/categories/getActiveCategories';
  
const profileControl = [
	{ title: 'Settings', href: '/profile' },
];

const dialogStyling = 'w-72 h-9 justify-start rounded-lg font-medium tracking-wide dark:bg-[#17171a] dark:text-gray-300 transition-colors hover:dark:bg-[#1c1c20]';

export async function Navbar() {
	const { user } = await getAuth();
	const categories = await getActiveCategories();
	
	return (
		<nav className='sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200 dark:bg-black/90 dark:border-gray-800/80 transition-colors duration-200'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<NavigationMenu className='flex-grow'>
						<NavigationMenuList className='flex items-center gap-6'>
							<NavigationMenuItem>
								<Link href='/' legacyBehavior passHref>
									<NavigationMenuLink className='text-xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition-all duration-200'>
										Forum Name
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>

							<div className='flex items-center gap-6'>
								<NavigationMenuItem>
									<NavigationMenuTrigger className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium'>
										Categories
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className='grid w-[320px] gap-3 p-4 md:w-[420px] bg-white dark:bg-black border dark:border-gray-800 shadow-lg rounded-lg mt-1'>
											{categories.length > 0 && categories.map((category) => (
												<ListItem
													key={category.name}
													title={category.name}
													href={`/categories/${category.name.toLowerCase()}`}
													className='hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors duration-200'
												>
													{category.description}
												</ListItem>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>

								{user && (
									<NavigationMenuItem>
										<Link href='/users' legacyBehavior passHref>
											<NavigationMenuLink className='text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium'>
												Users
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								)}
							</div>
						</NavigationMenuList>
					</NavigationMenu>

					{user ? (
						<div className='flex items-center gap-4'>
							<Dialog>
								<DialogTrigger asChild>
									<Button className={dialogStyling} variant={'outline'}>Search...</Button>
								</DialogTrigger>	
								<DialogContent>
									<Command>
										<CommandInput placeholder='Search...' />
										<CommandList>
											<CommandEmpty>No results found.</CommandEmpty>
											<CommandGroup heading='Suggestions'>
												<CommandItem>
													<Link href='/users' legacyBehavior passHref>
														<a className='w-full'>
															Search users
														</a>
													</Link>
												</CommandItem>
												<CommandItem>
													<Link href='/categories' legacyBehavior passHref>
														<a className='w-full'>
															Categories
														</a>
													</Link>
												</CommandItem>
											</CommandGroup>
											<CommandSeparator />
											<CommandGroup heading='Settings'>
												<CommandItem>			
													<Link href='/profile' legacyBehavior passHref>
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
									<Avatar className='h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-800 transition-all duration-200'>
										<AvatarImage 
											src={`https://avatar.vercel.sh/${user.username}.svg?text=${Array.from(user.username)[0].toUpperCase()}`} 
											alt='Avatar'
											className='object-cover'
										/>
										<AvatarFallback>
											<Skeleton className='h-9 w-9 rounded-full' />
										</AvatarFallback>
									</Avatar>
								</PopoverTrigger>
								<PopoverContent className='w-36 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg mt-4'>
									<div className='py-1 text-center'>
										<Link 
											href={`/user/${user.username}`}
											className='block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900'
										>
											Profile
										</Link>
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
											<Button
												type='submit'
												variant={'ghost'}
												className='w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-900'
											>
												Logout
											</Button>
										</form>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					) : (
						<div className='flex items-center gap-4'>

							<div className='flex items-center gap-3'>
								<Link
									href='/login'
									className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200'
								>
									Log in
								</Link>
								<Link
									href='/register'
									className='px-4 py-2 text-sm font-medium text-white dark:text-black bg-black dark:bg-white rounded-lg hover:opacity-90 transition-all duration-200'
								>
									Sign up
								</Link>
							</div>
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
						'block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors duration-200',
						className
					)}
					{...props}
				>
					<div className='text-sm font-medium leading-none text-gray-900 dark:text-white'>{title}</div>
					<p className='line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400 mt-1'>
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});

ListItem.displayName = 'ListItem';