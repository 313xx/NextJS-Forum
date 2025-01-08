import React from 'react';
import { getAuth } from '@/auth/cookie';
import HomePage from './components/homePage';
import AuthenticatedHomePage from './components/authenticatedHomePage';

export default async function Home() {
	const { user } = await getAuth();

	if (!user) {
		return (
			<>
				<HomePage />    
			</>
		);
	}

	return (
		<>
			<AuthenticatedHomePage />
		</>
	);
}
