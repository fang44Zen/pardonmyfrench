import "./navbar.scss";
import mainlogo from "../../img/pencil-case.png";
import { NavLink, Outlet } from "react-router-dom";
import { Fragment } from "react";
import SignIn from "../../routes/sign-in/sign-in";
const Navbar = () => {
  return (
    <Fragment>
      <div className="navbar">
        <img src={mainlogo} alt="main-logo" />
        <ul className="navbar_links">
          <NavLink
            to="/"
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
            <li>Create Exercices</li>
          </NavLink>
          <NavLink
            to="exercices"
            className={({ isActive }) =>
              isActive ? "navbar-link-active" : "navbar-link-unactive"
            }
          >
            <li>Exercices</li>
          </NavLink>
        </ul>
        <button>My account</button>
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navbar;
