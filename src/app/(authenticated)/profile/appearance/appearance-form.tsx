'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Toaster } from '@/components/ui/toaster';

const appearanceFormSchema = z.object({
	theme: z.enum(['light', 'dark',], {
		required_error: 'Please select a theme.'
	})
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm() {
	const defaultTheme: AppearanceFormValues['theme'] = 
	typeof window !== 'undefined' 
		? (localStorage.getItem('theme') as AppearanceFormValues['theme']) || 'dark' 
		: 'dark';
  
	const form = useForm<AppearanceFormValues>({
		resolver: zodResolver(appearanceFormSchema),
		defaultValues: { theme: defaultTheme }
	});

	function onSubmit(data: AppearanceFormValues) {
		localStorage.setItem('theme', data.theme);
		toast({
			title: 'Preferences updated',
			description: `You selected the ${data.theme} theme.`
		});

		window.location.reload();
	}

	useEffect(() => {
		const currentTheme = form.getValues('theme');
		document.documentElement.setAttribute('data-theme', currentTheme);
	}, [form.getValues('theme'),]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='theme'
					render={({ field }) => (
						<FormItem className='space-y-1'>
							<FormLabel>Theme</FormLabel>
							<FormDescription>
								Select the theme for the app.
							</FormDescription>
							<FormMessage />
							<RadioGroup
								onValueChange={(value) => {
									field.onChange(value);
									document.documentElement.setAttribute('data-theme', value);
								}}
								defaultValue={field.value}
								className='grid max-w-md grid-cols-2 gap-8 pt-2'
							>
								<FormItem>
									<FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
										<FormControl>
											<RadioGroupItem value='light' className='sr-only' />
										</FormControl>
										<div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent'>
											<div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
												<div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
													<div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
													<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-[#ecedef]' />
													<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-[#ecedef]' />
													<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
												</div>
											</div>
										</div>
										<span className='block w-full p-2 text-center font-normal'>
											Light
										</span>
									</FormLabel>
								</FormItem>
								<FormItem>
									<FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
										<FormControl>
											<RadioGroupItem value='dark' className='sr-only' />
										</FormControl>
										<div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground'>
											<div className='space-y-2 rounded-sm bg-slate-950 p-2'>
												<div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-sm'>
													<div className='h-2 w-[80px] rounded-lg bg-slate-400' />
													<div className='h-2 w-[100px] rounded-lg bg-slate-400' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-slate-400' />
													<div className='h-2 w-[100px] rounded-lg bg-slate-400' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-slate-400' />
													<div className='h-2 w-[100px] rounded-lg bg-slate-400' />
												</div>
											</div>
										</div>
										<span className='block w-full p-2 text-center font-normal'>
											Dark
										</span>
									</FormLabel>
								</FormItem>
							</RadioGroup>
						</FormItem>
					)}
				/>

				<Button type='submit'>Update preferences</Button>
			</form>
			<Toaster/>
		</Form>
	);
}