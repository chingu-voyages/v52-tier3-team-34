import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';

export const Protected = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
        <p className="mb-4">
          Welcome {user.name}! This is a protected page that only authenticated users can see.
        </p>
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Your Profile:</h2>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
      </div>
    </div>
  );
};
