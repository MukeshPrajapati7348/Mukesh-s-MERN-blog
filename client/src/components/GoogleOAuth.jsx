import React from "react";
import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/userReducer/userSlice";
import { useNavigate } from "react-router-dom";

function GoogleOAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const googleResult = await signInWithPopup(auth, provider);

      let data = await fetch("/api/auth/google", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: googleResult.user.displayName,
          email: googleResult.user.email,
          photoURL: googleResult.user.photoURL,
        }),
      });
      data = await data.json();

      console.log(data);
      if (data.flag) {
        dispatch(signInSuccess(data.brandingDetails));
        navigate("/");
      } else {
        dispatch(signInFailure(data.errorMessage));
      }
    } catch (error) {
      dispatch(signInFailure(error.errorMessage));
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="purpleToBlue"
      outline
      onClick={handleGoogleSubmit}
    >
      <FcGoogle className="w-5 h-5 mr-2" />
      Continue with Google
    </Button>
  );
}

export default GoogleOAuth;
