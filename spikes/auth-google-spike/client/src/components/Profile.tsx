import { useState } from 'react';
import { getProfile, checkHealth, checkAuthHealth } from '../services/api';

type TestResult = {
  endpoint: string;
  data?: unknown;
  error?: string;
};

export const Profile = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);

  const clearResults = () => {
    setResults([]);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    clearResults();
  };

  const addResult = (result: TestResult) => {
    setResults(prev => [...prev, result]);
  };

  const testPublicHealth = async () => {
    try {
      setLoading(true);
      const data = await checkHealth();
      addResult({ endpoint: '/api/v1/health', data });
    } catch (err) {
      addResult({
        endpoint: '/api/v1/health',
        error: err instanceof Error ? err.message : 'Failed to check health'
      });
    } finally {
      setLoading(false);
    }
  };

  const testProtectedHealth = async () => {
    try {
      setLoading(true);
      const data = await checkAuthHealth();
      addResult({ endpoint: '/api/v1/health/auth', data });
    } catch (err) {
      addResult({
        endpoint: '/api/v1/health/auth',
        error: err instanceof Error ? err.message : 'Failed to check protected health'
      });
    } finally {
      setLoading(false);
    }
  };

  const testProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      addResult({ endpoint: '/api/v1/auth/profile', data });
    } catch (err) {
      addResult({
        endpoint: '/api/v1/auth/profile',
        error: err instanceof Error ? err.message : 'Failed to fetch profile'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">API Route Tests</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={testPublicHealth}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
          disabled={loading}
        >
          Test Public Health
        </button>

        <button 
          onClick={testProtectedHealth}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          Test Protected Health
        </button>

        <button 
          onClick={testProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          Test Profile
        </button>
        
        <button 
          onClick={clearToken}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Clear Token
        </button>

        <button 
          onClick={clearResults}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Clear Results
        </button>
      </div>

      {loading && (
        <div className="text-blue-600 mb-4">
          Loading...
        </div>
      )}

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-3 text-gray-800">{result.endpoint}</h3>
            {result.error ? (
              <div className="text-red-500 bg-red-50 p-3 rounded-md">
                Error: {result.error}
              </div>
            ) : (
              <pre className="whitespace-pre bg-white p-3 rounded-md border border-gray-200 font-mono text-sm text-left overflow-x-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
