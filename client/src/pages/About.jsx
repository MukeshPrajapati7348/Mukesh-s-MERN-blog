import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-2xl p-5 m-2 border border-teal-500 rounded-md rounded-tl-3xl rounded-br-3xl">
        <h1 className="text-3xl font-semibold my-2">About Mukesh's Blog</h1>
        <div className="text-gray-500 flex flex-col gap-6 text-md">
          <p>
            This blog application was created by Mukesh Prajapati as a personal
            project to showcase his web development skills.
          </p>
          <p>
            He is a passionate full-stack developer, he brings expertise in both
            front-end and back-end technologies, enabling to build complete and
            scalable web applications. His passion for programming languages and
            technology trends reflects in his blog content, where he shares
            insightful knowledge, tips, and tutorials of the developers.
          </p>
          <p>
            He documents a blog about personal or professional projects,
            explaining the stack used (e.g., MongoDB, Express, React, Node.js
            (MERN)). Include code snippets, challenges faced, and solutions
            implemented.
          </p>
          <p>
            Whether it's exploring the latest advancements in JavaScript
            frameworks, cloud computing, or AI integration, his ability to break
            down complex topics into digestible content helps fellow developers
            stay informed and improve their skills.
          </p>
          <p>
            He focuses on creating in-depth articles or tutorials on both
            established and emerging technologies. For example, a series on best
            practices for Angular or React or Node.js or Sprint boot, Java, or
            guides on microservices architecture can position you as an expert.
          </p>
        </div>
      </div>
    </div>
  );
}
