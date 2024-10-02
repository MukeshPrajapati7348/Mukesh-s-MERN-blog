import { Button } from "flowbite-react";
import React from "react";

function CallToAction() {
  return (
    <div className="p-3 flex flex-col sm:flex-row items-center justify-center border border-teal-500 rounded-tl-3xl rounded-br-3xl text-center">
      {/* left */}
      <div className="flex-1 flex justify-center flex-col">
        <h2 className="text-2xl">Want to learn more about Javascript?</h2>
        <p className="text-gray-500 my-2">
          Checkout resources by W3schools.com
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://www.w3schools.com/js/DEFAULT.asp"
            target="_blank"
            rel="noopener noreferrer"
          >
            W3schools.com
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://www.codecademy.com/resources/blog/wp-content/uploads/2022/12/what-is-javascript-used-for.png"
          alt="image"
        />
      </div>
    </div>
  );
}

export default CallToAction;
