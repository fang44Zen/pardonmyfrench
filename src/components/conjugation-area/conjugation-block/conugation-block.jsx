import "./conjugation-block.scss";
import ConjugationCard from "../conjugation-card/conjugation-card";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { useState } from "react";

const ConjugationBlock = ({ verb, tenses }) => {
  const [isShowConj, setShowConj] = useState(false);

  return (
    <div className="conjugation-block">
      <div
        className="conjugation-block_title"
        onClick={() => setShowConj(!isShowConj)}
      >
        <h2>{verb}</h2>
        {isShowConj ? (
          <h2>
            <BiUpArrow />
          </h2>
        ) : (
          <h2>
            <BiDownArrow />
          </h2>
        )}
      </div>
      {isShowConj && (
        <div>
          {tenses.map((conjugation, index) => (
            <div>
              <h3 className="conjugation-block_tense">{conjugation.tense}:</h3>
              <ConjugationCard
                key={index}
                answer={conjugation.conjugations[0]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ConjugationBlock;
