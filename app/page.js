'use client'
import SignOut from "@/components/auth/SignOut";
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  return (
    <main className="flex flex-col space-y-4 items-center justify-center min-h-screen">
      <div>{session?.user?.email}</div>
      <div>{session?.user?.name}</div>
      <SignOut/>
    </main>
  )
}
