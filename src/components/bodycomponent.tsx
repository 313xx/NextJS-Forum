'use client';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const BodyComponent = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme,] = useState<string>('dark');
	const [isHydrated, setIsHydrated,] = useState<boolean>(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			setTheme(storedTheme);
		} else {
			localStorage.setItem('theme', 'dark');
		}
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (isHydrated) {
			document.body.className = theme;
		}
	}, [theme, isHydrated,]);

	if (!isHydrated) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

export default BodyComponent;
