import { createContext, useState } from "react";
import { login } from "../components/services/loginService.js";
import {signupAuthGoogle} from "../components/services/signupAuthGoogle.js"

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [url_icons, setUrlIcons] = useState("");
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const inicioDeSesionUsuarioGoogle = async (newUser) => {
    try {
      const response = await signupAuthGoogle(newUser);
      setUserId(response.id_user);
      setUsername(response.name);
      setUrlIcons(response.url_icons);
      localStorage.setItem("token", response.token);
      console.log("la respuesta del back es ",response)
    } catch (error) {
      console.error("Error al intentar obtener by user desde el back", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        userId,
        setUserId,
        username,
        setUsername,
        url_icons,
        setUrlIcons,
        inicioDeSesionUsuarioGoogle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
