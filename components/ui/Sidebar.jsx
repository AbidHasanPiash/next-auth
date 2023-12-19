"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import {HiFire, HiOutlineChevronDown, HiOutlineColorSwatch} from 'react-icons/hi'
import AppConfig from '@/config/app'
import MenuConfig from '@/config/menu'

export default function Sidebar() {
  const menu = MenuConfig;
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Use an object to store the expanded state for each menu item
  const [expandStates, setExpandStates] = useState({});
  
  // Function to check if the device is a mobile
  const isMobileDevice = () => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the width as needed
    return mediaQuery.matches;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    // Close the sidebar only if the device is a mobile
    if (isMobileDevice()) {
      setIsSidebarOpen(false);
    }
  };

  const RenderMenu = (m) => {
    if (m.submenus) {
      // Use the menu title as the key for expand state
      const isSubmenuActive = m.submenus.some((submenu) => pathname === submenu.link);
      const isExpanded = expandStates[m.title];

      return (
        <div key={m.title}>
          <div onClick={() => setExpandStates((prev) => ({ ...prev, [m.title]: !prev[m.title] }))}>
            <div className={`p-2 my-1 rounded-lg cursor-pointer ${isSubmenuActive ? "text-gray-200 bg-gray-700" : "hover:bg-gray-700"}`}>
              <div className="flex items-center justify-between">
                <p className="flex items-center justify-start space-x-2">
                  <span><HiOutlineColorSwatch /></span>
                  <span>{m.title}</span>
                </p>
                <span className={`${isExpanded && "rotate-90"} transition duration-200`}>
                  <HiOutlineChevronDown />
                </span>
              </div>
            </div>
          </div>
          <ul className={`${isExpanded ? 'min-h-fit' : 'h-0'} overflow-hidden transition duration-200`} key={m.title}>
            {m.submenus.map((submenu, subIndex) => (
              <Link key={subIndex} href={submenu.link} onClick={closeSidebar}>
                <li
                  className={`text-sm p-2 ${pathname === submenu.link ? "font-bold text-gray-200 bg-primary" : "hover:bg-gray-700"} rounded-lg my-1`}
                >
                  <p className="flex items-center justify-start space-x-2">
                    <span>o</span>
                    <span>{submenu.title}</span>
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      );
    }  else {
      return (
        <Link href={m.link} onClick={closeSidebar} key={m.title}>
          <div className={`p-2 my-1 rounded-lg ${pathname === m.link ? "font-bold text-gray-200 bg-primary" : "hover:bg-gray-700"}`}>
            <p className="flex items-center justify-start space-x-2">
              <span><HiOutlineColorSwatch /></span>
              <span>{m.title}</span>
            </p>
          </div>
        </Link>
      );
    }
  };
  if (!pathname.includes('auth')) {
    return (
      <div
        className={`${ isSidebarOpen ? "w-[300px] translate-x-0" : "w-0 -translate-x-96" } 
        z-50 p-4 transition-all duration-200 flex flex-col justify-between
        absolute md:static h-screen bg-dark-component shadow-xl`}
      >
        <div className="flex pb-4 items-center justify-between">
          <div className="flex items-center justify-start space-x-2">
            <h1 className="text-3xl font-bold text-primary"><HiFire/></h1>
            <h1 className="text-xl font-bold">{AppConfig.title}</h1>
          </div>
          <button onClick={closeSidebar} className="md:hidden flex items-center justify-center p-2 rounded-full">
            <BsArrowLeftCircle size={35} />
          </button>
        </div>
        <ul className="h-full overflow-y-auto select-none">
          {menu.map((m) => (
            RenderMenu(m)
          ))}
        </ul>
      </div>
    );
  }
}
