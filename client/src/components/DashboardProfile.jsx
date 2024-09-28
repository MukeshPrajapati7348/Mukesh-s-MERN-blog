import { Alert, Button, TextInput, Spinner, Modal } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  SignoutUserSuccess,
} from "../redux/userReducer/userSlice.js";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [userDetails, setUserDetails] = useState({
    username: currentUser.username,
    email: currentUser.email,
    profilePic: currentUser.profilePic,
  });
  const [userImageFile, setUserImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(null);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(null);
  const [userUpdateNoChange, setUserUpdateNoChange] = useState(null);
  const [userImageURL, setUserImageURL] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const fileRef = useRef();
  const dispatch = useDispatch();

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
    setImageUploading("Please wait until image upload completed");
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
        setImageUploading(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUserImageURL(downloadURL);
          setUserDetails({ ...userDetails, profilePic: downloadURL });
          setUserImageFile(null);
          setImageUploading(null);
        });
      }
    );
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const checkUserDetailsChange = () => {
    if (
      userDetails.username === currentUser.username &&
      userDetails.email === currentUser.email &&
      (!userDetails.password || !userDetails.password.trim()) &&
      userDetails.profilePic === currentUser.profilePic
    ) {
      return false;
    }
    return true;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUserUpdateSuccess(null);
    setUserUpdateNoChange(null);

    if (!checkUserDetailsChange()) {
      setUserUpdateNoChange("No changes to update");
      return;
    }
    dispatch(updateUserStart());

    try {
      let data = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "put",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...userDetails,
        }),
      });

      data = await data.json();

      if (data.flag) {
        setUserUpdateSuccess("User updated successfully");
        dispatch(updateUserSuccess(data.userDetails));
      } else {
        dispatch(updateUserFailure(data.errorMessage));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.errorMessage));
    }
  };

  const handleAccountDelete = async () => {
    setOpenModal(false);
    dispatch(deleteUserStart());

    try {
      let data = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "delete",
      });

      data = await data.json();

      if (data.flag) {
        dispatch(deleteUserSuccess());
        navigate("/sign-in");
      } else {
        dispatch(deleteUserFailure(data.errorMessage));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.errorMessage));
    }
  };

  const handleUserSignout = async () => {
    try {
      let data = await fetch("/api/user/signout", {
        method: "post",
      });

      data = await data.json();

      if (data.flag) {
        dispatch(SignoutUserSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col mb-2" onSubmit={handleProfileUpdate}>
        <input
          type="file"
          accept="/image/*"
          className="hidden"
          onChange={handleImageUpdate}
          ref={fileRef}
        />
        <div
          className={`relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ${
            fileUploadProgress && fileUploadProgress < 100 && "opacity-50"
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
            name="username"
            defaultValue={userDetails.username}
            onChange={handleInputChange}
          />
          <TextInput
            type="email"
            placeholder="email"
            name="email"
            defaultValue={userDetails.email}
            onChange={handleInputChange}
          />
          <TextInput
            type="password"
            placeholder="password"
            name="password"
            defaultValue=""
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="pl-5">Loading...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
        <div className="text-red-500 flex justify-between mt-5">
          <span className="cursor-pointer" onClick={() => setOpenModal(true)}>
            Delete Account
          </span>
          <span className="cursor-pointer" onClick={handleUserSignout}>
            Sign Out
          </span>
        </div>
      </form>
      {errorMessage && (
        <Alert color="failure" className="mb-1">
          {errorMessage}
        </Alert>
      )}
      {userUpdateSuccess && <Alert color="success">{userUpdateSuccess}</Alert>}
      {userUpdateNoChange && (
        <Alert color="failure">{userUpdateNoChange}</Alert>
      )}
      {imageUploading && <Alert color="failure">{imageUploading}</Alert>}

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleAccountDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashboardProfile;
