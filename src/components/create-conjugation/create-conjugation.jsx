import "./create-conjugation.scss";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  BiDownArrow,
  BiArrowFromRight,
  BiUpArrow,
  BiArrowToBottom,
} from "react-icons/bi";
import { MdOutlineBackspace } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
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
  const [showVerbMenu, setShowVerbMenu] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [inputConj, setInputConj] = useState(defaultInputConj);
  const { je, tu, il, nous, vous, ils } = inputConj;
  const [timeAlreadyExist, setTimeAlreadyExist] = useState("");
  const [valueCurrentTime, setValueCurrenTime] = useState("");
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
    setShowVerbMenu(false);
  };

  useEffect(() => {
    if (verbList && verbList[currentVerb]) {
      setTimeAlreadyExist(Object.keys(verbList[currentVerb]).join("|"));
    }
  }, [currentVerb, verbList]);

  const selectTime = (event, timeValue) => {
    const val = event.target.dataset.value;
    setCurrentTime(val);
    setValueCurrenTime(timeValue);
    setShowTimeMenu(false);
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
        <div className="add-new-verb">
          <input
            value={inputVerb}
            onChange={verbInputHandler}
            placeholder="Add a verb"
          />
          <button onClick={addVerb}>add</button>
        </div>
        <div className="select-verb-menu">
          <div
            className={
              showVerbMenu
                ? "isSelected select-verb-menu_current-verb "
                : "select-verb-menu_current-verb "
            }
          >
            {currentVerb !== "" ? (
              <div onClick={() => setShowVerbMenu(!showVerbMenu)}>
                <p>{currentVerb}</p>
                {showVerbMenu ? <BiUpArrow /> : <BiDownArrow />}
              </div>
            ) : (
              <div onClick={() => setShowVerbMenu(!showVerbMenu)}>
                <p>Select a verb</p>
                {showVerbMenu ? <BiArrowFromRight /> : <BiArrowToBottom />}
              </div>
            )}
          </div>
          {showVerbMenu && (
            <div className="select-verb-menu_menu">
              <div>
                {Object.keys(verbList).map((key, id) => (
                  <div
                    className="select-verb-menu_menu_option"
                    data-value={key}
                    onClick={selectVerb}
                    key={id}
                  >
                    {key}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {currentVerb !== "" && (
          <div className="select-verb-menu">
            {currentTime !== "" ? (
              <div
                className={
                  showTimeMenu
                    ? "isSelected select-verb-menu_current-verb "
                    : "select-verb-menu_current-verb "
                }
                onClick={() => setShowTimeMenu(!showTimeMenu)}
              >
                {valueCurrentTime}
              </div>
            ) : (
              <div
                className={
                  showTimeMenu
                    ? "isSelected select-verb-menu_current-verb "
                    : "select-verb-menu_current-verb "
                }
                onClick={() => setShowTimeMenu(!showTimeMenu)}
              >
                Select a time
              </div>
            )}
            {showTimeMenu && (
              <div className="select-verb-menu_menu">
                {filteredTimeAvailable.map((key, index) => (
                  <div
                    className="select-verb-menu_menu_option"
                    key={index}
                    onClick={(event) => selectTime(event, timeAvailable[key])}
                    data-value={key}
                  >
                    {timeAvailable[key]}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {currentTime !== "" && (
        <div className="form-conj">
          <div className="form-conj_input-style">
            <label>Je/J'</label>
            <input
              type="text"
              name="je"
              value={je}
              onChange={conjInputHandler}
              placeholder="Je/J'"
            />
          </div>
          <div className="form-conj_input-style">
            <label>Tu</label>
            <input
              type="text"
              name="tu"
              value={tu}
              onChange={conjInputHandler}
              placeholder="Tu"
            />
          </div>
          <div className="form-conj_input-style">
            <label>Il/Elle/On</label>
            <input
              type="text"
              name="il"
              value={il}
              onChange={conjInputHandler}
              placeholder="Il/Elle/On"
            />
          </div>
          <div className="form-conj_input-style">
            <label>Nous</label>
            <input
              type="text"
              name="nous"
              value={nous}
              onChange={conjInputHandler}
              placeholder="Nous"
            />
          </div>
          <div className="form-conj_input-style">
            <label>Vous</label>
            <input
              type="text"
              name="vous"
              value={vous}
              onChange={conjInputHandler}
              placeholder="Vous"
            />
          </div>
          <div className="form-conj_input-style">
            <label>Ils/Elles</label>
            <input
              type="text"
              name="ils"
              value={ils}
              onChange={conjInputHandler}
              placeholder="Ils/Elles"
            />
          </div>

          <div className="form-conj_button-bar">
            <button className="subq-button" onClick={addConjugation}>
              Add
              <IoIosAddCircle color="white" />
            </button>
            <Link to="/pardonmyfrench/create-exo" className="cancel-button">
              Quit
              <MdOutlineBackspace />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateConjugation;
