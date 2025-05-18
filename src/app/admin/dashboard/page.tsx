"use client"
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
 
const Dashboard = () => {
  const {data: session} = useSession();

  return (
    <div className="flex flex-col items-center m-4">
      <h1>This is Dashboard</h1>
        {session?.user?.name ? (
            <>
                <h1 className="text-3xl my-2">
                    Welcome, {session?.user?.name}
                </h1>
            </>
        ) : (
            <h1 className="text-3xl my-2">
                Welcome, {session?.user?.email}
            </h1>
        )}
      <button type="button" onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default Dashboard;