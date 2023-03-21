import "./auth-menu.scss";
import { NavLink, Outlet } from "react-router-dom";

const AuthMenu = () => {
  return (
    <div>
      <div className="auth-bar">
        <div className="auth-bar_link">
          <NavLink
            className={({ isActive }) =>
              isActive ? "auth-bar_link-active" : "auth-bar_link-unactive"
            }
            to=""
            end
          >
            <h3>Sign In</h3>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "auth-bar_link-active" : "auth-bar_link-unactive"
            }
            to="signup"
          >
            <h3>Sign Up</h3>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthMenu;
