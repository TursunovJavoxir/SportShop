import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const res = await fetch(
      "http://127.0.0.1:8001/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (data.access_token) {
      localStorage.setItem(
        "token",
        data.access_token
      );

      alert("Успешный вход!");
    } else {
      alert("Ошибка логина");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="text"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={login}
          className="w-full bg-black text-white py-3 rounded-xl"
        >
          Войти
        </button>
      </div>
    </div>
  );
}

export default Login;