"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for menu

const navBarItems = [
  { name: "Book a Session", link: "booking" },
  { name: "Manage your Booking", link: "manage" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <nav className="bg-[var(--blue2)] p-4 items-center justify-between">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-[var(--text-dark)] text-xl font-bold hover:text-[var(--text-hover)] "
        >
          Booking System
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[var(--text-dark)] text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6">
          {navBarItems.map((item) => (
            <li key={item.link}>
              <Link
                href={`/${item.link.toLowerCase()}`}
                className="text-[var(--text-dark)] text-lg hover:text-[var(--text-hover)]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="lg:hidden flex flex-col items-center gap-3 bg-[var(--blue2)] pt-2">
          {navBarItems.map((item) => (
            <li key={item.link}>
              <Link
                href={`/${item.link.toLowerCase()}`}
                className="text-[var(--text-dark)] text-lg hover:text-[var(--text-hover)]"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
