import { useEffect, useState, useContext } from "react";

import { UserContext } from "../../context/UserContext";
import "./home.scss";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const { currentUserName, currentUser } = useContext(UserContext);

  // useEffect(() => {
  //   if (currentUser === null) {
  //     setUserName("");
  //   } else {
  //     const userNameHandler = async () => {
  //       const userNameRef = doc(dataBase, "users", currentUser.uid);
  //       const userNameSnapshot = await getDoc(userNameRef);
  //       console.log(userNameSnapshot.data());
  //       setUserName(userNameSnapshot.data().displayName);
  //     };
  //     userNameHandler();
  //   }
  // }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUserName);
    } else {
      setUserName("");
    }
  }, [currentUserName, currentUser]);

  return (
    <div>
      <h1>Welcome: {userName}</h1>
    </div>
  );
};

export default HomePage;
