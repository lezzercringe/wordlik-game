import { GameField } from "@/app/modules/Game/WordField";

export default async function Page() {
  return (
    <div className="w-full flex h-screen justify-center items-center">
      <GameField />
    </div>
  );
}
