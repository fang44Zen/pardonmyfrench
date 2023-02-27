import "./sign-in.scss";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const googleUserLog = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef.id);
  };

  return (
    <div>
      <h1>sign-in page</h1>
      <button onClick={googleUserLog}>log with google</button>
    </div>
  );
};

export default SignIn;
