import "./create-questions.scss";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/UserContext";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineBackspace } from "react-icons/md";
import { BiDownArrow, BiArrowFromRight } from "react-icons/bi";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useState, useCallback, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "animate.css";
const questionsDefaultValues = {
  question: "",
  answer: "",
  hint: "",
};

const CreateQuestion = () => {
  const [inputValues, setInputValue] = useState(questionsDefaultValues);
  const { question, answer, hint } = inputValues;
  const [groupeQuestion, setGroupeQuestion] = useState("");
  const [currentGroupe, setCurrentGroupe] = useState("");
  const { currentUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [addGroupInput, setAddGroupInput] = useState(false);
  const [errorInputGroupEmpty, setErrorInputGroupEmpty] = useState(false);

  const updateGroupeList = useCallback(async () => {
    if (currentUser) {
      const docRef = doc(dataBase, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      setGroupList(docSnap.data().questions);
    }
  }, [currentUser]);

  useEffect(() => {
    updateGroupeList();
  }, [updateGroupeList]);

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  };

  const addGroupeHanlder = (event) => {
    const txt = event.target.value;
    setGroupeQuestion(txt);
  };

  const selectHandler = (event) => {
    const val = event.target.dataset.value;
    setCurrentGroupe(val);
    setShowMenu(!showMenu);
  };

  const addGroupeQuestion = async () => {
    try {
      const questionsRef = doc(dataBase, "users", auth.currentUser.uid);
      await updateDoc(questionsRef, {
        [`questions.${groupeQuestion}`]: {},
      });
      setCurrentGroupe(groupeQuestion);
      setGroupeQuestion("");
      updateGroupeList();
    } catch (e) {
      addGroupIsEmpty();
    }
  };

  const addGroupIsEmpty = () => {
    setAddGroupInput(true);
    setErrorInputGroupEmpty(true);
    setTimeout(() => {
      setAddGroupInput(false);
    }, 2000);
    setTimeout(() => {
      setErrorInputGroupEmpty(false);
    }, 3000);
  };

  const addQuestion = async () => {
    if (question !== "" && answer !== "") {
      const questionsRef = doc(dataBase, "users", auth.currentUser.uid);
      await updateDoc(questionsRef, {
        //On cherche la valeur précide dans "questions" et entre crochet et non accolade
        //El famoso syntaxe qui change celon les humeur :(
        [`questions.${currentGroupe}`]: arrayUnion({
          question: question,
          answer: answer,
          hint: hint,
        }),
      });
      setInputValue(questionsDefaultValues);
    }
  };

  return (
    <div>
      <div className="question-creator">
        <div className="select-group">
          <div className="select-group_add-group">
            {errorInputGroupEmpty && (
              <h3 className="error-message">Your groupe cannot be empty!</h3>
            )}

            <input
              placeholder="add group.."
              onChange={addGroupeHanlder}
              value={groupeQuestion}
            />
            <button
              className={addGroupInput ? "shake-button" : null}
              onClick={addGroupeQuestion}
            >
              Add
            </button>
          </div>
          <div className={"select-group_select-menu"}>
            <div
              className={
                showMenu
                  ? "select-group_select-menu_select-activated"
                  : "select-group_select-menu_select"
              }
              onClick={() => setShowMenu(!showMenu)}
            >
              {currentGroupe !== "" ? (
                <div className="style-groupe-menu">
                  <p>{currentGroupe}</p>
                  <BiDownArrow />
                </div>
              ) : (
                <div className="style-groupe-menu">
                  <p>Select a group</p>
                  <BiArrowFromRight />
                </div>
              )}
            </div>
            <div className="select-group_select-menu_dropdown">
              <div>
                {showMenu &&
                  Object.keys(groupList).map((key, id) => (
                    <div
                      className="select-group_select-menu_option"
                      data-value={key}
                      onClick={selectHandler}
                      key={id}
                    >
                      {key}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {currentGroupe !== "" ? (
          <div className="block-q">
            <div className="question-creator_qzone">
              <h3>Question about:</h3>
              <h2> {currentGroupe || "Select a groupe"}</h2>
              <h3>question</h3>
              <input
                required
                placeholder="question"
                type="texte"
                value={question}
                name="question"
                onChange={inputHandler}
              />
              <h3>answer</h3>
              <input
                required
                placeholder="answer"
                type="texte"
                value={answer}
                name="answer"
                onChange={inputHandler}
              />
              <h3>hint</h3>
              <input
                placeholder="hint (optional)"
                type="texte"
                value={hint}
                name="hint"
                onChange={inputHandler}
              />
              <div className="question-creator_qzone_button-zone">
                <button className="subq-button" onClick={addQuestion}>
                  Add
                  <IoIosAddCircle color="white" />
                </button>
                <Link to="/pardonmyfrench/create-exo" className="cancel-button">
                  Quit
                  <MdOutlineBackspace />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="groupe-empty">
            <BsFillArrowUpCircleFill />
            <h2>Select or create a group please</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuestion;
