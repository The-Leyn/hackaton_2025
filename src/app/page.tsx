import { currentUser } from "@clerk/nextjs/server";
import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import { createUser, getUserByMail, getUserRankByMail, updateGlobalScore } from "@/db/services/users";
import { getAllGames } from "@/db/services/games";
import Link from "next/link";
export async function setUserScore(score: number) {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;
  // if (userEmail) {
  updateGlobalScore(userEmail, score);

  // }
}
export default async function Home() {
  // const { userId } = await auth();
  const user = await currentUser();
  console.log(user);
  // // const userTest = await getUserByMail("test@example.com");
  // // console.log(userTest)
  const bgColors = ["bg-hackatonPervencheDark-400", "bg-hackatonPervenche-400", "bg-hackatonGold-400"];

  const textColors = ["text-hackatonPervenche-400", "text-hackatonPervencheDark-400", "text-hackatonGoldDark-400"];
  const games = await getAllGames();

  if (!user) {
    return null;
  }

  const userEmail = user.emailAddresses?.[0]?.emailAddress;
  const currentUserInfo = await getUserByMail(userEmail);
  const globalScore = currentUserInfo?.global_score ?? 0;
  const rankPosition = await getUserRankByMail(userEmail);
  if (!userEmail) {
    throw new Error("L'utilisateur n'a pas d'adresse e-mail.");
  }

  // Vérifie si l'utilisateur existe déjà en base
  const userMailVerif = await getUserByMail(userEmail);

  if (!userMailVerif) {
    // Si l'utilisateur n'existe pas encore, on l'insère en base
    const UserData = {
      mail: userEmail,
      first_name: user.firstName || "",
      last_name: user.lastName || "",
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
    <main className="h-screen w-screen bg-slate-50 flex flex-col">
      <Header title={"EUNIFY"} subtitle="Welcome to" isVisible={false}>
        <UserCard name={user?.fullName || ""} country="France" points={globalScore} rank={rankPosition} image={user?.imageUrl} />
      </Header>
      <div className=" p-6 h-full pb-[80px] overflow-scroll">
        <h1 className="font-medium text-lg text-hackatonPervencheDark-400 uppercase mb-4">Games</h1>
        <div className="grid grid-cols-2 gap-2 pb-4">
          {games.map((game, index) => (
            <Link key={game.id} href={`/game/${game.id}`}>
              <div
                className={`w-40 h-40 ${bgColors[index % bgColors.length]} ${textColors[index % textColors.length]} rounded-3xl p-4 flex flex-col`}
              >
                <h3 className="text-sm mt-auto">{game.category}</h3>
                <h2 className="text-lg font-bold capitalize">{game.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
