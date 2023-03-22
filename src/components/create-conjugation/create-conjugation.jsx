import "./create-conjugation.scss";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { BiDownArrow, BiArrowFromRight } from "react-icons/bi";
import { UserContext } from "../../context/UserContext";
import { useState, useCallback, useEffect, useContext } from "react";

const defaultInputConj = {
  je: "",
  tu: "",
  il: "",
  nous: "",
  vous: "",
  ils: "",
};

const CreateConjugation = () => {
  const [inputVerb, setInputVerb] = useState("");
  const [currentVerb, setCurrentVerb] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const { currentUser } = useContext(UserContext);
  const [verbList, setVerbList] = useState([]);
  const [inputConj, setInputConj] = useState(defaultInputConj);
  const { je, tu, il, nous, vous, ils } = inputConj;
  const [timeAlreadyExist, setTimeAlreadyExist] = useState("");
  const timeAvailable = {
    present: "présent de l'infinif",
    futur: "futur simple",
    "passe-compose": "passé composé",
    imparfait: "imparfait",
  };
  const filteredTimeAvailable = Object.keys(timeAvailable).filter(
    (key) => !timeAlreadyExist.includes(key)
  );

  const updateVerbList = useCallback(async () => {
    if (currentUser) {
      const docRef = doc(dataBase, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      setVerbList(docSnap.data().conjugations);
    }
  }, [currentUser]);

  useEffect(() => {
    updateVerbList();
  }, [updateVerbList]);

  const selectVerb = (event) => {
    const val = event.target.dataset.value;
    setCurrentVerb(val);
  };

  useEffect(() => {
    if (verbList && verbList[currentVerb]) {
      setTimeAlreadyExist(Object.keys(verbList[currentVerb]).join("|"));
    }
  }, [currentVerb, verbList]);

  const selectTime = (event) => {
    const val = event.target.dataset.value;
    setCurrentTime(val);
  };

  const verbInputHandler = (event) => {
    const verb = event.target.value;
    setInputVerb(verb);
  };

  const conjInputHandler = (event) => {
    const { value, name } = event.target;
    setInputConj({ ...inputConj, [name]: value });
  };

  const addVerb = async () => {
    try {
      const docRef = doc(dataBase, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data().conjugations;
      if (data.hasOwnProperty(inputVerb)) {
        console.log("le verb existe déjà dans votre liste");
        return;
      }
      await updateDoc(
        docRef,
        {
          [`conjugations.${inputVerb}`]: {},
        },
        { merge: true }
      );
      setCurrentVerb(inputVerb);
      setInputVerb("");
      updateVerbList();
    } catch (e) {
      console.log(e);
    }
  };

  const addConjugation = async () => {
    if (!Object.values(inputConj).every((x) => x === null || x === "")) {
      const docRef = doc(dataBase, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        [`conjugations.${currentVerb}.${currentTime}`]: arrayUnion({
          je: je,
          tu: tu,
          il: il,
          nous: nous,
          vous: vous,
          ils: ils,
        }),
      });
      setInputConj(defaultInputConj);
      setCurrentTime("");
      updateVerbList();
    }
  };

  return (
    <div>
      <div>
        <div>
          <input
            value={inputVerb}
            onChange={verbInputHandler}
            placeholder="Add a verb"
          />
          <button onClick={addVerb}>add</button>
        </div>
        <div>
          <div>
            {currentVerb !== "" ? (
              <div>
                <p>{currentVerb}</p>
                <BiDownArrow />
              </div>
            ) : (
              <div>
                <p>Select a verb</p>
                <BiArrowFromRight />
              </div>
            )}
          </div>
          <div>
            <div>
              {Object.keys(verbList).map((key, id) => (
                <div data-value={key} onClick={selectVerb} key={id}>
                  {key}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Afficher ce menu seulement une 
        fois qu'un verbe a été ajouté ou selectionné
        (Tout comme les inputs de dessous...) */}
        ------------------------
        {currentVerb !== "" && (
          <div>
            {currentTime !== "" ? (
              <div>{currentTime}</div>
            ) : (
              <div>Select a time</div>
            )}
            <div>
              {filteredTimeAvailable.map((key, index) => (
                <div key={index} onClick={selectTime} data-value={key}>
                  {timeAvailable[key]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <h4>Current verb: {currentVerb}</h4>
      <div>
        <label>Je/J'</label>
        <input
          type="text"
          name="je"
          value={je}
          onChange={conjInputHandler}
          placeholder="Je/J'"
        />
      </div>
      <div>
        <label>Tu</label>
        <input
          type="text"
          name="tu"
          value={tu}
          onChange={conjInputHandler}
          placeholder="Tu"
        />
      </div>
      <div>
        <label>Il/Elle/On</label>
        <input
          type="text"
          name="il"
          value={il}
          onChange={conjInputHandler}
          placeholder="Il/Elle/On"
        />
      </div>
      <div>
        <label>Nous</label>
        <input
          type="text"
          name="nous"
          value={nous}
          onChange={conjInputHandler}
          placeholder="Nous"
        />
      </div>
      <div>
        <label>Vous</label>
        <input
          type="text"
          name="vous"
          value={vous}
          onChange={conjInputHandler}
          placeholder="Vous"
        />
      </div>
      <div>
        <label>Ils/Elles</label>
        <input
          type="text"
          name="ils"
          value={ils}
          onChange={conjInputHandler}
          placeholder="Ils/Elles"
        />
      </div>
      <div>
        <button onClick={addConjugation}>Add</button>
        <button>Quit</button>
      </div>
    </div>
  );
};

export default CreateConjugation;
