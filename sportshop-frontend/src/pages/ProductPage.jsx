import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function ProductPage({ darkMode }) {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // загрузка товара
  useEffect(() => {

    fetch(
      `http://127.0.0.1:8001/products/${id}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data));

  }, [id]);

  // добавить в корзину
  const addToCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) {

      alert("Сначала войдите");

      return;
    }

    const res = await fetch(
      `http://127.0.0.1:8001/cart/add/${id}`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {

      alert("Товар добавлен");

    } else {

      alert("Ошибка");
    }
  };

  // loading
  if (!product) {

    return (
      <div className="p-10">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <div className="bg-white rounded-3xl shadow-xl p-10 grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div>

          <img
            src={product.image_url}
            alt={product.name}
            className="w-full rounded-3xl"
          />

        </div>

        {/* INFO */}
        <div>

          <p
  className={
    darkMode
      ? "text-gray-300 text-xl"
      : "text-gray-500 text-xl"
  }
>
            {product.category}
          </p>

          <h1 className="text-5xl font-bold mt-3">
            {product.name}
          </h1>

          <p className="text-4xl text-green-600 font-bold mt-6">
            {product.price} сум
          </p>

          <p
  className={
    darkMode
      ? "mt-8 text-gray-300 leading-8"
      : "mt-8 text-gray-700 leading-8"
  }
>

            Премиальное спортивное питание
            для набора мышечной массы,
            восстановления и повышения
            эффективности тренировок.

          </p>

          <button
            onClick={addToCart}
            className="mt-10 bg-black text-white px-10 py-4 rounded-2xl text-xl hover:bg-gray-800"
          >
            Добавить в корзину
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductPage;