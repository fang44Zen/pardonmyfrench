import "./sign-up.scss";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  return (
    <div>
      <div className="sign-up-main">
        <div className="sign-up-main_form">
          <h2>Create your account</h2>
          <h3>Email</h3>
          <input type="email" placeholder="email" />
          <h3>Password</h3>
          <input type="password" placeholder="password" />
          <h3>Confirm password</h3>
          <input type="password" placeholder="password" />
          <button className="sign-up-main_form_connect-button">Create</button>
          <button className="sign-up-main_form_google-button">
            connect with google
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
