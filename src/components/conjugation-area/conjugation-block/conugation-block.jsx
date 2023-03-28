import ConjugationCard from "../conjugation-card/conjugation-card";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { useState } from "react";

const ConjugationBlock = ({ verb, tenses }) => {
  const [isShowConj, setShowConj] = useState(false);

  return (
    <div>
      <div onClick={() => setShowConj(!isShowConj)}>
        <h2>{verb}</h2>
        {isShowConj ? <BiUpArrow /> : <BiDownArrow />}
      </div>
      {isShowConj && (
        <div>
          {tenses.map((conjugation, index) => (
            <div>
              <h3>{conjugation.tense}</h3>
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
