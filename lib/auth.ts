import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);
const COOKIE_NAME = 'sop_session';

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  categories: string[];
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  // #region agent log
  fetch('http://127.0.0.1:7385/ingest/09dde936-f35e-4298-82b6-8f46c80527c2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fbc59d'},body:JSON.stringify({sessionId:'fbc59d',runId:'initial',hypothesisId:'H6',location:'lib/auth.ts:getSession:token-check',message:'Server session token presence',data:{hasToken:Boolean(token),tokenLength:token ? token.length : 0},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!token) return null;
  const payload = await verifyToken(token);
  // #region agent log
  fetch('http://127.0.0.1:7385/ingest/09dde936-f35e-4298-82b6-8f46c80527c2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fbc59d'},body:JSON.stringify({sessionId:'fbc59d',runId:'initial',hypothesisId:'H6',location:'lib/auth.ts:getSession:payload',message:'Decoded session payload',data:{hasPayload:Boolean(payload),userIdType:payload ? typeof payload.userId : 'none',userIdValue:payload?.userId ?? null,role:payload?.role ?? null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return payload;
}

export async function getSessionFromRequest(req: NextRequest): Promise<SessionPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  // #region agent log
  fetch('http://127.0.0.1:7385/ingest/09dde936-f35e-4298-82b6-8f46c80527c2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fbc59d'},body:JSON.stringify({sessionId:'fbc59d',runId:'initial',hypothesisId:'H7',location:'lib/auth.ts:getSessionFromRequest:token-check',message:'Request session token presence',data:{hasToken:Boolean(token),tokenLength:token ? token.length : 0},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!token) return null;
  const payload = await verifyToken(token);
  // #region agent log
  fetch('http://127.0.0.1:7385/ingest/09dde936-f35e-4298-82b6-8f46c80527c2',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'fbc59d'},body:JSON.stringify({sessionId:'fbc59d',runId:'initial',hypothesisId:'H7',location:'lib/auth.ts:getSessionFromRequest:payload',message:'Decoded request session payload',data:{hasPayload:Boolean(payload),userIdType:payload ? typeof payload.userId : 'none',userIdValue:payload?.userId ?? null,role:payload?.role ?? null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return payload;
}

export function setSessionCookie(token: string): void {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function clearSessionCookie(): void {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
}

export { COOKIE_NAME };
