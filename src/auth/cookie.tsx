import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';
import { validateSession } from './session';

export const SESSION_COOKIE_NAME = 'session';

export const setSessionCookie = (sessionToken: string, expiresAt: Date) => {
	const cookie = {
		name: SESSION_COOKIE_NAME,
		value: sessionToken,
		attributes: {
			httpOnly: true,
			sameSite: 'lax' as const,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			expires: expiresAt
		}
	};

	(cookies() as unknown as UnsafeUnwrappedCookies).set(cookie.name, cookie.value, cookie.attributes);
};

export const deleteSessionCookie = () => {
	const cookie = {
		name: SESSION_COOKIE_NAME,
		value: '',
		attributes: {
			httpOnly: true,
			sameSite: 'lax' as const,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 0
		}
	};

	(cookies() as unknown as UnsafeUnwrappedCookies).set(cookie.name, cookie.value, cookie.attributes);
};

export const getAuth = async () => {
	const sessionToken =
      (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;
  
	if (!sessionToken) {
		return { session: null, user: null };
	}
  
	return validateSession(sessionToken);
};