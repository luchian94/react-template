import { useNavigate } from 'react-router-dom';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { signIn } from './api/signIn.api';
import { SignInPayload } from './models/auth.model';

interface AuthState {
  isLoading: boolean;
  username: string | undefined;
  accessToken: string | undefined;
  errorMessage: string | undefined;
}

const initialState: AuthState = {
  isLoading: false,
  username: undefined,
  accessToken: undefined,
  errorMessage: undefined,
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(() => initialState, {
      name: 'auth-store',
      partialize: (state) => ({ username: state.username, accessToken: state.accessToken }),
    }),
    { enabled: import.meta.env.DEV, store: 'auth-store' },
  ),
);

// Getters
export class AuthStoreGetters {
  static get accessToken() {
    return useAuthStore.getState().accessToken;
  }
  static get isAuthenticated() {
    return !!this.accessToken;
  }
}

// Selectors
export const useAuthUsername = () => useAuthStore((state) => state.username);
export const useAuthIsLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthErrorMessage = () => useAuthStore((state) => state.errorMessage);
export const useAuthAccessToken = () => useAuthStore((state) => state.accessToken);
export const useAuthIsLoggedIn = () => useAuthStore((state) => !!state.accessToken);

// Actions
export const setAuthIsLoading = (isLoading: boolean) => useAuthStore.setState({ isLoading });
export const setAuthErrorMessage = (errorMessage: string | undefined) =>
  useAuthStore.setState({ errorMessage });

export const useAuthSignIn = () => {
  const navigate = useNavigate();

  return async (payload: SignInPayload) => {
    setAuthErrorMessage(undefined);
    setAuthIsLoading(true);
    const { data } = await signIn(payload);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (data && payload.username === 'admin') {
      useAuthStore.setState({
        isLoading: false,
        username: data.username,
        accessToken: data.accessToken,
        errorMessage: undefined,
      });
      navigate('/');
    } else {
      setAuthIsLoading(false);
      setAuthErrorMessage('Credenziali invalide');
    }
  };
};

export const useAuthSignOut = () => {
  const navigate = useNavigate();

  return () => {
    useAuthStore.setState(initialState);
    navigate('/login');
  };
};
