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
    <div className=" w-full z-100 flex justify-between items-center pt-5 pb-5 px-5 md:px-20 font-koulen text-base md:text-xl bg-bgC/50">
      <Link to={loggedIn ? "/dashboard" : "/"}>
        <img
          src="/images/logoel.png"
          alt="Explore Lanka"
          className="h-12 md:h-16"
        />
      </Link>
      <ul className="flex md:gap-10 gap-5">
        <li>
          <Link to={loggedIn ? "/dashboard" : "/"}>HOME</Link>
        </li>
        <li>
          <Link to="/locations">LOCATIONS</Link>
        </li>
        <li>TRAVEL TIPS</li>
        <li>TRAVEL PLANNER</li>
        {loggedIn ? (
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="hover:underline focus:outline-none"
            >
              LOGOUT
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
