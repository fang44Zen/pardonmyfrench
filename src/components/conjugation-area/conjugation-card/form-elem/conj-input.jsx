import { useState } from "react";
import "./conj-input.scss";

const ConjInput = ({ pronoun, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div>
      <div className="conj-input">
        <label>{pronoun}</label>
        <input />
        <button onClick={() => setShowAnswer(!showAnswer)}>?</button>
      </div>
      {showAnswer && <div>{answer}</div>}
    </div>
  );
};

export default ConjInput;
