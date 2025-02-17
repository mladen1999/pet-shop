import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function PetDetails() {
  const pets = JSON.parse(localStorage.getItem("pets")) || [];
  const { addToCart } = useCart();

  const { id } = useParams();
  // const pets = JSON.parse(localStorage.getItem("pets")) || []; // Dohvatamo ljubimce iz localStorage
  const pet = pets.find((p) => p.id === parseInt(id));

  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
  });

  const [newReview, setNewReview] = useState({ rating: "", comment: "" });

  useEffect(() => {
    localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews)); // Čuvamo recenzije
  }, [reviews, id]);

  if (!pet) {
    return <h2 className="text-center text-red-500 text-xl">Ljubimac nije pronađen.</h2>;
  }

  // const handleAddToCart = () => {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   localStorage.setItem("cart", JSON.stringify([...cart, pet]));
  //   alert("✅ Ljubimac dodat u korpu!");
  // };
  const handleAddToCart = () => {
    addToCart(pet);
    alert("✅ Ljubimac dodat u korpu!");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!newReview.rating || !newReview.comment) {
      alert("❌ Popunite sve podatke pre slanja recenzije!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
      alert("❌ Morate biti prijavljeni da biste ostavili recenziju!");
      return;
    }

    const newReviewObj = {
      name: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    setReviews([...reviews, newReviewObj]);
    setNewReview({ rating: "", comment: "" });
    alert("✅ Recenzija uspešno dodata!");
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>
      <p><strong>Vrsta:</strong> {pet.type}</p>
      <p><strong>Starost:</strong> {pet.age} godine</p>
      <p><strong>Cena:</strong> {pet.price}€</p>
      <p><strong>Opis:</strong> {pet.description}</p>

      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        🛒 Dodaj u korpu
      </button>

      {/* Sekcija za recenzije */}
      <h2 className="text-2xl font-bold mt-6">⭐ Recenzije</h2>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-4 mt-2 rounded-lg">
            <p><strong>{review.name}</strong> - {review.rating}⭐</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-2">Nema recenzija za ovog ljubimca.</p>
      )}

      {/* Forma za dodavanje recenzija */}
      <form onSubmit={handleReviewSubmit} className="mt-4 bg-gray-50 p-4 rounded-lg">
        <label className="block mb-2">⭐ Ocena (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          className="w-full p-2 border rounded"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          required
        />

        <label className="block mt-4 mb-2">💬 Komentar:</label>
        <textarea
          className="w-full p-2 border rounded"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          required
        />

        <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          ✅ Pošalji recenziju
        </button>
      </form>
    </div>
  );
}

export default PetDetails;
