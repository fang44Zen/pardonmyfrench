import "./sign-up.scss";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import {
  createUserMailnPass,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../../utils/firebase/firebase.utils";
import { updateProfile } from "firebase/auth";

const inputDefaultValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [inputValues, setInputValues] = useState(inputDefaultValues);
  const { displayName, email, password, confirmPassword } = inputValues;
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const redirectHomePage = () => {
    navigate("/pardonmyfrench");
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const googleUserLog = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
    setCurrentUser(user);
    redirectHomePage();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match!");
      return;
    }
    try {
      const { user } = await createUserMailnPass(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      await updateProfile(user, { displayName: displayName });
      setInputValues(inputDefaultValues);
      redirectHomePage();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already used");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="sign-up-main">
        <div className="sign-up-main_form">
          <h2>Create your account</h2>
          <h3>Name</h3>
          <input
            type="text"
            placeholder="Name"
            name="displayName"
            value={displayName}
            onChange={inputHandler}
          />
          <h3>Email</h3>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={inputHandler}
          />
          <h3>Password</h3>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={inputHandler}
          />
          <h3>Confirm password</h3>
          <input
            type="password"
            placeholder="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={inputHandler}
          />
          <button
            onClick={handleSubmit}
            className="sign-up-main_form_connect-button"
          >
            Create
          </button>
          <button
            onClick={googleUserLog}
            className="sign-up-main_form_google-button"
          >
            connect with google
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
