import { Metadata } from "next";
import { StatusUnion, WordLetter } from "./modules/Game/WordLetter";
import { WordRow } from "./modules/Game/WordRow";
import Link from "next/link";
import { ChevronLeftSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "404 | Not found",
};

export default async function NotFound() {
  const statuses: StatusUnion[] = [
    "badly-placed",
    "correct",
    "editing",
    "not-found",
  ];

  return (
    <div className="flex gap-5 flex-col justify-center items-center w-full h-screen">
      <div className="flex gap-3">
        {"404Error".split("").map((digit, index) => (
          <WordLetter
            key={index}
            status={statuses[Math.floor(Math.random() * statuses.length)]}
            letter={digit}
          />
        ))}
      </div>
      <Link className="opacity-50 flex gap-3" href={"/"}>
        <ChevronLeftSquare />
        Navigate home
      </Link>
    </div>
  );
}
