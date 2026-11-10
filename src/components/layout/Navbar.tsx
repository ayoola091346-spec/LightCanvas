import Container from "./Container";

function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-900">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-white">Lite</span>
            <span className="text-cyan-400">Canvas</span>
          </h1>

          <div className="hidden items-center gap-8 text-slate-300 md:flex">
            <a href="#" className="transition hover:text-cyan-400">
              Home
            </a>

            <a href="#" className="transition hover:text-cyan-400">
              Image
            </a>

            <a href="#" className="transition hover:text-cyan-400">
              Video
            </a>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;