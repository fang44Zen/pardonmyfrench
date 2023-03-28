import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import DisplayConjList from "./display-conj-list";

const ConjugationList = () => {
  const { currentUser } = useContext(UserContext);
  const [conjuList, setConjList] = useState([]);

  const updateConjugation = useCallback(async () => {
    if (currentUser) {
      try {
        const docRef = doc(dataBase, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setConjList(docSnap.data().conjugations);
      } catch (e) {
        console.log(e);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    updateConjugation();
  }, [updateConjugation]);

  return (
    <div>
      <DisplayConjList conjuList={conjuList} />
    </div>
  );
};

export default ConjugationList;
