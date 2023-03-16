import "./list-question.scss";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";

const ListQuestion = () => {
  const [questionList, setQuestionList] = useState([]);

  const updateQuestionList = async () => {
    const docRef = doc(dataBase, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    setQuestionList(docSnap.data().questions);
    console.log(questionList);
  };

  useEffect(() => {
    updateQuestionList();
  }, []);

  return (
    <div>
      {auth ? (
        <div>
          {questionList.map((elem) => (
            <li>{elem.question}</li>
          ))}
        </div>
      ) : (
        <h1>Connect please</h1>
      )}
    </div>
  );
};

export default ListQuestion;
