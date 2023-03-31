import { useState } from "react";
import ConjugationBlock from "./conjugation-block/conugation-block";
import { HiOutlineSearchCircle } from "react-icons/hi";
import "./display-conj-list.scss";

const DisplayConjList = ({ conjuList }) => {
  const [verbSearchInputValue, setVerbSearchInputValue] = useState("");
  const verbs = {};

  const verSearchInputHandler = (event) => {
    const text = event.target.value;
    setVerbSearchInputValue(text);
  };

  Object.keys(conjuList).forEach((verb) => {
    verbs[verb] = Object.keys(conjuList[verb]).map((tense) => ({
      verb: verb,
      tense: tense,
      conjugations: conjuList[verb][tense],
    }));
  });
  return (
    <div>
      <div className="verb-search-bar">
        <input
          placeholder="Search verb"
          onChange={verSearchInputHandler}
          value={verbSearchInputValue}
        />
        <div className="verb-search-bar_search-icon">
          <HiOutlineSearchCircle />
        </div>
      </div>

      {Object.keys(verbs)
        .filter((verb) => verb.includes(verbSearchInputValue))
        .map((filteredVerb, index) => (
          <div key={index}>
            <ConjugationBlock
              verb={filteredVerb}
              tenses={verbs[filteredVerb]}
            />
          </div>
        ))}
    </div>
  );
};

export default DisplayConjList;
