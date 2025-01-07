'use client';
import React, { useState, KeyboardEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { getMultipleUsers } from '@/app/action/admin/user/getMultipleUsers';

type usersResponse = {
	username: string,
	role: string,
};

type SearchUserComponentProps = {
	getUsers: typeof getMultipleUsers;
}

export default function SearchUserComponent({ getUsers }: SearchUserComponentProps) {
	const [inputSearchTerm, setInputSearchTerm,] = useState('');
	const [searchTerm, setSearchTerm,] = useState('');
	const [currentPage, setCurrentPage,] = useState(1);
	const [usersPerPage, setUsersPerPage,] = useState(5);

	const {
		data,
		isLoading,
		isError
	} = useQuery({
		queryKey: ['users', currentPage, usersPerPage, searchTerm,],
		queryFn: () => getUsers({ 
			page: currentPage, 
			limit: usersPerPage, 
			search: searchTerm 
		}),
		staleTime: 1000 * 60 * 5,
		retry: 2,
		refetchOnWindowFocus: false
	});

	const handleSearch = () => {
		setSearchTerm(inputSearchTerm);
		setCurrentPage(1);
	};

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleNextPage = () => {
		if (data?.pagination.currentPage && data.pagination.currentPage < data.pagination.totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handlePageClick = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleUsersPerPageChange = (value: string) => {
		const newUsersPerPage = parseInt(value, 10);
		setUsersPerPage(newUsersPerPage);
		setCurrentPage(1);
	};

	const UserSkeleton = () => (
		<div className='flex items-center space-x-4 p-3 border rounded-lg'>
			<Skeleton className='h-10 w-10 rounded-sm' />
			<div className='flex-grow space-y-2'>
				<Skeleton className='h-4 w-[100px]' />
				<Skeleton className='h-3 w-[200px]' />
			</div>
		</div>
	);

	return (
		<div className='min-h-screen bg-background flex items-center justify-center'>
			<div className='container mx-auto px-4 py-8'>
				<Card className='w-full max-w-2xl mx-auto'>
					<CardHeader>
						<CardTitle className='flex items-center justify-between'>
							<span>User Search</span>

							<Select 
								value={usersPerPage.toString()} 
								onValueChange={handleUsersPerPageChange}
							>
								<SelectTrigger className='w-[180px]'>
									<SelectValue placeholder={`Show ${usersPerPage} users`} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='5'>Show 5 users</SelectItem>
									<SelectItem value='10'>Show 10 users</SelectItem>
									<SelectItem value='15'>Show 15 users</SelectItem>
								</SelectContent>
							</Select>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex space-x-2 mb-4'>
							<div className='flex-grow'>
								<Input
									placeholder={'Search by username'}
									value={inputSearchTerm}
									onChange={(e) => setInputSearchTerm(e.target.value)}
									onKeyDown={handleKeyPress}
									className='w-full'
									disabled={isLoading}
								/>
							</div>
							<Button 
								onClick={handleSearch} 
								disabled={isLoading}
								variant='outline'
							>
								<Search className='mr-2 h-4 w-4' /> Search
							</Button>
						</div>

						{isLoading ? (
							<div className='space-y-4'>
								{Array.from({ length: 3 }).map((_, index) => (
									<UserSkeleton key={index} />
								))}

								<div className='flex justify-center space-x-2 mt-4'>
									<Skeleton className='h-8 w-20' />
									{Array.from({ length: 2 }).map((_, index) => (
										<Skeleton key={index} className='h-8 w-8' />
									))}
									<Skeleton className='h-8 w-20' />
								</div>
							</div>
						) : isError ? (
							<div className='text-center text-destructive py-4'>
								Error loading users. Please try again.
							</div>
						) : data?.users.length === 0 ? (
							<div className='text-center text-muted-foreground py-4'>
								No users found
							</div>
						) : (
							<>
								<div className='space-y-4 mb-4'>
									{data?.users.map((user: usersResponse) => (
										<div
											key={user.username}
											className='flex items-center space-x-4 p-3 border rounded-lg hover:bg-accent transition-colors'
										>
											<Avatar>
												<AvatarImage
													src={`https://avatar.vercel.sh/${user.username}.svg?text=${Array.from(user.username)[0].toUpperCase()}`}
													alt='Avatar'
												/>
												<AvatarFallback>
													<Skeleton className='h-10 w-10 rounded-md' />
												</AvatarFallback>
											</Avatar>
											<div className='flex-grow space-y-1'>
												<div 
													onClick={() => (redirect(`/user/${user.username}`))}
													className='text-muted-foreground text-md hover:opacity-80 transition-opacity'
												>
													<a href={`/user/${user.username}`}>
														@{user.username}
													</a>
												</div>
												<div className='text-muted-foreground text-xs'>
													Bio
												</div>
											</div>
											<div className='w-full text-center md:text-right'>
												<Badge variant={'outline'} className='text-base sm:text-xs md:text-sm font-semibold truncate'>
													{user.role}
												</Badge>
											</div>
										</div>
									))}
								</div>

								<Pagination>
									<PaginationContent>
										<PaginationItem>
											<PaginationPrevious
												className='cursor-pointer'
												onClick={(e) => {
													e.preventDefault();
													handlePreviousPage();
												}}
												isActive={currentPage > 1}
											/>
										</PaginationItem>

										{Array.from({ length: data?.pagination.totalPages || 0 }).map((_, index) => (
											<PaginationItem key={index}>
												<PaginationLink
													className='cursor-pointer'
													onClick={(e) => {
														e.preventDefault();
														handlePageClick(index + 1);
													}}
													isActive={data?.pagination.currentPage === index + 1}
												>
													{index + 1}
												</PaginationLink>
											</PaginationItem>
										))}

										<PaginationItem>
											<PaginationNext
												className='cursor-pointer'
												onClick={(e) => {
													e.preventDefault();
													handleNextPage();
												}}
												isActive={!!(data?.pagination.currentPage && data.pagination.currentPage < data.pagination.totalPages)}
											/>
										</PaginationItem>
									</PaginationContent>
								</Pagination>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}