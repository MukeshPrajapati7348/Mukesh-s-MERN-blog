import React, { useState } from "react";
import { json, Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function Signin() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("All fields are mandatory");
      return;
    }

    try {
      let response = await fetch("/api/auth/sign-in", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      response = response.json();
      console.log(formData);
    } catch (error) {
      console.log(error);
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

            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign in
            </Button>
            <div className="flex justify-center gap-3">
              <span className="text-slate-600">Don't have an account? </span>
              <Link to="/sign-up" className="text-blue-500">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
