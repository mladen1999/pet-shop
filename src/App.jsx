import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import PetDetails from "./pages/PetDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chatbot from "./components/Chatbot";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("loggedUser")));
  const navigate = useNavigate();

  // Pratimo promene u localStorage kako bismo ažurirali Navbar
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("loggedUser"))); // Ažurira korisnika
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Toaster />
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="font-bold">Pet Shop</Link>
          <div>
            <Link to="/cart" className="bg-white text-blue-600 px-4 py-2 rounded mr-2">Korpa</Link>
            {user ? (
              <>
                <Link to="/profile" className="bg-white text-blue-600 px-4 py-2 rounded">Profil</Link>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                  🚪 Odjavi se
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded">Prijava</Link>
                <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded ml-2">Registracija</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet/:id" element={<PetDetails />} />
        <Route path="/cart" element={<Cart />} />
        {user && <Route path="/profile" element={<Profile />} />}
        {!user && <Route path="/login" element={<Login />} />}
        {!user && <Route path="/register" element={<Register />} />}
      </Routes>

      <Chatbot />
    </div>
  );
}

export default App;
