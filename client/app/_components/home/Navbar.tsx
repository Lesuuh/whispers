import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-5 px-4 md:px-0">
        {/* Logo */}
        <Link href={"/"} className="cursor-pointer">
          {" "}
          <h3 className="text-2xl font-heading">Whispers</h3>
        </Link>

        {/* Menu */}
        <ul className="md:flex items-center gap-12">
          <Link href={"/feeds"}>
            <li>
              <p className="font-heading text-gray-600 hover:text-purple-600 transition-colors cursor-pointer">
                Feeds
              </p>
            </li>
          </Link>
          {/* <Link href={"/feeds"}>
            <li>
              <p className="font-heading text-gray-600 hover:text-purple-600 transition-colors cursor-pointer">
                Categories
              </p>
            </li>
          </Link> */}
        </ul>

        {/* Mobile Menu Button */}
        {/* <div className="md:hidden">
          <button className="text-gray-600 text-2xl hover:text-purple-600">
            ☰
          </button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
