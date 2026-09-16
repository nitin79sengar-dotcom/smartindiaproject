
import { Link, NavLink } from "react-router-dom";
import { Compass, LayoutDashboard, Sparkles } from "lucide-react";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-emerald-50 text-emerald-700"
        : "text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Compass size={22} />
          </div>

          <div>
            <h1 className="text-lg font-extrabold leading-none text-gray-900">
              Hidden India
            </h1>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
              Discover • Explore • Connect
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-2 md:flex">
          {/* Explore */}
          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            <Compass size={17} />
            Explore
          </NavLink>

          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={navLinkClass}
          >
            <LayoutDashboard size={17} />
            Dashboard
          </NavLink>

          {/* AI Planner */}
          <NavLink
            to="/ai-planner"
            className={navLinkClass}
          >
            <Sparkles size={17} />
            AI Planner
          </NavLink>
        </nav>

        {/* RIGHT CTA */}
        <Link
          to="/ai-planner"
          className="hidden items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600 sm:flex"
        >
          <Sparkles size={16} />
          Plan My Trip
        </Link>
      </div>
    </header>
  );
}

export default Navbar;


