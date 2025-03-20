import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedIn, UserButton, UserProfile, SignOutButton } from "@clerk/nextjs";
import "@/app/globals.css";

export default async function Home() {
  return (
    <div className="">
      <main className="h-screen w-screen bg-slate-50">
        <SignedIn>
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "w-full!",
                cardBox: "w-screen! max-w-none!",
              },
            }}
          />
          <div className="flex justify-center items-center mt-3">
            <SignOutButton>
              <button className="backgrounPervenche text-white font-bold py-2 px-4 rounded-xl">
                Logout
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      </main>
    </div>
  );
}
