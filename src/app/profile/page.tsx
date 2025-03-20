import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedIn, UserButton } from "@clerk/nextjs";
export default async function Home() {
  return (
    <div className="">
      <main className="h-screen w-screen bg-slate-50">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </main>
    </div>
  );
}
