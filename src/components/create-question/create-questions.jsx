import "./create-questions.scss";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/UserContext";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineBackspace } from "react-icons/md";
import { useState, useCallback, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
const questionsDefaultValues = {
  question: "",
  answer: "",
  hint: "",
};

const CreateQuestion = () => {
  const [inputValues, setInputValue] = useState(questionsDefaultValues);
  const { question, answer, hint } = inputValues;
  const [groupeQuestion, setGroupeQuestion] = useState("");
  const [currentGroupe, setCurrentGroupe] = useState(
    "Please Select or add a groupe"
  );
  const { currentUser } = useContext(UserContext);

  const [groupList, setGroupList] = useState([]);

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
    const val = event.target.value;
    setCurrentGroupe(val);
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
      console.log(e);
    }
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
            <input
              placeholder="add group.."
              onChange={addGroupeHanlder}
              value={groupeQuestion}
            />
            <button onClick={addGroupeQuestion}>Add</button>
          </div>

          <select onChange={selectHandler} value={currentGroupe}>
            <option>{currentGroupe}</option>
            {Object.keys(groupList).map((key, id) => (
              <option key={id}>{key}</option>
            ))}
          </select>
        </div>
        <div className="block-q">
          <div className="question-creator_qzone">
            <h2>Question about:</h2>
            <h3> {currentGroupe}</h3>
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
              className=""
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
      </div>
    </div>
  );
};

export default CreateQuestion;
