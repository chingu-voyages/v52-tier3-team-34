import { useAuth } from '@/auth';
import { Link, useRouter } from '@tanstack/react-router';
import { Route } from '@/routes';
import logoWithText from '@/assets/Logo-with-text.svg';

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
      <nav className="container">
        <header className="relative z-10 flex h-16 items-center justify-between">
          <div
            className="flex items-center gap-6 max-md:flex-1 max-md:justify-between xl:gap-12"
            data-dashlane-rid="d46fd011dac4ec07"
          >
            <Link title="Home" to="/">
              <img className="h-11" src={logoWithText} alt="LiveScape logo" />
            </Link>
          </div>
          <div className="flex items-center gap-6 max-md:hidden xl:gap-12">
            <div id="header-right-element-desktop" className="flex">
              <Link to="/dashboard" className="relative text-xs font-semibold uppercase tracking-wider max-lg:hidden">
                I'm an organizer
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="remixicon absolute -right-3 -top-2 size-3"
                >
                  <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div id="header-right-element-mobile" className="md:hidden"></div>
        </header>
      </nav>
    </>
  );
};

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}</>;
};

export default Navbar;
