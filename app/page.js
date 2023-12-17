'use client'
import SignOut from "@/components/auth/SignOut";
import { useSession } from "next-auth/react";

export default function Home() {
  // const session = await getServerSession();
  // console.log('Session from page: ',session);
  const {data: session} = useSession();
  return (
    <main className="flex flex-col space-y-4 items-center justify-center min-h-screen">
      <div>{session?.user?.email}</div>
      <div>{session?.user?.name}</div>
      <div className="max-w-2xl p-3 flex-wrap">{session?.user?.accessToken}</div>
      <SignOut/>
    </main>
  )
}
