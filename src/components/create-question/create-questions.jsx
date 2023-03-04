import "./create-questions.scss";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const CreateQuestion = () => {
  const { currentUser } = useContext(UserContext);

  const addQuestion = async () => {
    const questionsRef = doc(dataBase, "users", auth.currentUser.uid);
    await updateDoc(questionsRef, {
      questions: arrayUnion({
        question: "aller",
        answer: "peut-être",
        hint: "yes!",
      }),
    });
  };

  const questionHandler = async () => {
    const docRef = doc(dataBase, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
  };

  return (
    <div>
      <h1>Question creator</h1>
      <label>question</label>
      <input type="texte" />
      <label>answer</label>
      <input type="texte" />
      <label>hint</label>
      <input type="texte" />
      <button onClick={addQuestion}>Send</button>
      <button onClick={questionHandler}>show questions</button>
    </div>
  );
};

export default CreateQuestion;
