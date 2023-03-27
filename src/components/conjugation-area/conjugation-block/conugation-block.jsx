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
          {Object.keys(conjugations).map((pronoun, index) => (
            <div key={index}>
              <h3>{tense}</h3>
              <ConjugationCard answer={conjugations[pronoun]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ConjugationBlock;
