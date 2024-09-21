import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm md:text-xl font-semibold dark:text-white"
      >
        <span
          className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                 rounded-lg text-white"
        >
          Mukesh's
        </span>{" "}
        Blog
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="Search here..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray">
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray">
          <FaMoon />
        </Button>
        {!currentUser && (
          <>
            <Link to="/sign-in">
              <Button
                gradientDuoTone="purpleToBlue"
                outline
                className="text-lg"
              >
                Sign in
              </Button>
            </Link>
            <Link to="/sign-up" className="text-lg">
              <Button
                gradientDuoTone="purpleToPink"
                outline
                className="text-lg"
              >
                Sign up
              </Button>
            </Link>
          </>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className="text-lg">
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about" className="text-lg">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects" className="text-lg">
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
