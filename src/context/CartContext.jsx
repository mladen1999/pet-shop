import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pet) => {
    setCart((prevCart) => [...prevCart, pet]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((pet) => pet.id !== id));
  };

  const updateStatus = (id, status) => {
    setCart((prevCart) =>
      prevCart.map((pet) =>
        pet.id === id ? { ...pet, status } : pet
      )
    );
  };

  const updateOrderDetails = (id, updatedData) => {
    setCart((prevCart) =>
      prevCart.map((pet) =>
        pet.id === id && (pet.status === "u toku" || pet.status === "otkazano")
          ? { ...pet, ...updatedData }
          : pet
      )
    );
  };

  // ✅ Ažurirana funkcija rateOrder koja ažurira i localStorage
  const rateOrder = (id, newRating) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((pet) => {
        if (pet.id === id) {
          const newRatingsArray = pet.ratings ? [...pet.ratings, newRating] : [newRating]; // Dodajemo novu ocenu
          const averageRating = newRatingsArray.reduce((sum, r) => sum + r, 0) / newRatingsArray.length; // Računamo prosek
  
          return { ...pet, ratings: newRatingsArray, rating: parseFloat(averageRating.toFixed(1)) }; // Postavljamo novi prosek
        }
        return pet;
      });
  
      // ✅ Čuvamo ažuriranu korpu u localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  
      // ✅ Takođe ažuriramo ocenu i u `pets` iz localStorage-a
      const storedPets = JSON.parse(localStorage.getItem("pets")) || [];
      const updatedPets = storedPets.map((pet) =>
        pet.id === id
          ? {
              ...pet,
              ratings: updatedCart.find((p) => p.id === id).ratings,
              rating: updatedCart.find((p) => p.id === id).rating,
            }
          : pet
      );
      localStorage.setItem("pets", JSON.stringify(updatedPets));
  
      return updatedCart;
    });
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateStatus, rateOrder, updateOrderDetails }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  return useContext(CartContext);
}
