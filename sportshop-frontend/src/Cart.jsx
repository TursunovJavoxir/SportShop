import { useEffect, useState } from "react"
import axios from "axios"

function Cart({ token }) {

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
    return <p>Войдите чтобы использовать корзину</p>
  }

  return (
    <div style={{ marginTop: "50px" }}>

      <h2>Корзина</h2>

      {
        cartItems.length === 0
          ?
          <p>Корзина пустая</p>
          :
          cartItems.map((item) => (

            <div
              key={item.id}
              style={{
                backgroundColor: "white",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "10px"
              }}
            >

              <p>Product ID: {item.product_id}</p>

              <p>Количество: {item.quantity}</p>

              <button
                onClick={() => removeFromCart(item.product_id)}
                style={{
                  padding: "8px 15px",
                  border: "none",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
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
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              border: "none",
              backgroundColor: "green",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Оформить заказ
          </button>

        )
      }

    </div>
  )
}

export default Cart