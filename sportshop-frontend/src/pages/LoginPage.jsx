import { useState } from "react"
import axios from "axios"

function LoginPage({ setToken }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

    try {

      const formData = new FormData()

      formData.append("username", username)
      formData.append("password", password)

      const response = await axios.post(
        "http://127.0.0.1:8001/login",
        formData
      )

      const token = response.data.access_token

      localStorage.setItem("token", token)

      setToken(token)

      alert("Успешный вход")

    } catch (error) {
      console.log(error)
      alert("Ошибка входа")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-[400px]">

        <h1 className="text-3xl font-bold mb-5">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          onClick={handleLogin}
          className="bg-black text-white w-full py-3 rounded-xl"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default LoginPage