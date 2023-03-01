import "./sign-up.scss";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { createUserMailnPass } from "../../../utils/firebase/firebase.utils";

const inputDefaultValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [inputValues, setInputValues] = useState(inputDefaultValues);

  const inputHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefaul();
    if (inputValues.password !== inputValues.confirmPassword) {
      alert("passwords do not match!");
      return;
    }
    try {
      const response = await createUserMailnPass(
        inputValues.email,
        inputValues.password
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="sign-up-main">
        <form onSubmit={handleSubmit} className="sign-up-main_form">
          <h2>Create your account</h2>
          <h3>Name</h3>
          <input
            type="text"
            placeholder="Name"
            name="displayName"
            value={inputValues.displayName}
            onChange={inputHandler}
          />
          <h3>Email</h3>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={inputValues.email}
            onChange={inputHandler}
          />
          <h3>Password</h3>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={inputValues.password}
            onChange={inputHandler}
          />
          <h3>Confirm password</h3>
          <input
            type="password"
            placeholder="password"
            name="confirmPassword"
            value={inputValues.confirmPassword}
            onChange={inputHandler}
          />
          <button type="submit" className="sign-up-main_form_connect-button">
            Create
          </button>
          {/* <button className="sign-up-main_form_google-button">
            connect with google
            <FcGoogle />
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
