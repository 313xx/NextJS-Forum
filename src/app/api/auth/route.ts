import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/auth/cookie';
import { validateSession } from '@/auth/session';
import { intendedError } from '@/utils/utils';


export async function GET() {
	try {
		const sessionToken = cookies().get(SESSION_COOKIE_NAME)?.value ?? null;
  
		if (!sessionToken) {
			return NextResponse.json({ 
				user: null 
			}, { status: 200 });
		}
  
		const authResult = await validateSession(sessionToken);
	  
		return NextResponse.json({ 
			authenticatedUser: authResult.user ? { 
				username: authResult.user.username,
				role: authResult.user.role
			} : null 
		}, { status: 200 });
	} catch (error) {
		intendedError('Authentication error:', error);
	  
		return NextResponse.json({ 
			user: null,
			error: 'Authentication failed'
		}, { status: 401 });
	}
}