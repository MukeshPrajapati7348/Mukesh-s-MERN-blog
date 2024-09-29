import React, { useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreateBlog() {
  const [value, setValue] = useState("");
  return (
    <div className=" p-3 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl font-sembold my-8">Create Blog</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Enter title"
            required
            name="title"
            className="flex-1"
          />
          <Select name="category" required>
            <option value="uncatatorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="react">React</option>
            <option value="angular">Angular</option>
            <option value="next">Next</option>
          </Select>
        </div>
        <div className="p-3 flex gap-4 items-center justify-between border-4 border-dotted border-cyan-400">
          <FileInput type="file" accept="image/*" />
          <Button type="button" gradientDuoTone="purpleToBlue" outline>
            Upload File
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write here..."
          value={value}
          onChange={setValue}
          className="min-h-72 h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateBlog;
