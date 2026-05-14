import { useEffect, useState } from "react"
import axios from "axios"

function CartPage({ token }) {

  const [cartItems, setCartItems] = useState([])

  // получить корзину
  const fetchCart = async () => {

    if (!token) return

    try {

      const response = await axios.get(
        "http://127.0.0.1:8001/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setCartItems(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  // удалить товар
  const removeFromCart = async (productId) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8001/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      fetchCart()

    } catch (error) {
      console.log(error)
    }
  }

  // оформить заказ
  const createOrder = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8001/orders/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Заказ оформлен")

      fetchCart()

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [token])

  if (!token) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Войдите чтобы открыть корзину
        </h1>
      </div>
    )
  }

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        Корзина
      </h1>

      {
        cartItems.length === 0
          ?
          <p>Корзина пустая</p>
          :
          cartItems.map((item) => (

            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl shadow mb-5"
            >

              <h2 className="text-2xl font-bold mb-3">
                Product ID: {item.product_id}
              </h2>

              <p className="mb-4">
                Количество: {item.quantity}
              </p>

              <button
                onClick={() => removeFromCart(item.product_id)}
                className="bg-red-500 text-white px-5 py-2 rounded-xl"
              >
                Удалить
              </button>

            </div>

          ))
      }

      {
        cartItems.length > 0 && (

          <button
            onClick={createOrder}
            className="bg-green-600 text-white px-6 py-3 rounded-2xl"
          >
            Оформить заказ
          </button>

        )
      }

    </div>
  )
}

export default CartPage