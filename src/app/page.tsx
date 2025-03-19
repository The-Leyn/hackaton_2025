import Image from "next/image";
import UserCard from "@/components/UserCard";

export default function Page() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50">
      <UserCard
        name="Amaury"
        country="France"
        points={2500}
        rank={13}
      />
    </main>
  );
}