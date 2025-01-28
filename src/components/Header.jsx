import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">ProjectSim Free</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
