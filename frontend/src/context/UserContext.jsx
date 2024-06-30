import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [url_icons, setUrlIcons] = useState("");
  const [userId, setUserId, id_user] = useState(null);
  const [username, setUsername] = useState(null);
  

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        userId,
        id_user,
        setUserId,
        username,
        setUsername,
        url_icons,
        setUrlIcons,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};