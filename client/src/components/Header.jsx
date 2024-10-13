import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { SignoutUserSuccess } from "../redux/userReducer/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const URLParams = new URLSearchParams(location.search);
    const searchVal = URLParams.get("searchText");
    if (searchVal) {
      setSearchText(searchVal);
    }
  }, [location.search]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const URLParams = new URLSearchParams(location.search);
    URLParams.set("searchText", searchText);
    const searchString = URLParams.toString();
    navigate(`search?${searchString}`);
  };

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

      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search here..."
          rightIcon={AiOutlineSearch}
          className="hidden sm:inline"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      {/* <Button className="w-12 h-10 lg:hidden" color="gray">
        <AiOutlineSearch />
      </Button> */}

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10"
          color="gray"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}{" "}
        </Button>
        {!currentUser ? (
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
        ) : (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" rounded img={currentUser.profilePic} />}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {currentUser.isAdmin && (
              <Link to="/dashboard">
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
            )}
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleUserSignout}>Sign out</Dropdown.Item>
          </Dropdown>
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
