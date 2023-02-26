import "./create-exercice.scss";
import { Link } from "react-router-dom";
const CreateExo = () => {
  return (
    <div className="main-create-exo">
      <h1>What type of exercice you want?</h1>
      <div className="exotocreate">
        <ul className="exotocreate_list-exo">
          <li>
            <Link className="exotocreate_list-exo-link">
              <h3>Create questions</h3>
              <span class="material-symbols-outlined">arrow_forward_ios</span>
            </Link>
          </li>
          <p>
            Type in the first form the question, and then the answer expected.
          </p>
          <li>
            <Link className="exotocreate_list-exo-link">
              <h3>Create conjugation</h3>
              <span class="material-symbols-outlined">arrow_forward_ios</span>
            </Link>
          </li>
          <p>
            Type the infinitive verb you want, and the answers in the next form
            <br />
            (the pronounces are already added)
          </p>
          <li>
            <Link className="exotocreate_list-exo-link">
              <h3>Practice pronunciation</h3>
              <span class="material-symbols-outlined">arrow_forward_ios</span>
            </Link>
          </li>
          <p>
            Adding some texts or complicated words that you can save and practif
            in oral
          </p>
        </ul>
      </div>
    </div>
  );
};

export default CreateExo;
