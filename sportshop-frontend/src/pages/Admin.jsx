import { useEffect, useState } from "react";

function Admin() {

  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");

  // загрузка товаров
  const loadProducts = async () => {

    const res = await fetch(
      "https://sportshop-e3ew.onrender.com/products"
    );

    const data = await res.json();

    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // добавить товар
  const addProduct = async () => {

    const res = await fetch(
      "https://sportshop-e3ew.onrender.com/products",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name,
          price: Number(price),
          image_url: imageUrl,
          category,
        }),
      }
    );

    if (res.ok) {

      alert("Товар добавлен");

      setName("");
      setPrice("");
      setImageUrl("");
      setCategory("");

      loadProducts();

    } else {

      alert("Ошибка");
    }
  };

  // удалить товар
  const deleteProduct = async (id) => {

    const res = await fetch(
      `https://sportshop-e3ew.onrender.com/products/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {

      loadProducts();

    } else {

      alert("Ошибка удаления");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Admin Panel
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Добавить товар
        </h2>

        <div className="grid gap-4">

          <input
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="URL изображения"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Категория"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border p-3 rounded-xl"
          />

          <button
            onClick={addProduct}
            className="bg-black text-white py-3 rounded-xl"
          >
            Добавить
          </button>

        </div>

      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-2xl shadow p-5"
          >

            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-56 object-cover rounded-xl"
            />

            <h2 className="text-2xl font-bold mt-4">
              {product.name}
            </h2>

            <p className="text-gray-500">
              {product.category}
            </p>

            <p className="text-green-600 text-2xl font-bold mt-3">
              {product.price} сум
            </p>

            <button
              onClick={() =>
                deleteProduct(product.id)
              }
              className="mt-5 w-full bg-red-500 text-white py-3 rounded-xl"
            >
              Удалить
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Admin;