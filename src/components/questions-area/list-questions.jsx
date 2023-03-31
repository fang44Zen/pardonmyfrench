import "./list-question.scss";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import { dataBase, auth } from "../../utils/firebase/firebase.utils";
import { HiOutlineSearchCircle } from "react-icons/hi";
import QuestionBlock from "./questions-block/question-block";
import { Link } from "react-router-dom";

const ListQuestion = () => {
  const [questionList, setQuestionList] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [inputSearchValue, setInputSearhValue] = useState("");

  const inputSearchHandler = (event) => {
    const text = event.target.value;
    setInputSearhValue(text);
  };

  const updateQuestionList = useCallback(async () => {
    if (currentUser) {
      try {
        const docRef = doc(dataBase, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setQuestionList(docSnap.data().questions);
      } catch (e) {
        console.log(e);
        console.log("ouin ouin!");
      }
    }
  }, [currentUser]);

  useEffect(() => {
    updateQuestionList();
  }, [updateQuestionList]);

  return (
    <div>
      {currentUser ? (
        <div>
          {questionList.length !== 0 ? (
            <div>
              <div className="question-search-bar">
                <input
                  placeholder="Search group"
                  onChange={inputSearchHandler}
                  value={inputSearchValue}
                />
                <div className="question-search-bar_search-icon">
                  <HiOutlineSearchCircle />
                </div>
              </div>

              {Object.keys(questionList)
                .filter((titleGroupe) => titleGroupe.includes(inputSearchValue))
                .map((titleGroupeFiltered, id) => (
                  <div key={id}>
                    <QuestionBlock
                      titleGroupe={titleGroupeFiltered}
                      questionList={questionList}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div className="list-empty-block">
              <p>
                You have no questions created please create your question on
                this page
              </p>
              <Link
                className="redirect-link"
                to="/pardonmyfrench/create-exo/questions-creator"
              >
                Create Questions
              </Link>
            </div>
          )}
        </div>
      ) : (
        <h1>Connect please</h1>
      )}
    </div>
  );
};

export default ListQuestion;
