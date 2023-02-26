import "./sign-in.scss";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
const SignIn = () => {
  const googleUserLog = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  return (
    <div>
      <h1>sign-in page</h1>
      <button>log with google</button>
      <button>log with facebook</button>
    </div>
  );
};

export default SignIn;
