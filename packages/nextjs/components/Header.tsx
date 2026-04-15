"use client";

import React, { useRef, useState } from "react";
import { RainbowKitCustomConnectButton } from "~~/components/helper";
import { useOutsideClick } from "~~/hooks/helper";
import Link from "next/link";
import { useAccount } from "wagmi";
import { usePathname } from "next/navigation";

export const Header = () => {
  const burgerMenuRef = useRef<HTMLDetailsElement>(null);
  useOutsideClick(burgerMenuRef, () => {
    burgerMenuRef?.current?.removeAttribute("open");
  });

  const { isConnected, address } = useAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Marketplace", href: "/marketplace", current: false },
    { name: "Orders", href: "/orders", current: false },
    { name: "Dashboard", href: "/dashboard", current: false },
  ];

  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="sticky lg:static top-0 navbar min-h-0 shrink-0 justify-between z-20 px-0 sm:px-2">
      {/* Logo */}
      <div className="navbar-start flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ZM</span>
          </div>
          <span className="text-xl font-bold text-gray-900">ZamaCare</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="navbar-center hidden md:flex space-x-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive(item.href)
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Hamburger Menu Button & Wallet */}
      <div className="navbar-end md:hidden flex items-center space-x-4">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg
              className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Close icon */}
            <svg
              className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-3 ">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-3 pr-4 py-2 text-base font-medium rounded-md ${isActive(item.href) ? "text-blue-700 bg-blue-50 border-l-4 border-blue-700" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 hover:border-l-4"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile User Menu (when connected) */}
            {isConnected && (
              <RainbowKitCustomConnectButton />
            )}
          </div>
        )}

      <div className="md:navbar-end grow mr-4 hidden">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
