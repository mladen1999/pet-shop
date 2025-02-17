import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Kreiranje konteksta
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stanje korisnika (null znači da nije prijavljen)

  // Funkcija za prijavu
  const login = (userData) => {
    setUser(userData);
  };

  // Funkcija za odjavu
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook za lakše korišćenje konteksta
/* export const useUser = () => {
  return useContext(UserContext);
};
 */