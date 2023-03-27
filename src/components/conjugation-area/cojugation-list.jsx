import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import ConjugationBlock from "./conjugation-block/conugation-block";
import ConjugationCard from "./conjugation-card/conjugation-card";
import { BiDownArrow } from "react-icons/bi";

const conjugations = {
  aller: {},
  marcher: {
    futur: [
      {
        il: "marchera",
        ils: "marcheront",
        je: "marcherai",
        nous: "marcherons",
        tu: "marcheras",
        vous: "marcherez",
      },
    ],
    imparfait: [
      {
        il: "marchait",
        ils: "marchaient",
        je: "marchais",
        nous: "marchions",
        tu: "marchais",
        vous: "marchiez",
      },
    ],
  },
};

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
      {Object.keys(conjuList).map((verb, index) => (
        <div key={index}>
          {Object.keys(conjuList[verb]).map((tense, index2) => (
            <div>
              <ConjugationBlock
                key={`${index}-${index2}`}
                verb={verb}
                tense={tense}
                conjugations={conjuList[verb][tense]}
              />
              <h3>oui: {conjuList[verb][tense][0].je}</h3>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ConjugationList;
