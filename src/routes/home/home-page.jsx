import { useContext } from "react";

import { UserContext } from "../../context/UserContext";
import { auth } from "../../utils/firebase/firebase.utils";
import "./home.scss";

const HomePage = () => {
  const { currentUser = null } = useContext(UserContext);

  return (
    <div>
      {currentUser ? (
        <div>
          <h1>Welcome: {auth.currentUser.displayName}</h1>
        </div>
      ) : (
        <h1>Please connect your account</h1>
      )}
    </div>
  );
};

export default HomePage;
