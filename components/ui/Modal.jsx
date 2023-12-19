'use client'
export default function Modal({ isOpen, children }) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="w-screen h-screen backdrop-brightness-90 p-4 flex items-center justify-center">
          <div className='bg-dark-component p-4 shadow-2xl shadow-black rounded-lg max-h-screen m-4 max-w-7xl overflow-auto'>
              {children}
          </div>
        </div>
      </div>
    )
  }
  