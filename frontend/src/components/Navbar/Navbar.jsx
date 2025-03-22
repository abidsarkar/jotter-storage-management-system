import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-center">
        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/folder"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Folder
            </Link>
          </li>
          <li>
            <Link
              to="/favourite"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Favourite
            </Link>
          </li>
          <li>
            <Link
              to="/calendar-search"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Calendar Search
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-white hover:text-blue-200 transition duration-300"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;