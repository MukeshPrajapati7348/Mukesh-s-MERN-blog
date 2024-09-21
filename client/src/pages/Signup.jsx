import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are mandatory.");
    }
    setErrorMessage(null);

    try {
      setLoading(true);
      let response = await fetch("/api/auth/sign-up", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      response = await response.json();
      setLoading(false);

      if (response.flag) {
        navigate("/sign-in");
      } else {
        setErrorMessage(response.errorMessage);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(response.errorMessage);
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
            <div className="flex justify-center gap-3">
              <span className="text-slate-600">Have an account? </span>
              <Link to="/sign-in" className="text-blue-500">
                Sign in
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
