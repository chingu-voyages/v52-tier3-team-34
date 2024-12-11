import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import authIllustration from '@/assets/Authentication.svg';
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
    <div className="min-h-96 flex items-center">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md  text-white p-6 rounded-lg ">
          {isAuthenticated && user ? (
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-green-500">Welcome, {user.name}</h1>
              <p className="text-gray-400">You are ready to manage your events.</p>
            </div>
          ) : (
            <div className="">
              <h1 className="text-2xl font-bold mb-6">Welcome</h1>
              <p className="text-gray-400 mb-11">
                Log in to add live events, manage your venue&apos;s details, and connect with your audience.
              </p>
              <div className="w-fit">
                <GoogleLogin onSuccess={handleSuccess} shape="pill" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src={authIllustration} // Replace with your actual illustration path
          alt="Venue Management Illustration"
          className="max-w-lg"
        />
      </div>
    </div>
  );
}

export default LoginComponent;
