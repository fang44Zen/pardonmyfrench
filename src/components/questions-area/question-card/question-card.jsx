import "./question-card.scss";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { MdHelpOutline } from "react-icons/md";
import { TfiFaceSad } from "react-icons/tfi";

import { useState } from "react";
const QuestionCard = ({ question, answer, hint }) => {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const hintHandler = () => {
    if (showHint) {
      setShowHint(false);
    } else {
      setShowHint(true);
    }
  };

  const answerHandler = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      setShowAnswer(false);
    }
  };

  return (
    <div className="question-card">
      <div className="question-card_card">
        <div>
          <h3 className="question-card_card_question">{question}</h3>
        </div>
        <div className="question-card_card_input">
          <input placeholder="Answer" />
        </div>
        <div className="question-card_card_button">
          <button
            className="question-card_card_button_hint"
            onClick={hintHandler}
          >
            <div>
              Hint <MdHelpOutline />
            </div>
          </button>

          <button className="question-card_card_button_check">
            <div>
              Check
              <AiOutlineCheckSquare />
            </div>
          </button>
          <button
            className="question-card_card_button_answer"
            onClick={answerHandler}
          >
            <div>
              Show answer <TfiFaceSad />
            </div>
          </button>
        </div>
        <div className="question-card_card_hidden">
          {showHint && <h3>{hint}</h3>}
          {showAnswer && <h3>{answer}</h3>}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;