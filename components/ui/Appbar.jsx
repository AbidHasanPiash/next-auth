'use client'
import Image from 'next/image';
import React, { useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Dropdown from './Dropdown';

export default function AppBar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAction = async (action) => {
      setIsDropdownOpen(false);
  
      if (action === 'signOut') {
        await signOut();
      } else {
        // Handle other actions as needed
        console.log(action);
      }
    };
  
    const options = [
      { label: 'Option 1', action: 'option1' },
      { label: 'Option 2', action: 'option2' },
      { label: 'Sign Out', action: 'signOut' },
      // Add more options as needed
    ];

    if (!pathname.includes('auth') && session) {
    return (
        <div className='sticky top-0 pb-4'>
            <div className='w-full h-4 backdrop-blur'/>
            <div className='p-4 flex items-center justify-between rounded-lg bg-dark-component'>
                <div>
                    search
                </div>
                <div>
                    {/* <h1>{session.user.name}</h1> */}
                    <Image 
                        src={session?.user?.image || '/images/avatars/1.png'} 
                        width={30} 
                        height={30} 
                        alt={session?.user?.name}
                        className="rounded-full ring cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      />
                      <Dropdown
                        isOpen={isDropdownOpen}
                        onClose={handleAction}
                        options={options}
                        user={session.user}
                        position="right"
                      />
                </div>
            </div>
        </div>
    )}
}
