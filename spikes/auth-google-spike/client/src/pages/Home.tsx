import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../auth/AuthContext';
import { Profile } from '../components/Profile';

export const Home = () => {
  const { user, login, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome to Live Music Finder
      </h1>

      <div className="mb-8">
        {user ? (
          <div>
            <p className="mb-4">Welcome, {user.name}!</p>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <GoogleLogin onSuccess={login} />
        )}
      </div>

      {/* Add Profile component for testing protected routes */}
      <Profile />
    </div>
  );
};
