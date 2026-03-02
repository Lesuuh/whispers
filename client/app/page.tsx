"use client";
import React, { useState } from "react";
import Home from "./home/HomeClient";
import Navbar from "./_components/home/Navbar";

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Navbar setIsOpen={setIsOpen} />
      <Home isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Page;
