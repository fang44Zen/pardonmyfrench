import { useContext, useState } from "react";

import { UserContext } from "../../context/UserContext";
import { auth } from "../../utils/firebase/firebase.utils";
import Enfant from "./enfant-todelete";
import "./home.scss";

const HomePage = () => {
  const { currentUser = null } = useContext(UserContext);
  const [result, setResults] = useState(0);

  const calChild = (numChild) => {
    setResults(numChild * 2);
  };

  return (
    <div>
      {currentUser ? (
        <div>
          <Enfant onCalculate={calChild} numChildValue={result} />
          <h1>Welcome: {auth.currentUser.displayName}</h1>
        </div>
      ) : (
        <h1>Please connect your account</h1>
      )}
    </div>
  );
};

export default HomePage;
