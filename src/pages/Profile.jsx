import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("loggedUser", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user)); // Sinhronizacija sa `user`
    setIsEditing(false);
    alert("✅ Podaci uspešno sačuvani!");
    window.dispatchEvent(new Event("storage")); // Osvježavanje stanja u Navbaru
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  if (!user) {
    return <h2 className="text-center text-red-500 text-xl">Morate biti prijavljeni.</h2>;
  }

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">👤 Moj Profil</h1>

      <label className="block mb-2">Ime i prezime:</label>
      <input
        type="text"
        name="name"
        className="w-full p-2 border rounded"
        value={user.name}
        onChange={handleChange}
        disabled={!isEditing}
      />

      <label className="block mt-4 mb-2">📧 Email:</label>
      <input
        type="email"
        name="email"
        className="w-full p-2 border rounded"
        value={user.email}
        onChange={handleChange}
        disabled={!isEditing}
      />

      <label className="block mt-4 mb-2">🔑 Lozinka:</label>
      <input
        type="password"
        name="password"
        className="w-full p-2 border rounded"
        value={user.password}
        onChange={handleChange}
        disabled={!isEditing}
      />

      <label className="block mt-4 mb-2">📞 Telefon:</label>
      <input
        type="text"
        name="phone"
        className="w-full p-2 border rounded"
        value={user.phone || ""}
        onChange={handleChange}
        disabled={!isEditing}
      />

      <label className="block mt-4 mb-2">🏠 Adresa:</label>
      <input
        type="text"
        name="address"
        className="w-full p-2 border rounded"
        value={user.address || ""}
        onChange={handleChange}
        disabled={!isEditing}
      />

      <label className="block mt-4 mb-2">🐾 Omiljene vrste ljubimaca:</label>
      <input
        type="text"
        name="favoritePets"
        className="w-full p-2 border rounded"
        value={Array.isArray(user.favoritePets) ? user.favoritePets.join(", ") : user.favoritePets || ""}
        onChange={handleChange}
        disabled={!isEditing}
      />

      {isEditing ? (
        <button onClick={handleSave} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          💾 Sačuvaj promene
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          ✏️ Izmeni profil
        </button>
      )}

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded ml-4"
      >
        🚪 Odjavi se
      </button>
    </div>
  );
}

export default Profile;
