import { useState } from "react";
import "./conj-input.scss";

const ConjInput = ({ pronoun, answer, onInputChange, inputId }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleInputChange = (event) => {
    onInputChange(inputId, event.target.value);
  };

  return (
    <div>
      <div className="conj-input">
        <label>{pronoun}</label>
        <input onChange={handleInputChange} />
        <button onClick={() => setShowAnswer(!showAnswer)}>?</button>
      </div>
      {showAnswer && <div>{answer}</div>}
    </div>
  );
};

export default ConjInput;
