import ConjugationBlock from "./conjugation-block/conugation-block";

const DisplayConjList = ({ conjuList }) => {
  const verbs = {};

  Object.keys(conjuList).forEach((verb) => {
    verbs[verb] = Object.keys(conjuList[verb]).map((tense) => ({
      verb: verb,
      tense: tense,
      conjugations: conjuList[verb][tense],
    }));
  });

  console.log(verbs);

  return (
    <div>
      {Object.keys(verbs).map((verb, index) => (
        <div key={index}>
          <ConjugationBlock verb={verb} tenses={verbs[verb]} />
        </div>
      ))}
    </div>
  );
};

export default DisplayConjList;
