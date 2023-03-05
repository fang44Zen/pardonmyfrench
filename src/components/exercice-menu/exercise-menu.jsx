import "./exercise-menu.scss";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const ExoMenu = () => {
  return (
    <div>
      <h2 className="exo-title">Browse your exercises</h2>
      <div className="exercises-list-zone">
        <ul className="exercises-list-zone_list">
          <li>
            <Link to="list-questions" className="exo-link-active">
              <h3>My questions</h3> <BsArrowRightCircle color="#ffb84c" />
            </Link>
          </li>
          <li>
            <Link to="list-conjugaisons" className="exo-link-active">
              <h3>Conjugaisons </h3>
              <BsArrowRightCircle color="#ffb84c" />
            </Link>
          </li>
          <li>
            <Link to="/practice" className="exo-link-active">
              <h3>Practice</h3> <BsArrowRightCircle color="#ffb84c" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ExoMenu;
