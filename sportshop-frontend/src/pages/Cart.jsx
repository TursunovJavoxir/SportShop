import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");

  const loadCart = async () => {
    const res = await fetch("https://sportshop-e3ew.onrender.com/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeFromCart = async (productId) => {
    await fetch(
      `https://sportshop-e3ew.onrender.com/cart/remove/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadCart();
  };

  const createOrder = async () => {
    const res = await fetch(
      "https://sportshop-e3ew.onrender.com/orders/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      alert("Заказ оформлен!");
      loadCart();
    } else {
      alert("Ошибка заказа");
    }
  };

  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
  });

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        Корзина
      </h1>

      <div className="space-y-5">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl shadow flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-28 h-28 object-cover rounded-xl"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  {item.product.name}
                </h2>

                <p className="text-gray-500">
                  {item.product.category}
                </p>

                <p className="text-xl text-green-600 font-bold mt-2">
                  {item.product.price} сум
                </p>

                <p className="mt-2">
                  Количество: {item.quantity}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                removeFromCart(item.product.id)
              }
              className="bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-3xl font-bold">
          Итого: {totalPrice} сум
        </h2>

        <button
          onClick={createOrder}
          className="mt-5 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default Cart;