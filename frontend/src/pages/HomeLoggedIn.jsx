import NavBar from "../components/NavBar";

function HomeLoggedIn() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-bgC flex flex-col items-center justify-center p-4">
        <div className="bg-bgC p-10 rounded-2xl w-full max-w-xl border border-gray-700 text-center">
          <h1 className="headtext">Welcome Back!</h1>
          <p className="text-gray-400 mt-4">
            You are now logged in. Start exploring your personalized Sri Lankan
            adventure!
          </p>
        </div>
      </div>
    </>
  );
}

export default HomeLoggedIn;
