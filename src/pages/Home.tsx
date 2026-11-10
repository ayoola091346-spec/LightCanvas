import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";

function Home() {
  return (
    <>
      <Navbar />

     <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <Hero />
      </main>
    </>
  );
}

export default Home;