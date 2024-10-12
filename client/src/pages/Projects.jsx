import React from "react";

export default function Projects() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl flex flex-wrap justify-center gap-10">
        <div className="w-96 border border-teal-500 hover:border-2 p-5 rounded-md flex flex-col gap-4 hover:scale-110 transition-all duration-300">
          <h1 className="text-2xl">
            ListLogic{" "}
            <a
              href="https://github.com/MukeshPrajapati7348/Daily-Task-Manager"
              rel="noopener noreferrer"
              target="_blank"
              className="ml-2 text-xs hover:underline text-teal-500"
            >
              github{" "}
            </a>
          </h1>
          <p className="text-gray-500">
            A To-Do Application helps users manage and organize tasks
            efficiently by allowing them to create, prioritize, and track tasks.
            It enhances productivity through features like task categorization,
            reminders, and syncing, making it ideal for personal and
            professional use.
          </p>
        </div>
        <div className="w-96 border border-teal-500 hover:border-2 p-5 rounded-md flex flex-col gap-4 hover:scale-110 transition-all duration-300">
          <h1 className="text-2xl">
            ClearSkies{" "}
            <a
              href="https://github.com/MukeshPrajapati7348/My-weather-app"
              rel="noopener noreferrer"
              target="_blank"
              className="ml-2 text-xs hover:underline text-teal-500"
            >
              github{" "}
            </a>
          </h1>
          <p className="text-gray-500">
            A Weather Web Application provides real-time weather updates,
            forecasts and typically displays current weather conditions,
            short-term and long-term forecasts.
            {/* , allowing users to stay informed about
          conditions. With features like hourly updates and interactive maps, it
          helps users plan activities and stay prepared for weather changes. */}
          </p>
        </div>
        <div className="w-96 border border-teal-500 hover:border-2 p-5 rounded-md flex flex-col gap-4 hover:scale-110 transition-all duration-300">
          <h1 className="text-2xl">
            Portfolio{" "}
            <a
              href="https://github.com/MukeshPrajapati7348/My-New-Portfolio-"
              rel="noopener noreferrer"
              target="_blank"
              className="ml-2 text-xs hover:underline text-teal-500"
            >
              github{" "}
            </a>
          </h1>
          <p className="text-gray-500">
            A Portfolio Web Application showcases my professional work, skills,
            and achievements in a visually appealing and interactive format. It
            typically includes sections for personal information, project
            highlights, work experience, technical skills, and contact details.
          </p>
        </div>
      </div>
    </div>
  );
}
