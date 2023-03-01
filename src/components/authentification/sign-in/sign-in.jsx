import "./sign-in.scss";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserMailnPass,
} from "../../../utils/firebase/firebase.utils";
import { useState } from "react";

const defaultInputValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [inputValues, setInputValues] = useState(defaultInputValues);
  const { email, password } = inputValues;

  const googleUserLog = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
    console.log(inputValues);
  };

  const handlerConnect = async (event) => {
    event.preventDefault();
    try {
      const response = await signInUserMailnPass(email, password);
      setInputValues(defaultInputValues);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password");
          break;
        case "auth/user-not-found":
          alert("incorrect email");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="sign-in-main">
        <div className="sign-in-main_form">
          <h2>Connect to your account</h2>
          <h3>Email</h3>
          <input
            required
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={inputHandler}
          />
          <h3>Password</h3>
          <input
            required
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={inputHandler}
          />
          <button
            className="sign-in-main_form_connect-button"
            onClick={handlerConnect}
          >
            Connect
          </button>
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
