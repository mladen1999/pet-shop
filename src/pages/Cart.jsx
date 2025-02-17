import { useCart } from "../context/CartContext";
import ReactStars from "react-stars";
import { useState } from "react";
import PropTypes from "prop-types";

function Cart() {
  const { cart, removeFromCart, updateStatus, rateOrder } = useCart();

  const totalPrice = cart.reduce((sum, pet) => sum + pet.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🛒 Korpa</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Korpa je prazna.</p>
      ) : (
        <div>
          {cart.map((pet) => (
            <div key={pet.id} className="border p-4 rounded-lg shadow mb-4">
              <h2 className="text-xl font-semibold">{pet.name}</h2>
              <EditableField pet={pet} field="name" label="📌 Ime" />
              <EditableField pet={pet} field="type" label="📌 Vrsta" />
              <EditableField pet={pet} field="age" label="📅 Starost" type="number" />
              <EditableField pet={pet} field="size" label="📏 Veličina" />
              <EditableField pet={pet} field="origin" label="🌍 Poreklo" />
              <EditableField pet={pet} field="price" label="💰 Cena" type="number" />
              <EditableField pet={pet} field="description" label="📜 Opis" />

              <p>📦 Status: {pet.status}</p>

              {/* Meni za promenu statusa */}
              {pet.status !== "preuzeto" && (
                <select
                  className="w-full p-2 border rounded mt-2"
                  value={pet.status}
                  onChange={(e) => updateStatus(pet.id, e.target.value)}
                >
                  <option value="u toku">🕒 U toku</option>
                  <option value="otkazano">❌ Otkazano</option>
                  <option value="preuzeto">✅ Preuzeto</option>
                </select>
              )}

              {/* Ocenjivanje je omogućeno samo ako je status "preuzeto" */}
              {pet.status === "preuzeto" && (
                <div className="mt-2">
                  <p className="font-bold">📝 Ocenite ljubimca:</p>
                  <ReactStars
                    count={5}
                    value={pet.rating || 0}
                    size={30}
                    color2={"#ffd700"}
                    onChange={(newRating) => rateOrder(pet.id, newRating)}
                  />
                </div>
              )}

              {/* Brisanje porudžbine dozvoljeno samo ako je "preuzeto" */}
              {pet.status === "preuzeto" && (
                <button
                  onClick={() => removeFromCart(pet.id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  ❌ Ukloni iz korpe
                </button>
              )}
            </div>
          ))}
          <h2 className="text-2xl font-bold mt-4">Ukupna cena: 💰 {totalPrice}€</h2>
        </div>
      )}
    </div>
  );
}

EditableField.propTypes = {
  pet: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

function EditableField({ pet, field, label, type = "text" }) {
  const { updateOrderDetails } = useCart();
  const [value, setValue] = useState(pet[field]);

  const isEditable = pet.status === "u toku" || pet.status === "otkazano";

  const handleSave = () => {
    updateOrderDetails(pet.id, { [field]: value });
  };

  return (
    <div className="mt-2">
      <label className="font-bold">{label}:</label>
      {isEditable ? (
        <input
          type={type}
          className="w-full p-2 border rounded"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
        />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}

export default Cart;
