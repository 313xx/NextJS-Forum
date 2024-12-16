'use client';

import { intendedError } from '@/utils/utils';
import { useState, useEffect } from 'react';

interface User {
	username: string;
}

interface AuthResult {
	user: User | null;
}

export function useAuth() {
	const [auth, setAuth,] = useState<AuthResult>({ user: null });
	const [isLoading, setIsLoading,] = useState(true);

	useEffect(() => {
		async function fetchAuth() {
			try {
				const response = await fetch('/api/auth');
				const data = await response.json() as AuthResult;
				setAuth(data);
			} catch (error) {
				intendedError('Failed to fetch auth', error);
				setAuth({ user: null });
			} finally {
				setIsLoading(false);
			}
		}

		void fetchAuth();
	}, []);

	return { ...auth, isLoading };
}