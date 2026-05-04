import { createContext, useContext } from "react";
import { useAuthStore } from "../features/auth/store/AuthStore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user: authUser } = useAuthStore();

  const user = authUser
    ? {
        name: authUser.email,
        email: authUser.email,
        role: "Admin",
        avatar: null,
      }
    : null;

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);