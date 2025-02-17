import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    favoritePets: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!user.name || !user.email || !user.password) {
      alert("❌ Molimo popunite sva obavezna polja!");
      return;
    }

    // Čuvamo korisničke podatke u localStorage
    localStorage.setItem("user", JSON.stringify(user));

    alert("✅ Registracija uspešna! Možete se sada prijaviti.");
    navigate("/login"); // Preusmeravamo korisnika na login stranicu
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">📋 Registracija</h1>
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md">
        <label className="block mb-2">Ime i prezime:</label>
        <input
          type="text"
          name="name"
          className="w-full p-2 mb-4 border rounded"
          value={user.name}
          onChange={handleChange}
          required
        />

        <label className="block mb-2">📧 Email:</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 mb-4 border rounded"
          value={user.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2">🔑 Lozinka:</label>
        <input
          type="password"
          name="password"
          className="w-full p-2 mb-4 border rounded"
          value={user.password}
          onChange={handleChange}
          required
        />

        <label className="block mb-2">📞 Telefon:</label>
        <input
          type="text"
          name="phone"
          className="w-full p-2 mb-4 border rounded"
          value={user.phone}
          onChange={handleChange}
        />

        <label className="block mb-2">🏠 Adresa:</label>
        <input
          type="text"
          name="address"
          className="w-full p-2 mb-4 border rounded"
          value={user.address}
          onChange={handleChange}
        />

        <label className="block mb-2">🐾 Omiljene vrste ljubimaca:</label>
        <input
          type="text"
          name="favoritePets"
          className="w-full p-2 mb-4 border rounded"
          value={user.favoritePets}
          onChange={handleChange}
        />

        <button className="w-full bg-green-500 text-white p-2 rounded" type="submit">
          ✅ Registruj se
        </button>
      </form>
    </div>
  );
}

export default Register;
