import "./navbar.scss";
import mainlogo from "../../img/pencil-case.png";
import { NavLink, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navbar = () => {
  const { currentUser, setCurrentUser, setCurrentUserName } =
    useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
    setCurrentUserName("");
  };

  return (
    <Fragment>
      <div className="navbar">
        <img src={mainlogo} alt="main-logo" />
        <ul className="navbar_links">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              isActive ? "navbar-link-active" : "navbar-link-unactive"
            }
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            to="create-exo"
            className={({ isActive }) =>
              isActive ? "navbar-link-active" : "navbar-link-unactive"
            }
          >
            <li>Create Exercises</li>
          </NavLink>
          <NavLink
            to="exercices"
            className={({ isActive }) =>
              isActive ? "navbar-link-active" : "navbar-link-unactive"
            }
          >
            <li>Exercises</li>
          </NavLink>
        </ul>
        {currentUser ? (
          <div>
            <button onClick={signOutHandler} className="logout-button">
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to="login-page"
            className={({ isActive }) =>
              isActive ? "navbar-link-active" : "navbar-link-unactive"
            }
          >
            <p>My account</p>
          </NavLink>
        )}
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navbar;
