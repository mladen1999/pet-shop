import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import animacija

function Home() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const pets = JSON.parse(localStorage.getItem("pets")) || [];

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "" || pet.type === filterType) &&
      (filterSize === "" || pet.size === filterSize) &&
      (filterOrigin === "" || pet.origin === filterOrigin) &&
      (filterPrice === "" || pet.price <= parseInt(filterPrice))
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🐾 Pregled ljubimaca 🐾</h1>

      {/* Polje za pretragu */}
      <input
        type="text"
        placeholder="🔍 Pretraži ljubimce..."
        className="w-full p-2 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filteri */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select className="w-full p-2 border rounded" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">Sve vrste</option>
          <option value="Pas">Pas</option>
          <option value="Mačka">Mačka</option>
          <option value="Zec">Zec</option>
          <option value="Papagaj">Papagaj</option>
          <option value="Ribica">Ribica</option>
        </select>

        <select className="w-full p-2 border rounded" value={filterSize} onChange={(e) => setFilterSize(e.target.value)}>
          <option value="">Sve veličine</option>
          <option value="Mali">Mali</option>
          <option value="Srednji">Srednji</option>
          <option value="Veliki">Veliki</option>
        </select>

        <select className="w-full p-2 border rounded" value={filterOrigin} onChange={(e) => setFilterOrigin(e.target.value)}>
          <option value="">Sva porekla</option>
          <option value="Srbija">Srbija</option>
          <option value="Hrvatska">Hrvatska</option>
          <option value="Japan">Japan</option>
          <option value="Francuska">Francuska</option>
          <option value="Italija">Italija</option>
        </select>

        <input
          type="number"
          placeholder="Maksimalna cena (€)"
          className="w-full p-2 border rounded"
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        />
      </div>

      {/* Lista ljubimaca */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <motion.div
              key={pet.id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold">{pet.name}</h2>
              <p className="text-gray-600">Vrsta: {pet.type}</p>
              <p className="text-gray-600">Starost: {pet.age} godine</p>
              <p className="text-gray-600">Veličina: {pet.size}</p>
              <p className="text-gray-600">Cena: {pet.price}€</p>
              <p className="text-gray-600">Ocena: ⭐ {pet.rating}</p>
              <p className="text-gray-600">Poreklo: {pet.origin}</p>
              <Link to={`/pet/${pet.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Detalji
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 text-center">❌ Nema rezultata za pretragu.</p>
        )}
      </div>
    </div>
  );
}

export default Home;