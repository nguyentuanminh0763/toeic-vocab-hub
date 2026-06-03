const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export interface LoginPayload  { email: string; password: string; }
export interface SignupPayload { email: string; password: string; full_name?: string; }

export interface AuthResponse {
  access_token: string;
  user: { id: string; email: string; full_name: string | null };
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? 'Request failed');
  return json.data as T;
}

export const authApi = {
  login:  (payload: LoginPayload)  => post<AuthResponse>('/auth/login', payload),
  signup: (payload: SignupPayload) => post<AuthResponse>('/auth/signup', payload),
};
