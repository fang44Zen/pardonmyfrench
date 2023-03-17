import "./list-question.scss";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import QuestionCard from "./question-card/question-card";

const ListQuestion = () => {
  const [questionList, setQuestionList] = useState([]);
  const { currentUser } = useContext(UserContext);

  const updateQuestionList = useCallback(async () => {
    if (currentUser) {
      const docRef = doc(dataBase, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      setQuestionList(docSnap.data().questions);
    }
  }, [currentUser]);

  useEffect(() => {
    updateQuestionList();
  }, [updateQuestionList]);

  return (
    <div>
      {currentUser ? (
        <div>
          {questionList.map((elem, id) => (
            <QuestionCard
              key={id}
              question={elem.question}
              answer={elem.answer}
              hint={elem.hint}
            />
          ))}
        </div>
      ) : (
        <h1>Connect please</h1>
      )}
    </div>
  );
};

export default ListQuestion;
