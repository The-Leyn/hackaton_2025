import Header from "@/components/Header";
import UserCard from "@/components/UserCard";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";

export default async function page() {
  const user = await currentUser();
  const { data } =  await (await clerkClient()).users.getUserList({
  });
  console.log(data)
  return (
    <div className="h-screen w-screen bg-hackatonWhite-400 flex flex-col overflow-scroll pb-[80px]">
      <Header title={"RANKING"} subtitle="Discover your" isVisible={false}>
        <UserCard name={user?.fullName || ""} country="France" points={780} rank={10} image={user?.imageUrl} />
      </Header>
      <div className="p-6 flex flex-col gap-3 h-full overflow-scroll">
        {data.map((user) => (
          <div key={user.id} className="flex justify-between items-center bg-hackatonPervencheLight-400 rounded-3xl p-4">
            <h2 className="text-hackatonPervencheDark-400 text-xl font-semibold flex">{user.fullName}</h2>
            <div className="flex flex-col">
              <h3 className="text-hackatonPervencheDark-400 font-semibold">{2460}</h3>
              <span className="text-hackatonPervencheDark-400 text-xs">pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
