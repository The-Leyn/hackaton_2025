import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();
  console.log(user);
  return (
    <div className="">
      <main className="h-screen w-screen bg-slate-50">
      </main>
    </div>
  );
}
