'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
	DialogFooter,
	DialogClose
} from '@/components/ui/dialog';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const categoryFormSchema = z.object({
	name: z.string()
		.min(2, { message: 'Category name must be at least 2 characters.' })
		.max(20, { message: 'Category name must not exceed 20 characters.' }),
	description: z.string()
		.min(10, { message: 'Description must be at least 10 characters.' })
		.max(50, { message: 'Description must not exceed 50 characters.' }),
	isActive: z.boolean().default(false)
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface AdminCategoryFormProps {
	onCategorySubmit: (data: CategoryFormValues) => Promise<{ success: boolean; message: string }>;
	onCategoryUpdate?: (id: string, data: CategoryFormValues) => Promise<{ success: boolean; message: string }>;
	onCategoryDelete?: (id: string) => Promise<{ success: boolean; message: string }>;
	isLoading?: boolean;
	existingCategories?: Array<CategoryFormValues & { id: string }>;
}

const AdminCategoryForm: React.FC<AdminCategoryFormProps> = ({
	onCategorySubmit,
	onCategoryUpdate,
	onCategoryDelete,
	isLoading = false,
	existingCategories = []
}) => {
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen,] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen,] = useState(false);
	const [editingCategory, setEditingCategory,] = useState<(CategoryFormValues & { id: string }) | null>(null);

	const categoryForm = useForm<CategoryFormValues>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: '',
			description: '',
			isActive: true
		}
	});

	const handleCategorySubmit = async (data: CategoryFormValues) => {
		try {
			const result = editingCategory 
				? await onCategoryUpdate!(editingCategory.id, data)
				: await onCategorySubmit(data);
      
			if (result.success) {
				toast({
					title: editingCategory ? 'Category Updated' : 'Category Added',
					description: editingCategory 
						? 'Successfully updated category'
						: 'Successfully created new category'
				});
				categoryForm.reset();
				setIsDialogOpen(false);
				setEditingCategory(null);	
				router.refresh();
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: result.message
				});
			}
		} catch (result) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: `Failed to ${editingCategory ? 'update' : 'create'} category: "${(result as { message: string }).message}"`
			});
		}
	};

	const handleDeleteCategory = async () => {
		if (!editingCategory || !onCategoryDelete) return;

		try {
			const result = await onCategoryDelete(editingCategory.id);
			
			if (result.success) {
				toast({
					title: 'Category Deleted',
					description: 'Successfully deleted category'
				});

				setIsDialogOpen(false);
				setIsDeleteDialogOpen(false);
				setEditingCategory(null);
				categoryForm.reset();
				router.refresh();
			} else {
				toast({
					variant: 'destructive',
					title: 'Error',
					description: result.message
				});
			}
		} catch (result) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: `Failed to delete category: "${(result as { message: string }).message}"`
			});
		}
	};

	const handleEditCategory = (category: CategoryFormValues & { id: string }) => {
		setEditingCategory(category);
		categoryForm.reset(category);
		setIsDialogOpen(true);
	};

	if (isLoading) {
		return (
			<div className='space-y-8'>
				<div className='flex items-center justify-between'>
					<div>
						<Skeleton className='h-6 w-32 mb-2' />
						<Skeleton className='h-4 w-64' />
					</div>
					<Skeleton className='h-10 w-28' />
				</div>
	  
				<div className='space-y-4'>
					{[1, 2, 3,].map((item) => (
						<div 
							key={item}
							className='flex relative border rounded-lg overflow-hidden'
						>
							<div className='flex-1 flex items-center justify-between p-4 pl-6'>
								<div className='space-y-2'>
									<Skeleton className='h-5 w-32' /> 
									<Skeleton className='h-4 w-64' />
								</div>
								<div className='flex items-center gap-2'>
									<Skeleton className='h-8 w-16' />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			<Toaster />
      
			<div className='flex items-center justify-between'>
				<div>
					<h2 className='text-lg font-semibold'>Forum Categories</h2>
					<p className='text-sm text-muted-foreground'>
						Manage the forums categories and their settings
					</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={(open) => {
					setIsDialogOpen(open);
					if (!open) {
						setTimeout(() => {
							setEditingCategory(null);
							categoryForm.reset();
						}, 150);
					}
				}}>
					<DialogTrigger asChild>
						<Button 
							onClick={() => categoryForm.reset({
								name: '',
								description: '',
								isActive: false
							})}
						>
							Add Category
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<div className='absolute right-2 top-12 flex gap-2'>
								{editingCategory && (
									<Button
										type='button'
										variant='ghost'
										className='h-8 w-8 p-0 text-muted-foreground'
										onClick={() => setIsDeleteDialogOpen(true)}
									>
										<Trash2 className='h-4 w-4 stroke-red-500' />
									</Button>
								)}
							</div>
							<DialogTitle>
								{editingCategory ? 'Edit Category' : 'Create New Category'}
							</DialogTitle>
							<DialogDescription>
								{editingCategory 
									? 'Modify the category details below'
									: 'Add a new category to your forum'}
							</DialogDescription>
						</DialogHeader>

						<Form {...categoryForm}>
							<form onSubmit={categoryForm.handleSubmit(handleCategorySubmit)} className='space-y-4'>
								<FormField
									control={categoryForm.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input placeholder='Discussion' {...field} />
											</FormControl>
											<FormDescription>
												Display name for your category
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={categoryForm.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea 
													placeholder='General discussion about...' 
													className='resize-none'
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Brief description of the category (10-500 characters)
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={categoryForm.control}
									name='isActive'
									render={({ field }) => (
										<FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
											<div className='space-y-0.5'>
												<FormLabel className='text-base'>Active Status</FormLabel>
												<FormDescription>
													Make this category visible to users
												</FormDescription>
											</div>
											<FormControl>
												<Switch
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<DialogFooter>
									<DialogClose asChild>
										<Button type='button' variant='secondary'>
											Cancel
										</Button>
									</DialogClose>
									<Button type='submit'>
										{editingCategory ? 'Update Category' : 'Create Category'}
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the category
							&quot;{editingCategory?.name}&quot;.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteCategory}
							className='bg-red-500 hover:bg-red-600'
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<div className='space-y-4'>
				{existingCategories.map((category) => (
					<div
						key={category.id}
						className='flex relative border rounded-lg overflow-hidden'
					>
						<div 
							className={`absolute left-0 top-0 w-1 h-full ${
								category.isActive 
									? 'bg-green-500' 
									: 'bg-red-500'
							}`}
						/>
            
						<div className='flex-1 flex items-center justify-between p-4 pl-6'>
							<div className='space-y-1'>
								<h3 className='font-medium'>{category.name}</h3>
								<p className='text-sm text-muted-foreground'>{category.description}</p>
							</div>
							<div className='flex items-center gap-2'>
								<Button
									variant='outline'
									size='sm'
									onClick={() => handleEditCategory(category)}
								>
									Edit
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminCategoryForm;