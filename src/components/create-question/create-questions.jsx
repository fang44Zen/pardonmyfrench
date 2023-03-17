import "./create-questions.scss";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineBackspace } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

const questionsDefaultValues = {
  question: "",
  answer: "",
  hint: "",
};

const CreateQuestion = () => {
  const [inputValues, setInputValue] = useState(questionsDefaultValues);
  const { question, answer, hint } = inputValues;

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  };

  const addQuestion = async () => {
    if (question !== "" && answer !== "") {
      const questionsRef = doc(dataBase, "users", auth.currentUser.uid);
      await updateDoc(questionsRef, {
        questions: arrayUnion({
          question: question,
          answer: answer,
          hint: hint,
        }),
      });
      console.log("click");
      setInputValue(questionsDefaultValues);
    }
  };

  return (
    <div>
      <div className="question-creator">
        <div className="question-creator_qzone">
          <h2>Create your question</h2>
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
  );
};

export default CreateQuestion;
