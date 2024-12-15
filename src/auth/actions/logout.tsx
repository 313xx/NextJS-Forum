'use server';

import { redirect } from 'next/navigation';
import { getAuth, deleteSessionCookie } from '@/auth/cookie';
import { invalidateSession } from '@/auth/session';

export const logout = async () => {
	const { session } = await getAuth();

	if (!session) {
		redirect('/');
	}

	await invalidateSession(session.id);
	deleteSessionCookie();

	redirect('/');
};