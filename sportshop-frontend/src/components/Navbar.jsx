import { Link } from "react-router-dom";

function Navbar({
  darkMode,
  setDarkMode,
}) {

  return (
    <nav className="bg-black text-white px-4 md:px-10 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg sticky top-0 z-50">

      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl md:text-3xl font-bold tracking-wide hover:text-green-400 transition"
      >
        SportShop
      </Link>

      {/* MENU */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-8 text-sm md:text-lg items-center">

        <Link
          to="/"
          className="hover:text-green-400 transition"
        >
          Главная
        </Link>

        <Link
          to="/cart"
          className="hover:text-green-400 transition"
        >
          Корзина
        </Link>

        <Link
          to="/admin"
          className="hover:text-green-400 transition"
        >
          Admin
        </Link>

        <Link
          to="/login"
          className="hover:text-green-400 transition"
        >
          Login
        </Link>

        {/* DARK MODE */}
        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 transition"
        >

          {
            darkMode
              ? "☀️ Light"
              : "🌙 Dark"
          }

        </button>

      </div>

    </nav>
  );
}

export default Navbar;