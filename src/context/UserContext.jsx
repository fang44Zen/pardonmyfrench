import { createContext, useState } from "react";
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  currentUserName: "",
  setCurrentUserName: () => "",
});

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("");
  const value = {
    currentUser,
    setCurrentUser,
    currentUserName,
    setCurrentUserName,
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user);
  //     }
  //     setCurrentUser(user);
  //   });

  //   return unsubscribe;
  // }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
