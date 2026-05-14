import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import ProductPage from "./pages/ProductPage";
import { Toaster } from "react-hot-toast";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  // загрузка темы
  useEffect(() => {

    const savedTheme =
      localStorage.getItem("darkMode");

    if (savedTheme === "true") {

      setDarkMode(true);
    }

  }, []);

  // сохранение темы
  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode
    );

  }, [darkMode]);

  return (
    <div
      className={
        darkMode
          ? "dark bg-gray-900 text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >

      <BrowserRouter>
      <Toaster position="top-right" />

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>

          <Route
            path="/"
            element={<Home darkMode={darkMode} />}
          />

          <Route
            path="/login"
            element={<Login darkMode={darkMode} />}
          />

          <Route
            path="/cart"
            element={<Cart darkMode={darkMode} />}
          />

          <Route
            path="/admin"
            element={<Admin darkMode={darkMode} />}
          />

          <Route
            path="/product/:id"
            element={
              <ProductPage darkMode={darkMode} />
            }
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;