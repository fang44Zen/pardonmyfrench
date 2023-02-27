import "./auth-menu.scss";
import SignIn from "./sign-in/sign-in";
import SignUp from "./sign-up/sign-up";

const AuthMenu = () => {
  return (
    <div>
      <div className="auth-bar">
        <h3>Sign In</h3>
        <h3>Sign Up</h3>
      </div>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default AuthMenu;
