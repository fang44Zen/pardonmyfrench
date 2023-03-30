import { useState } from "react";
import "./conjugation-card.scss";
import ConjInput from "./form-elem/conj-input";

const ConjugationCard = ({ answer }) => {
  const [inputValue, setInputValue] = useState({
    je: "",
    tu: "",
    il: "",
    nous: "",
    vous: "",
    ils: "",
  });

  const [results, setResults] = useState([]);
  const [showAnswer, setShowAnser] = useState(false);

  const handleInputChange = (inputId, value) => {
    setInputValue({ ...inputValue, [inputId]: value });
  };

  const handleCheckClick = () => {
    const newResults = [];
    Object.keys(inputValue).forEach((key, index) => {
      if (inputValue[key] === answer[key]) {
        newResults[index] = "correct";
      } else {
        newResults[index] = "incorrect";
      }
    });
    setResults(newResults);
    setShowAnser(true);
  };

  return (
    <div className="conjugation-card">
      <div className="conjugation-card_card">
        <div className="conjugation-card_card_form">
          <ConjInput
            inputId="je"
            pronoun="Je/j'"
            answer={answer.je}
            onInputChange={handleInputChange}
          />
          {showAnswer ? (
            results[0] === "correct" ? (
              <p>Correct answer !</p>
            ) : (
              <p>Wrong answer !</p>
            )
          ) : null}
          <ConjInput
            inputId="tu"
            pronoun="Tu"
            answer={answer.tu}
            onInputChange={handleInputChange}
          />
          {showAnswer ? (
            results[1] === "correct" ? (
              <p>Correct answer !</p>
            ) : (
              <p>Wrong answer !</p>
            )
          ) : null}
          <ConjInput
            inputId="il"
            pronoun="Il/Elle"
            answer={answer.il}
            onInputChange={handleInputChange}
          />
          {showAnswer ? (
            results[2] === "correct" ? (
              <p>Correct answer !</p>
            ) : (
              <p>Wrong answer !</p>
            )
          ) : null}
          <ConjInput
            inputId="nous"
            pronoun="nous"
            answer={answer.nous}
            onInputChange={handleInputChange}
          />
          {showAnswer ? (
            results[3] === "correct" ? (
              <p>Correct answer !</p>
            ) : (
              <p>Wrong answer !</p>
            )
          ) : null}
          <ConjInput
            inputId="vous"
            pronoun="vous"
            answer={answer.vous}
            onInputChange={handleInputChange}
          />
          {showAnswer ? (
            results[4] === "correct" ? (
              <p>Correct answer !</p>
            ) : (
              <p>Wrong answer !</p>
            )
          ) : null}
          <ConjInput
            inputId="ils"
            pronoun="Ils/Elles"
            answer={answer.ils}
            onInputChange={handleInputChange}
          />
          {showAnswer ? (
            results[5] === "correct" ? (
              <p>Correct answer !</p>
            ) : (
              <p>Wrong answer !</p>
            )
          ) : null}

          <div>
            <button onClick={handleCheckClick} className="check-button">
              Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConjugationCard;
