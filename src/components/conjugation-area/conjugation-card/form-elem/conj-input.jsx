import { useState } from "react";
import "./conj-input.scss";

const ConjInput = ({ pronoun, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputHandler = (event) => {
    const text = event.target.value;
    setInputValue(text);
  };

  return (
    <div>
      <div className="conj-input">
        <label>{pronoun}</label>
        <input onChange={inputHandler} value={inputValue} />
        <button onClick={() => setShowAnswer(!showAnswer)}>?</button>
      </div>
      {showAnswer && <div>{answer}</div>}
    </div>
  );
};

export default ConjInput;
