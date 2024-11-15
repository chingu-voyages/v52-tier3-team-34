import { useAuth } from '../auth';
import { Link, useRouter } from '@tanstack/react-router';
import { Route } from '../routes';

const UnauthenticatedMenu = () => {
  return (
    <>
      <div className="p-2 flex gap-3 text-lg px-3">
        {/* home */}
        <Link
          to="/"
          activeProps={{
            className: 'underline'
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/login"
          activeProps={{
            className: 'underline'
          }}
          activeOptions={{ exact: true }}
        >
          Login
        </Link>
        <Link
          to="/register"
          activeProps={{
            className: 'underline'
          }}
        >
          Register
        </Link>
      </div>
      <hr />
    </>
  );
};

const AuthenticatedMenu = () => {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: '/' });
        });
      });
    }
  };

  return (
    <>
      <div className="p-2 flex gap-3 text-lg px-3">
        <button type="button" className="hover:underline" onClick={handleLogout}>
          Logout
        </button>
        <Link
          to="/"
          activeProps={{
            className: 'underline'
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/secret"
          activeProps={{
            className: 'underline'
          }}
          activeOptions={{ exact: true }}
        >
          Secret page
        </Link>
      </div>
      <hr />
    </>
  );
};

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}</>;
};

export default Navbar;
