import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Home({ darkMode }) {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("Все");

  // загрузка товаров
  useEffect(() => {

    fetch("http://127.0.0.1:8001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

  }, []);

  // добавить в корзину
  const addToCart = async (productId) => {

    const token = localStorage.getItem("token");

    if (!token) {

      toast.error("Сначала войдите");

      return;
    }

    const res = await fetch(
      `http://127.0.0.1:8001/cart/add/${productId}`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {

      toast.success("Товар добавлен в корзину");

    } else {

      toast.error("Ошибка добавления");alert("Ошибка");
    }
  };

  // категории
  const categories = [
    "Все",
    ...new Set(products.map((p) => p.category)),
  ];

  // фильтр
  const filteredProducts = products.filter(
    (product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Все" ||
        product.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div
  className={
    darkMode
      ? "bg-gray-900 min-h-screen text-white"
      : "bg-gray-100 min-h-screen"
  }
>

      {/* HERO */}
      <section className="bg-gradient-to-r from-black to-gray-900 text-white py-16 md:py-24 px-5 md:px-10">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">

            Спортивное питание
            <br />

            нового уровня

          </h1>

          <p className="text-lg md:text-xl text-gray-300 mt-6 md:mt-8 max-w-2xl">

            Протеины, креатин, BCAA
            и лучшие добавки для
            роста мышц и восстановления.

          </p>

          <button className="mt-10 bg-green-500 px-8 py-4 rounded-2xl text-xl hover:bg-green-600 transition">

            Купить сейчас

          </button>

        </div>

      </section>

      {/* CONTENT */}
      <div className="p-5 md:p-10 max-w-7xl mx-auto">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className={
  darkMode
    ? "w-full p-5 rounded-2xl border border-gray-700 bg-gray-800 text-white mb-8 text-lg shadow-sm"
    : "w-full p-5 rounded-2xl border mb-8 text-lg shadow-sm"
}
        />

        {/* CATEGORIES */}
        <div className="flex gap-4 mb-10 flex-wrap">

          {categories.map((category) => (

            <button
  key={category}
  onClick={() =>
    setSelectedCategory(category)
  }

  className={`px-6 py-3 rounded-2xl transition text-lg ${
    selectedCategory === category
      ? "bg-black text-white"
      : darkMode
      ? "bg-gray-800 text-white hover:bg-gray-700"
      : "bg-white hover:bg-gray-200"
  }`}
>

  {category}

</button>

          ))}

        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">

          {filteredProducts.map((product) => (

            <div
  key={product.id}
  className={
    darkMode
      ? "bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition hover:-translate-y-2 duration-300"
      : "bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition hover:-translate-y-2 duration-300"
  }
>

              {/* IMAGE */}
              <div className="overflow-hidden">

                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-56 md:h-72 object-cover hover:scale-110 transition duration-500"
                />

              </div>

              {/* INFO */}
              <div className="p-6">

                <p
  className={
    darkMode
      ? "text-gray-300"
      : "text-gray-500"
  }
>
  {product.category}
</p>

                <Link
                  to={`/product/${product.id}`}
                >

                  <h2 className="text-2xl md:text-3xl font-bold mt-3 hover:text-green-600 transition">

                    {product.name}

                  </h2>

                </Link>

                <p className="text-2xl md:text-3xl text-green-600 font-bold mt-5">

                  {product.price} сум

                </p>

                <button
                  onClick={() =>
                    addToCart(product.id)
                  }
                  className="mt-6 w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition text-lg"
                >

                  Добавить в корзину

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;