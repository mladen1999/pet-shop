import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.email !== email || storedUser.password !== password) {
      alert("❌ Pogrešan email ili lozinka.");
      return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(storedUser));
    window.dispatchEvent(new Event("storage"));
    alert("✅ Uspešno prijavljeni!");
    navigate("/profile");
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">🔑 Prijava</h1>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md">
        <label className="block mb-2">📧 Email:</label>
        <input type="email" className="w-full p-2 mb-4 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className="block mb-2">🔑 Lozinka:</label>
        <input type="password" className="w-full p-2 mb-4 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">🚀 Prijavi se</button>
      </form>
    </div>
  );
}

export default Login;
