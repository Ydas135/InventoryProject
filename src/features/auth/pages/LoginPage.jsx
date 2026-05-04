import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/UseAuth';

export const LoginPage = () => {

    const { login } = useAuth()
    const navigate = useNavigate();

    const [ form, setForm ] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);

        try {
            await login(form)

            navigate("/")

        }   catch (err) {
            console.error("LOGIN ERROR:", err);
            alert("Credenciales incorrectas");
        }   finally {
            setLoading(false)
        }
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex justify-center items-center"
    >
      <div className="flex flex-col gap-4">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </button>
      </div>
    </form>
  )
}
