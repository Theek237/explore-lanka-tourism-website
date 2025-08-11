// import { useState } from "react";
// import { Link } from "react-router-dom";
// import NavBar from "../components/NavBar";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function handleLoginFormSubmit(e) {
//     e.preventDefault();
//     console.log("Login Data Submitted");
//     console.log("email: ", email);
//     console.log("password: ", password);
//   }

//   return (
//     <>
//       <NavBar />
//       <div className="flex flex-col items-center container mx-auto mt-15">
//         <div className="border border-gray-600 py-5 px-5">
//           <h1 className="headtext">Log In to Your Account</h1>
//           <p className="subtext -mt-3">
//             Your next adventure is just a password away.
//           </p>
//           <form
//             className="flex flex-col gap-3"
//             onSubmit={handleLoginFormSubmit}
//           >
//             <div className="flex gap-5 justify-end">
//               <label className="inputLabel" htmlFor="email">
//                 Email:
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-5 justify-end">
//               <label htmlFor="password">Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button className="bluebutton" type="submit">
//               Login
//             </button>
//             <p>
//               Don't have account yet?
//               <Link to="/register">
//                 <span> Register.</span>
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLoginFormSubmit(e) {
    e.preventDefault();
    setError("");
    console.log("Login Data Submitted");
    console.log("email: ", email);
    console.log("password: ", password);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/homeloggedin");
      console.log("Login successful:", res.data);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("Error during login:", error);
    }
  }

  return (
    <>
      <NavBar />
      {/* Main container for the entire page */}
      <div className="min-h-screen bg-bgC flex flex-col items-center justify-center p-4">
        {/* Login form container */}
        <div className="bg-bgC p-10 rounded-2xl w-full max-w-xl border border-gray-700 ">
          {/* Header */}
          <h1 className="headtext">Log In to Your Account</h1>
          <p className="text-gray-400 text-center mt-2 mb-8">
            Your next adventure is just a password away.
          </p>
          {error && (
            <div className="text-red-400 text-center mb-4">{error}</div>
          )}
          {/* Form with grid layout for alignment */}
          <form
            className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-5 items-center"
            onSubmit={handleLoginFormSubmit}
          >
            {/* Email Row */}
            <label htmlFor="email" className="text-gray-300 justify-self-end">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password Row */}
            <label
              htmlFor="password"
              className="text-gray-300 justify-self-end"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="bg-[#2D2D2D] text-gray-200 rounded-md p-2.5 border-0 focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Forgot Password Link Row */}
            <div /> {/* Empty cell to align link to the right */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-sky-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Login Button Row */}
            <button
              className="col-span-2 bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition-colors duration-200 mt-4"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>

        {/* Sign Up link below the form container */}
        <p className="text-center text-gray-400 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
