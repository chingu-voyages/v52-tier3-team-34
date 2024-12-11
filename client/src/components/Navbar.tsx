import { Link, } from '@tanstack/react-router';

import logoWithText from '@/assets/Logo-with-text.svg';
import { useAuth } from '@/auth/auth';

function UnauthenticatedMenu() {
  return (
    <nav className="container">
      <header className="relative z-10 flex h-16 items-center justify-between py-11 px-3">
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
              I&apos;m an organizer
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
  );
}

function AuthenticatedMenu() {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <>
      <nav className="container">
        <header className="relative z-10 flex h-16 items-center justify-between py-11 px-3">
          <div
            className="flex items-center gap-6 max-md:flex-1 max-md:justify-between xl:gap-12"
            data-dashlane-rid="d46fd011dac4ec07"
          >
            <Link title="Home" to="/">
              <img className="h-11" src={logoWithText} alt="LiveScape logo" />
            </Link>
          </div>
          <div className="flex items-center gap-6 max-md:hidden xl:gap-12">
            <button onClick={handleLogout}>Logout</button>

            <Link to="/dashboard" className="relative text-xs font-semibold uppercase tracking-wider max-lg:hidden">
              Dashboard
            </Link>
            <Link
              to="/map"
              search={{ lat: 41.390205, lng: 2.154007, radius: 20 }}
              className="relative text-xs font-semibold uppercase tracking-wider max-lg:hidden"
            >
              Map
            </Link>
          </div>
          <div id="header-right-element-mobile" className="md:hidden"></div>
        </header>
      </nav>
    </>
  );
}

function Navbar() {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}</>;
}

export default Navbar;
