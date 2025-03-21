import { getGameById } from "@/db/services/games";
import Game from "@/components/Game";
import { currentUser } from "@clerk/nextjs/server";

export default async function page({ params }: { params: { id: string } }) {
  const gameId = Number(params.id);
  const user = await currentUser();
  console.log(user?.emailAddresses[0].emailAddress);
  const userEmail = user?.emailAddresses[0].emailAddress
  const game = await getGameById(gameId);

  return (
    <Game game={game} userEmail={userEmail} />
  );
}
