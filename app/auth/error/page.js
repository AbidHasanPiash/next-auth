'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function Error() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error');
  return (
    <div className='min-h-screen flex flex-col space-y-4 items-center justify-center'>
      <div className='bg-rose-300 p-10 rounded-lg'>
        <p>{error}</p>
      </div>
      <Link href={'/'} className='uppercase hover:underline'>Back to Home</Link>
    </div>
  )
}
