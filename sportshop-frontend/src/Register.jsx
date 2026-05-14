import { useState } from "react"
import axios from "axios"

function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // регистрация
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
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "30px"
      }}
    >

      <h2>Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          backgroundColor: "green",
          color: "white",
          cursor: "pointer"
        }}
      >
        Register
      </button>

    </div>
  )
}

export default Register