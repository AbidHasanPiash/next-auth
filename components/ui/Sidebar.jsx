"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import {HiFire, HiOutlineChevronDown} from 'react-icons/hi'
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
            <div className={`text-lg py-3 cursor-pointer ${isSubmenuActive ? "border-l-4 border-orange-400 px-2 bg-orange-500/20" : "px-3 hover:bg-gray-700"}`}>
              <div className="flex items-center justify-between">
                <span>{m.title}</span>
                <span className={`${isExpanded && "rotate-90"} transition duration-200`}>
                  <HiOutlineChevronDown />
                </span>
              </div>
            </div>
          </div>
          <ul className={`${isExpanded ? 'min-h-fit' : 'h-0'} bg-gray-900 overflow-hidden transition duration-200`} key={m.title}>
            {m.submenus.map((submenu, subIndex) => (
              <Link key={subIndex} href={submenu.link} onClick={closeSidebar}>
                <li
                  className={`text-sm py-2 px-6 ${pathname === submenu.link ? "font-bold text-orange-400 bg-orange-500/10" : "hover:bg-gray-700"}`}
                >
                  <span>{submenu.title}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      );
    }  else {
      return (
        <Link href={m.link} onClick={closeSidebar} key={m.title}>
          <div className={`text-lg py-3 ${pathname === m.link ? "border-l-4 border-orange-400 px-2 bg-orange-500/20" : "px-3 hover:bg-gray-700"}`}>
            <span>{m.title}</span>
          </div>
        </Link>
      );
    }
  };
  if (!pathname.includes('auth')) {
    return (
      <div
        className={`${ isSidebarOpen ? "w-[300px] translate-x-0" : "w-0 -translate-x-96" } 
        z-50 transition-all duration-200 flex flex-col justify-between
        absolute md:static h-screen bg-dark-component shadow-xl`}
      >
        <div className="px-2 py-6 flex items-center justify-between">
          <div className="flex items-center justify-start space-x-2">
            <h1 className="text-3xl font-bold text-primary"><HiFire/></h1>
            <h1 className="text-xl font-bold">{AppConfig.title}</h1>
          </div>
          <button onClick={closeSidebar} className="md:hidden flex items-center justify-center p-2 rounded-full">
            <BsArrowLeftCircle size={35} />
          </button>
        </div>
        <ul className="space-y-1 pb-4 h-full overflow-y-auto select-none">
          {menu.map((m) => (
            RenderMenu(m)
          ))}
        </ul>
      </div>
    );
  }
}
