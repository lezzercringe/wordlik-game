import { FC } from "react";

type Props = {
  status: "correct" | "badly-placed" | "none" | "editing";
  letter?: string;
};

export const WordLetter: FC<Props> = ({ letter = " ", status }) => {
  const className =
    "p-3 w-24 rounded text-2xl text-bold text-black flex justify-center items-center aspect-square " +
    (() => {
      switch (status) {
        case "correct":
          return "bg-green-300";
        case "badly-placed":
          return "bg-yellow-300";
        case "none":
          return "bg-gray-300";
        case "editing":
          return "bg-white";
      }
    })();

  return <div className={className}>{letter}</div>;
};