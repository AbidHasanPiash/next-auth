'use client'
import { signOut } from 'next-auth/react'

export default function Logout() {
    const signOutHandler= () => {
        signOut();
    }
  return (
    <button onClick={signOutHandler} className="px-2 py-1 bg-blue-300 text-center">signOut</button>
  )
}
