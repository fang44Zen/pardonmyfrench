import "./sign-in.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const googleUserLog = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>sign-in page</h1>
      <button onClick={googleUserLog}>log with google</button>
      <button>log with facebook</button>
    </div>
  );
};

export default SignIn;
