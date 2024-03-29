import { useState } from "react";
import QuestionCard from "../question-card/question-card";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import "./quetion-block.scss";

const QuestionBlock = ({ questionList, titleGroupe }) => {
  const [isVisibleQuestion, setVisibleQuestion] = useState(false);

  const showQuestion = () => {
    setVisibleQuestion(!isVisibleQuestion);
  };

  return (
    <div>
      <div className="question-groupe">
        <div className="question-groupe_small-block">
          <div
            className="question-groupe_small-block_title"
            onClick={showQuestion}
          >
            <h2>{titleGroupe}</h2>
            <button onClick={showQuestion}>
              {isVisibleQuestion ? <BiUpArrow /> : <BiDownArrow />}
            </button>
          </div>
          <div>
            {isVisibleQuestion && (
              <div>
                {questionList[titleGroupe] &&
                questionList[titleGroupe].length > 0 ? (
                  questionList[titleGroupe].map((elem, id) => (
                    <div key={id}>
                      <QuestionCard
                        question={elem.question}
                        answer={elem.answer}
                        hint={elem.hint}
                      />
                    </div>
                  ))
                ) : (
                  <div>
                    <h2 className="error-message">Your groupe is empty!!</h2>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBlock;
