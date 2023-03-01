import "./sign-in.scss";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../../utils/firebase/firebase.utils";

const SignIn = () => {
  const googleUserLog = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  return (
    <div>
      <div className="sign-in-main">
        <div className="sign-in-main_form">
          <h2>Connect to your account</h2>
          <h3>Email</h3>
          <input type="email" placeholder="email" />
          <h3>Password</h3>
          <input type="password" placeholder="password" />
          <button className="sign-in-main_form_connect-button">Connect</button>
          <button
            className="sign-in-main_form_google-button"
            onClick={googleUserLog}
          >
            connect with google
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
