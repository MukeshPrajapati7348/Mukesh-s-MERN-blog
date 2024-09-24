import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePic}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-{lightgray"
          />
        </div>
        <div className="flex flex-col gap-4 my-6">
          <TextInput
            type="text"
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
          />
          <TextInput
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
          />
          <TextInput
            type="password"
            placeholder="password"
            defaultValue="******************"
          />
        </div>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
        <div className="text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
}

export default DashboardProfile;
