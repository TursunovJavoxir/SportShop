import { useState } from "react"
import axios from "axios"

function RegisterPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8001/register",
        {
          email,
          password
        }
      )

      alert("Пользователь создан")

    } catch (error) {
      console.log(error)
      alert("Ошибка регистрации")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold mb-5">
          Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 mb-4 rounded-xl"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 mb-4 rounded-xl"
        />

        <button
          onClick={handleRegister}
          className="bg-green-600 text-white w-full py-3 rounded-xl"
        >
          Register
        </button>

      </div>

    </div>
  )
}

export default RegisterPage