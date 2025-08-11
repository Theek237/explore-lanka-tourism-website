import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Add this import

function NavBar() {
  const { user } = useAuth(); // Get user from context
  const loggedIn = !!user;

  return (
    <div className=" w-full z-100 flex justify-between items-center pt-5 pb-5 px-5 md:px-20 font-koulen text-base md:text-xl bg-bgC/50">
      <Link to="/">
        <img
          src="/images/logoel.png"
          alt="Explore Lanka"
          className="h-12 md:h-16"
        />
      </Link>
      <ul className="flex md:gap-10 gap-5">
        {loggedIn ? (
          <li>
            <Link to="/homeloggedin">HOME</Link>
          </li>
        ) : (
          <li>
            <Link to="/">HOME</Link>
          </li>
        )}

        <li>
          <Link to="/locations">LOCATIONS</Link>
        </li>
        <li>TRAVEL TIPS</li>
        <li>TRAVEL PLANNER</li>
        {loggedIn ? (
          <>
            <li>
              <Link to="/profile">PROFILE</Link>
            </li>
            <li>
              <Link to="/logout">LOGOUT</Link>
            </li>
          </>
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
