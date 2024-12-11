import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useAuth } from '@/auth/auth';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: LoginComponent
});

function LoginComponent() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  async function handleSuccess(credentialResponse: CredentialResponse) {
    login(credentialResponse);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/dashboard' });
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-96 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 p-8  transition-all duration-300">
        <div className="text-center">
          {isAuthenticated && user?.name && (
            <div className="text-center space-y-4">
              <p className="text-xl text-gray-300 font-semibold">You are logged in</p>
              <p className="text-3xl text-green-600 font-semibold">Access Granted</p>
              <p className="text-gray-600">Welcome, {user.name}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">{!user && <GoogleLogin onSuccess={handleSuccess} shape="pill" />}</div>
      </div>
    </div>
  );
}

export default LoginComponent;
