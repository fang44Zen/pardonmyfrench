import "./sign-in.scss";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithGooglePopup,
  signInUserMailnPass,
  dataBase,
} from "../../../utils/firebase/firebase.utils";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const defaultInputValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [inputValues, setInputValues] = useState(defaultInputValues);
  const { email, password } = inputValues;
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const redirectHomePage = () => {
    navigate("/");
  };

  const googleUserLog = async () => {
    await signInWithGooglePopup();
    const userNameRef = doc(dataBase, "users", currentUser.uid);
    let userNameSnapshot;
    while (!userNameSnapshot) {
      userNameSnapshot = await getDoc(userNameRef);
      if (userNameSnapshot.exists) {
        redirectHomePage();
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handlerConnect = async (event) => {
    event.preventDefault();
    try {
      await signInUserMailnPass(email, password);
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
