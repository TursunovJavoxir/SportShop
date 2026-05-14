import { useState } from "react"
import axios from "axios"

function Login({ setToken }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // login
  const handleLogin = async () => {

    try {

      const formData = new FormData()

      formData.append("username", username)
      formData.append("password", password)

      const response = await axios.post(
        "https://sportshop-e3ew.onrender.com/login",
        formData
      )

      const token = response.data.access_token

      // сохраняем токен
      localStorage.setItem("token", token)

      // обновляем state
      setToken(token)

      alert("Успешный вход")

    } catch (error) {
      console.log(error)
      alert("Ошибка входа")
    }
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "30px"
      }}
    >

      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          backgroundColor: "#111",
          color: "white",
          cursor: "pointer"
        }}
      >
        Login
      </button>

    </div>
  )
}

export default Login