import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

function Chatbot() {
  const pets = JSON.parse(localStorage.getItem("pets")) || [];
  const [messages, setMessages] = useState([{ text: "Zdravo! Kako mogu pomoći?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const { addToCart } = useCart();

  const handleUserMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => handleBotResponse(input), 500);
    setInput("");
  };

  const handleBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let botResponse = [{ text: "❌ Izvini, ne razumem. Možeš pitati nešto poput 'Pronađi psa' ili 'Rezerviši Mazu'.", sender: "bot" }];

    // Pretraga po vrsti ljubimca
    if (lowerInput.includes("pronađi")) {
        const type = lowerInput.split("pronađi ")[1];
        const foundPets = pets.filter((pet) => pet.type.toLowerCase() === type);

        if (foundPets.length > 0) {
            botResponse = [{ text: `🔍 **Pronašao sam sledeće ljubimce:**`, sender: "bot" }];
            foundPets.forEach((pet) => {
                botResponse.push({
                    text: (
                        <div key={pet.id}>
                            <p>🐾 <strong>{pet.name}</strong></p>
                            <p>📌 Vrsta: {pet.type} | 📅 Starost: {pet.age} godine | 💰 Cena: {pet.price}€</p>
                            <a href={`/pet/${pet.id}`} className="text-blue-500 underline">
                                🔗 Pogledaj detalje
                            </a>
                        </div>
                    ),
                    sender: "bot",
                });
            });
        } else {
            botResponse = [{ text: `❌ Nisam pronašao ljubimce vrste "${type}".`, sender: "bot" }];
        }
    }

    // Rezervacija ljubimca
    if (lowerInput.includes("rezerviši")) {
        const petName = lowerInput.split("rezerviši ")[1];
        const pet = pets.find((p) => p.name.toLowerCase() === petName);

        if (pet) {
            addToCart(pet);
            botResponse = [
                { text: `✅ Ljubimac **${pet.name}** je uspešno rezervisan!`, sender: "bot" },
                {
                    text: (
                        <a href="/cart" className="text-blue-500 underline">
                            🛒 Idi u korpu
                        </a>
                    ),
                    sender: "bot",
                },
            ];
        } else {
            botResponse = [{ text: `❌ Ne mogu pronaći ljubimca "${petName}".`, sender: "bot" }];
        }
    }

    setMessages((prev) => [...prev, ...botResponse]);
};




  return (
    <motion.div
      className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-blue-500 text-white p-4">🐶 Virtualni Asistent</div>
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md ${msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex">
        <input
          type="text"
          placeholder="Unesite poruku..."
          className="flex-1 p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUserMessage()}
        />
        <button onClick={handleUserMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r">
          ➤
        </button>
      </div>
    </motion.div>
  );
}

export default Chatbot;
