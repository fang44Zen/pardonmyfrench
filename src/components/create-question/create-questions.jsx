import "./create-questions.scss";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";

const CreateQuestion = () => {
  const addQuestion = async () => {
    const questionsRef = doc(dataBase, "users", auth.currentUser.uid);
    await updateDoc(questionsRef, {
      questions: arrayUnion({
        question: "aller",
        answer: "peut-être",
        hint: "yes!",
      }),
    });
    console.log(auth.currentUser.uid);
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
    </div>
  );
};

export default CreateQuestion;
