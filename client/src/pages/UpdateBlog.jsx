import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    content: "",
    blogImage: "",
    category: "",
  });
  const [file, setFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [blogUpdateError, setBlogUpdateError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/getBlog/${blogId}`);
        const { flag, blog } = await res.json();
        if (flag) {
          setBlogFormData(blog);
        } else {
          console.log(error.errorMessage);
        }
      } catch (error) {
        console.log(error.errorMessage);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleChange = (e) => {
    setBlogFormData({ ...blogFormData, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setBlogFormData({ ...blogFormData, content: value });
  };

  const handleFileUpload = async () => {
    if (!file) {
      setFileUploadError("Please select an image");
      return;
    }

    setFileUploadError(null);

    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setFileUploadError("Image upload failed");
          setFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setBlogFormData({ ...blogFormData, blogImage: downloadURL });
            setFileUploadProgress(null);
            setFileUploadError(null);
          });
        }
      );
    } catch (error) {
      console.log(error);
      setFileUploadProgress(null);
      setFileUploadError("Image upload failed");
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      let data = await fetch(
        `/api/blog/updateBlog/${blogFormData._id}/${blogFormData.userId}`,
        {
          method: "put",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(blogFormData),
        }
      );
      data = await data.json();
      setLoading(false);

      if (data.flag) {
        console.log(data);
        navigate(`/blog/${data.updatedBlog.slug}`);
      } else {
        setBlogUpdateError(data.errorMessage);
      }
    } catch (error) {
      setLoading(false);
      setBlogUpdateError(error.errorMessage);
    }
  };

  return (
    <div className=" p-3 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl font-sembold my-8">Update Blog</h1>
      <form className="flex flex-col gap-4" onSubmit={handleBlogSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Enter title"
            required
            name="title"
            className="flex-1"
            value={blogFormData.title}
            onChange={handleChange}
          />
          <Select
            name="category"
            required
            onChange={handleChange}
            value={blogFormData.category}
          >
            <option value="uncatatorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="angular">Angular</option>
            <option value="next">Next</option>
          </Select>
        </div>
        <div className="p-3 flex gap-4 items-center justify-between border-4 border-dotted border-cyan-400">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            onClick={handleFileUpload}
            disabled={fileUploadProgress}
          >
            {fileUploadProgress ? (
              <div className="w-10 h-10">
                <CircularProgressbar
                  value={fileUploadProgress}
                  text={`${fileUploadProgress}%`}
                />
              </div>
            ) : (
              "Upload File"
            )}
          </Button>
        </div>
        {fileUploadError && <Alert color="failure">{fileUploadError}</Alert>}
        {blogFormData.blogImage && (
          <img
            src={blogFormData.blogImage}
            alt="image"
            className="w-full h-72"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write about the blog in brief here..."
          name="content"
          value={blogFormData.content}
          onChange={handleQuillChange}
          className="h-64 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          {loading ? (
            <>
              <Spinner size="sm" />
              <span className="ml-2">Loading...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
      {blogUpdateError && (
        <Alert color="failure" className="mt-4">
          {blogUpdateError}
        </Alert>
      )}
    </div>
  );
}

export default UpdateBlog;
