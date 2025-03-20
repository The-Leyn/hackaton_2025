import Image from "next/image";
import { auth, currentUser } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import { createUser, getUserByMail } from '@/db/services/users'; 

export default async function Home() {
  // const { userId } = await auth();
  const user = await currentUser();
  console.log(user);
  // const userTest = await getUserByMail("test@example.com");
  // console.log(userTest)


  if (!user) {
    return null;
  }
  
  const userEmail = user.emailAddresses?.[0]?.emailAddress;
  
  if (!userEmail) {
    throw new Error("L'utilisateur n'a pas d'adresse e-mail.");
  }
  
  // Vérifie si l'utilisateur existe déjà en base
  const userMail = await getUserByMail(userEmail);
  
  if (!userMail) {
    // Si l'utilisateur n'existe pas encore, on l'insère en base
    const UserData = {
      mail: userEmail,
      country: "France",
      global_score: 0,
    };
    console.log("UserData", UserData);
  
    await createUser(UserData);
    console.log("Nouvel utilisateur ajouté :", userEmail);
  } else {
    console.log("Utilisateur déjà existant :", userEmail);
  }

  


  
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
