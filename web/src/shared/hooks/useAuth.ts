'use client';

import { useState, useEffect, useCallback } from 'react';
import { getToken, getUser, setToken, setUser, clearAuth, type AuthUser } from '@/shared/lib/auth-storage';
import { authApi, type LoginPayload, type SignupPayload } from '@/services/auth.api';

export function useAuth() {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUserState(getUser());
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.login(payload);
      setToken(data.access_token);
      setUser(data.user);
      setUserState(data.user);
      return data;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Đăng nhập thất bại';
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (payload: SignupPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.signup(payload);
      setToken(data.access_token);
      setUser(data.user);
      setUserState(data.user);
      return data;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Đăng ký thất bại';
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUserState(null);
  }, []);

  return { user, loading, error, login, signup, logout, isLoggedIn: !!user };
}
