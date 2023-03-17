import "./navbar.scss";
import mainlogo from "../../img/pencil-case.png";
import { NavLink, Outlet } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "../../context/UserContext";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navbar = () => {
  const { currentUser, setCurrentUser, setCurrentUserName } =
    useContext(UserContext);
  const [menuVisivle, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisivle);
  };

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
    setCurrentUserName("");
    toggleMenu();
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
        </ul>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <GiHamburgerMenu />
        </div>
        {menuVisivle && (
          <ul className="mobile-navbar-links">
            <li>
              <NavLink
                onClick={toggleMenu}
                to=""
                end
                className={({ isActive }) =>
                  isActive ? "navbar-link-active" : "navbar-link-unactive"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleMenu}
                to="create-exo"
                className={({ isActive }) =>
                  isActive ? "navbar-link-active" : "navbar-link-unactive"
                }
              >
                Create Exercises
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleMenu}
                to="exercices"
                className={({ isActive }) =>
                  isActive ? "navbar-link-active" : "navbar-link-unactive"
                }
              >
                Exercises
              </NavLink>
            </li>

            {currentUser ? (
              <div>
                <button onClick={signOutHandler} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                onClick={toggleMenu}
                to="login-page"
                className={({ isActive }) =>
                  isActive ? "navbar-link-active" : "navbar-link-unactive"
                }
              >
                <p>Log in</p>
              </NavLink>
            )}
          </ul>
        )}
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navbar;
