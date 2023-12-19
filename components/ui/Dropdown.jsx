import React from 'react'

export default function Dropdown({ isOpen, onClose, options, position }){
    if (!isOpen) return null;
  
    return (
      <div
        className={`absolute ${position === 'right' ? 'right-0' : 'left-0'} w-40 px-2 mt-2 bg-dark-component ring-1 ring-primary rounded-md p-2`}
      >
        <ul className='space-y-2'>
          {options.map((option, index) => (
            <li key={index} onClick={() => onClose(option.action)} className='cursor-pointer'>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    );
  };