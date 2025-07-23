import { createContext, useEffect, useState } from "react";
import { ApiRoutes } from "../../constant";

export const UserContext = createContext();
// USER CONTEXT PROVIDE
function UserContextProvider({ children }) {
  const [isUser, setIsUser] = useState(null);

  // function
  const fetchUserData = async (token) => {
    const res = await fetch(`${ApiRoutes.user.myInfo}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(FormData),
    });
    const data = await res.json();
    setIsUser(data.data);
  };

  // useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (!isUser) {
      fetchUserData(token);
    }
  }, [isUser]);

  return (
    <UserContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContextProvider;
