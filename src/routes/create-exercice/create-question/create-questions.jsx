import "./create-questions.scss";
import { doc, updateDoc } from "firebase/firestore";
import { dataBase } from "../../../utils/firebase/firebase.utils";

const CreateQuestion = () => {
  const addQuestion = async () => {
    const question = doc(dataBase, "users", doc.id);
    // await updateDoc(question, {
    //   question: "oui",
    // });
    // console.log(question.users);
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
