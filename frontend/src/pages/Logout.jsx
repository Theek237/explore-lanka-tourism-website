import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const confirmLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const cancel = () => {
    // Go back or home if no history
    if (window.history.length > 1) navigate(-1);
    else navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgC text-white p-6">
      <div className="bg-[#2D2D2D] p-8 rounded-xl max-w-sm w-full text-center space-y-6 border border-gray-700">
        <h1 className="text-2xl font-semibold">Confirm Logout</h1>
        <p>Are you sure you want to log out?</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={confirmLogout}
            className="bg-sky-500 hover:bg-sky-600 px-5 py-2 rounded-md"
          >
            Yes, Logout
          </button>
          <button
            onClick={cancel}
            className="bg-gray-600 hover:bg-gray-500 px-5 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
