import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import { getUserByMail } from "@/db/services/users";

export default async function Home() {
  // const { userId } = await auth();
  const user = await currentUser();
  console.log(user);
  const userTest = await getUserByMail("test@example.com");
  console.log(userTest)
  return (
    <div className="">
      <main className="h-screen w-screen bg-slate-50">
        <Header title={"EUNIFY"} subtitle="Welcome to" isVisible={false} >
          <UserCard name={user?.fullName || ""} country="France" points={780} rank={10} image={user?.imageUrl} />
        </Header>
        <p className="text-black font-extralight">Hello</p>
        <p className="font-poppins text-black">Hello</p>
        <p className="text-black">Hello</p>
        <p className="font-syncopate text-black">Hello</p>
      </main>
    </div>
  );
}
