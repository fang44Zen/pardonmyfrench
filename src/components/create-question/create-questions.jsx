import "./create-questions.scss";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import { IoIosAddCircle } from "react-icons/io";
import { useState } from "react";

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
    const questionsRef = doc(dataBase, "users", auth.currentUser.uid);
    await updateDoc(questionsRef, {
      questions: arrayUnion({
        question: question,
        answer: answer,
        hint: hint,
      }),
    });
    setInputValue(questionsDefaultValues);
  };

  return (
    <div>
      <div className="question-creator">
        <div className="question-creator_qzone">
          <h2>Create your question</h2>
          <h3>question</h3>
          <input
            placeholder="question"
            type="texte"
            value={question}
            name="question"
            onChange={inputHandler}
          />
          <h3>answer</h3>
          <input
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
          <button className="subQuestion" onClick={addQuestion}>
            Add
            <IoIosAddCircle color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
