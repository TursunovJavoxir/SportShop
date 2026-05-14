import { useEffect, useState } from "react"
import axios from "axios"

function OrdersPage({ token }) {

  const [orders, setOrders] = useState([])

  // получить заказы
  const fetchOrders = async () => {

    if (!token) return

    try {

      const response = await axios.get(
        "http://127.0.0.1:8001/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setOrders(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [token])

  if (!token) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">
          Войдите чтобы смотреть заказы
        </h1>
      </div>
    )
  }

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        Мои заказы
      </h1>

      {
        orders.map((order) => (

          <div
            key={order.order_id}
            className="bg-white p-5 rounded-2xl shadow mb-5"
          >

            <h2 className="text-2xl font-bold mb-5">
              Заказ #{order.order_id}
            </h2>

            {
              order.products.map((product, index) => (

                <div
                  key={index}
                  className="border-b py-3"
                >

                  <p>
                    <strong>Товар:</strong> {product.product_name}
                  </p>

                  <p>
                    <strong>Цена:</strong> {product.price}
                  </p>

                  <p>
                    <strong>Количество:</strong> {product.quantity}
                  </p>

                  <p>
                    <strong>Сумма:</strong> {product.total}
                  </p>

                </div>

              ))
            }

            <h3 className="text-2xl font-bold mt-5">
              Итого: {order.total_price} сум
            </h3>

          </div>

        ))
      }

    </div>
  )
}

export default OrdersPage