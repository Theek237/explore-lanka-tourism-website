import NavBar from "../components/NavBar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-bgC text-white">
      <NavBar />
      <div className="container mx-auto pt-32 text-center">
        <h1 className="font-koulen text-5xl md:text-7xl tracking-tight">
          Welcome Back
        </h1>
        <p className="mt-4 opacity-80">
          Plan and explore your Sri Lankan adventure.
        </p>
      </div>
    </div>
  );
}
