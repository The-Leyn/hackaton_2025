import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { getTopScores, getUserByMail, getUserRankByMail } from "@/db/services/users";

export default async function page() {
  const user = await currentUser();
  const { data } =  await (await clerkClient()).users.getUserList({
  });

  if (!user) {
    return null;
  }

  const userEmail = user.emailAddresses?.[0]?.emailAddress;
  const currentUserInfo = await getUserByMail(userEmail);
  const globalScore = currentUserInfo?.global_score ?? 0;
  const rankPosition = await getUserRankByMail(userEmail);

  const topUsers = await getTopScores(20);


  console.log(data)
  return (
    <div className="h-screen w-screen bg-hackatonWhite-400 flex flex-col overflow-scroll pb-[80px]">
      <Header title={"RANKING"} subtitle="Discover your" isVisible={false}>
        <UserCard name={user?.fullName || ""} country="France" points={globalScore} rank={rankPosition} image={user?.imageUrl} />
      </Header>
      <div className="p-6 flex flex-col gap-3 h-full overflow-scroll">
        {topUsers.map((user) => (
          <div key={user.mail} className="flex justify-between items-center bg-hackatonPervencheLight-400 rounded-3xl p-4">
            <h2 className="text-hackatonPervencheDark-400 text-xl font-semibold flex">{user.first_name} {user.last_name}</h2>
            <div className="flex flex-col">
              <h3 className="text-hackatonPervencheDark-400 font-semibold">{user.global_score}</h3>
              <span className="text-hackatonPervencheDark-400 text-xs text-end">pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
