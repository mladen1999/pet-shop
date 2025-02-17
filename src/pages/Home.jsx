import { useState } from "react";
import { Link } from "react-router-dom";

const pets = [
  { id: 1, name: "Maza", type: "Pas", age: 2, size: "Mali", price: 200, rating: 4.5 },
  { id: 2, name: "Cicko", type: "Mačka", age: 3, size: "Srednji", price: 150, rating: 4.7 },
  { id: 3, name: "Puffy", type: "Zec", age: 1, size: "Mali", price: 100, rating: 4.8 },
  { id: 4, name: "Goldie", type: "Ribica", age: 1, size: "Mali", price: 50, rating: 4.3 },
  { id: 5, name: "Rex", type: "Pas", age: 5, size: "Veliki", price: 300, rating: 4.6 },
];

function Home() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "" || pet.type === filterType)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pregled ljubimaca</h1>

      {/* Input za pretragu */}
      <input
        type="text"
        placeholder="Pretraži ljubimce..."
        className="w-full p-2 mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="w-full p-2 mb-4 border rounded"
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="">Sve vrste</option>
        <option value="Pas">Pas</option>
        <option value="Mačka">Mačka</option>
        <option value="Zec">Zec</option>
        <option value="Ribica">Ribica</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div key={pet.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">{pet.name}</h2>
              <p className="text-gray-600">Vrsta: {pet.type}</p>
              <p className="text-gray-600">Starost: {pet.age} godine</p>
              <p className="text-gray-600">Cena: {pet.price}€</p>
              <p className="text-gray-600">Ocena: ⭐ {pet.rating}</p>
              <Link to={`/pet/${pet.id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                Detalji
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Nema rezultata za pretragu.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
