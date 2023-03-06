import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { dataBase } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/UserContext";
import "./home.scss";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser === null) {
      setUserName("");
    } else {
      const userNameHandler = async () => {
        const userNameRef = doc(dataBase, "users", currentUser.uid);
        const userNameSnapshot = await getDoc(userNameRef);

        setUserName(userNameSnapshot.data().displayName);
      };
      userNameHandler();
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Welcome: {userName}</h1>
    </div>
  );
};

export default HomePage;
