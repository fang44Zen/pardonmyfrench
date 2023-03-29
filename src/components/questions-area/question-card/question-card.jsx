import "./question-card.scss";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { MdHelpOutline } from "react-icons/md";
import { TfiFaceSad } from "react-icons/tfi";

import { useState } from "react";
const QuestionCard = ({ question, answer, hint }) => {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answerInput, setAnswerInput] = useState("");
  const [goodAnswer, setGoodAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);

  const inputHandler = (event) => {
    const text = event.target.value;
    setAnswerInput(text);
  };

  const answersHandler = () => {
    if (answerInput === answer) {
      setGoodAnswer(true);
      setTimeout(() => {
        setGoodAnswer(false);
      }, 4000);
    } else {
      setWrongAnswer(true);
      setTimeout(() => {
        setWrongAnswer(false);
      }, 4000);
    }
  };

  const hintHandler = () => {
    setShowHint(!showHint);
    if (showAnswer) {
      setShowAnswer(false);
    }
  };

  const answerHandler = () => {
    setShowAnswer(!showAnswer);
    if (showHint) {
      setShowHint(false);
    }
  };

  return (
    <div className="question-card">
      <div className="question-card_card">
        <div>
          <h3 className="question-card_card_question">{question}</h3>
        </div>
        <div className="question-card_card_input">
          <input onChange={inputHandler} placeholder="Answer" />
        </div>
        <div className="question-card_card_button">
          {hint === "" ? (
            <button className="disabled-button">
              <div>
                Hint <MdHelpOutline />
              </div>
            </button>
          ) : (
            <button
              className="question-card_card_button_hint"
              onClick={hintHandler}
            >
              <div>
                Hint <MdHelpOutline />
              </div>
            </button>
          )}

          <button
            className="question-card_card_button_answer"
            onClick={answerHandler}
          >
            <div>
              Show answer <TfiFaceSad />
            </div>
          </button>
          <button
            onClick={answersHandler}
            className="question-card_card_button_check"
          >
            <div>
              Check
              <AiOutlineCheckSquare />
            </div>
          </button>
        </div>
        {goodAnswer && (
          <h4 className="good-answer animate__animated animate__pulse animate__infinite">
            Good answer!
          </h4>
        )}
        {wrongAnswer && (
          <h4 className="wrong-answer shake-button">Wrong answer!</h4>
        )}
        <div className="question-card_card_hidden">
          <div
            className={
              showHint ? "question-card_card_hidden_hint" : "hide-cotent"
            }
          >
            {showHint && <h3>{hint}</h3>}
          </div>
          <div
            className={
              showAnswer ? "question-card_card_hidden_answer" : "hide-cotent"
            }
          >
            {showAnswer && <h3>{answer}</h3>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
