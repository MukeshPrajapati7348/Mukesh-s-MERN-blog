import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [userImageFile, setUserImageFile] = useState(null);
  const [userImageURL, setUserImageURL] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const fileRef = useRef();

  const handleImageUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImageFile(file);
      setUserImageURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (userImageFile) {
      uploadImage();
    }
  }, [userImageFile]);

  const uploadImage = () => {
    // rules_version = '2';
    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }

    setFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + userImageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, userImageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setFileUploadProgress(null);
        setFileUploadError("Could not upload the image (size can be max 2MB)");
        setUserImageFile(null);
        setUserImageURL(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUserImageURL(downloadURL);
          setUserImageFile(null);
        });
      }
    );
  };

  const handleProfileUpdate = () => {};

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col" onSubmit={handleProfileUpdate}>
        <input
          type="file"
          accept="/image/*"
          className="hidden"
          onChange={handleImageUpdate}
          ref={fileRef}
        />
        <div
          className={`relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ${
            fileUploadProgress && fileUploadProgress < 100 && "opacity-60"
          }`}
          onClick={() => fileRef.current.click()}
        >
          {fileUploadProgress && (
            <CircularProgressbar
              value={fileUploadProgress}
              text={`${fileUploadProgress}%`}
              strokeWidth="5"
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${fileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={userImageURL || currentUser.profilePic}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-{lightgray"
          />
        </div>
        <div className="flex flex-col gap-4 my-6">
          {fileUploadError && <Alert color="failure">{fileUploadError}</Alert>}
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
