import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsInstagram, BsTwitterX, BsGithub, BsLinkedin } from "react-icons/bs";

export default function FooterComp() {
  return (
    <Footer container className="border border-t-8 border-purple-500">
      <div className="w-full max-w-8xl mx-auto">
        <div className="w-full justify-between flex">
          <div>
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold dark:text-white"
            >
              <span
                className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                 rounded-lg text-white"
              >
                Mukesh's
              </span>{" "}
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6 mt-4">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://localhost:5173"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CodeWithMukesh.com
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mukesh'Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow me" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.linkedin.com/in/mukeshsprajapati/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/MukeshPrajapati7348"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://x.com/MukeshP10524955"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Footer.Link>
                <Footer.Link
                  href="https://www.instagram.com/immukeshprajapati/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Mukesh's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsLinkedin} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitterX} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
