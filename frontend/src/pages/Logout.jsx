import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      try {
        await axios.post(
          "http://localhost:5000/api/auth/logout",
          {},
          { withCredentials: true }
        );
      } catch (err) {
        // Optionally handle error
      } finally {
        navigate("/login");
      }
    }
    logout();
  }, [navigate]);

  return null;
}

export default Logout;
