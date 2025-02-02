import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/userReducer/userSlice";
import GoogleOAuth from "../components/GoogleOAuth";
import toast from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields."));
    }

    try {
      dispatch(signInStart());
      let data = await fetch("/api/auth/sign-up", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      data = await data.json();

      if (data.flag) {
        toast.success("Registered successfully");
        dispatch(signInSuccess(null));
        navigate("/sign-in");
      } else {
        toast.error(data.errorMessage);
        dispatch(signInFailure(data.errorMessage));
      }
    } catch (error) {
      toast.error(error.errorMessage);
      dispatch(signInFailure(error.errorMessage));
    }
  };

  return (
    <div className="min-h-screen mt-20 px-3 md:mt-40 md:px-0">
      <div className="flex mx-auto max-w-3xl flex-col md:flex-row gap-5 md:items-center">
        {/* left */}
        <div className="flex-1">
          <Link
            to="/"
            className="text-2xl md:text-4xl font-bold dark:text-white"
          >
            <span
              className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                 rounded-lg text-white"
            >
              Mukesh's
            </span>{" "}
            Blog
          </Link>
          <p className="mt-2 text-sm">
            A portal where you can create your own blog
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
            <div>
              <Label value="Username" className="text-slate-600" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Email" className="text-slate-600" />
              <TextInput
                type="email"
                placeholder="Email"
                value={formData.email}
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" className="text-slate-600" />
              <TextInput
                type="password"
                placeholder="Password"
                value={formData.password}
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-5">Loading...</span>
                </>
              ) : (
                "Sign up"
              )}
            </Button>
            <GoogleOAuth />
            <div className="flex justify-center gap-3">
              <span className="text-slate-600">Have an account? </span>
              <Link to="/sign-in" className="text-blue-500">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
