import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const loggedIn = !!user;

  const handleLogout = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      await logout();
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-b from-[#0c0c0c]/85 to-[#0c0c0c]/40 border-b border-white/5">
      <div className="app-container flex items-center justify-between py-4">
        <Link to={loggedIn ? "/dashboard" : "/"} className="group flex items-center gap-3">
          <img
            src="/images/logoel.png"
            alt="Explore Lanka"
            className="h-12 md:h-14 transition-transform duration-300 group-hover:scale-[1.04]"
          />
          <span className="sr-only">Explore Lanka</span>
        </Link>
        <nav aria-label="Main navigation" className="">
          <ul className="flex items-center gap-4 md:gap-8 font-display text-sm md:text-base tracking-wide">
            <li>
              <Link
                to={loggedIn ? "/dashboard" : "/"}
                className="px-2 py-1 rounded-md transition-colors duration-200 hover:text-white/90"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/locations"
                className="px-2 py-1 rounded-md transition-colors duration-200 hover:text-white/90"
              >
                LOCATIONS
              </Link>
            </li>
            <li className="hidden md:block text-white/50 hover:text-white/80 transition-colors px-2 py-1">
              TRAVEL TIPS
            </li>
            <li className="hidden lg:block text-white/50 hover:text-white/80 transition-colors px-2 py-1">
              TRAVEL PLANNER
            </li>
            {loggedIn ? (
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  LOGOUT
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="btn-primary text-sm shadow-md"
                >
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}

export default NavBar;
