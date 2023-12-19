import React from 'react'

export default function Dropdown({ isOpen, onClose, options, user, position }){
    if (!isOpen) return null;

    return (
      <div
        className={`absolute ${position === 'right' ? 'right-0' : 'left-0'} w-60 mt-2 bg-dark-component shadow-md rounded-md`}
      >
        <div className="flex items-center mb-3 p-4 border-b border-dark-text">
          <img
            src={user.image || '/images/avatars/1.png'}
            alt={user.name}
            className="rounded-full ring mr-2"
            width={30}
            height={30}
          />
          <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-xs">{user.email}</p>
          </div>
        </div>
        <ul className='space-y-2 px-2'>
          {options.map((option, index) => (
            <li 
              key={index} 
              onClick={() => onClose(option.action)} 
              className='hover:text-primary hover:bg-gray-700 rounded-lg px-4 py-2 cursor-pointer'>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    );
  };