import ConjugationCard from "../conjugation-card/conjugation-card";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { useState } from "react";

const ConjugationBlock = ({ conjugations, tense, verb }) => {
  const [isShowConj, setShowConj] = useState(false);

  return (
    <div>
      <div onClick={() => setShowConj(!isShowConj)}>
        <h2>{verb}</h2>
        {isShowConj ? <BiUpArrow /> : <BiDownArrow />}
      </div>
      {isShowConj && (
        <div>
          <h3>{tense}</h3>
          {tense && (
            <div>
              {conjugations.map((conjugation, index) => (
                <ConjugationCard key={index} answer={conjugation} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ConjugationBlock;
