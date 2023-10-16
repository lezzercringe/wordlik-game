import { FC } from "react";

export type StatusUnion =
  | "correct"
  | "badly-placed"
  | "none"
  | "editing"
  | "not-found";

type Props = {
  status: StatusUnion;
  letter?: string;
};

export const WordLetter: FC<Props> = ({ letter = " ", status }) => {
  const className =
    "p-3 w-24 rounded text-2xl font-bold text-black flex justify-center items-center aspect-square transition " +
    (() => {
      switch (status) {
        case "correct":
          return "bg-green-300";
        case "badly-placed":
          return "bg-yellow-300";
        case "none":
          return "bg-gray-300";
        case "not-found":
          return "bg-gray-600 text-white";
        case "editing":
          return "bg-white";
      }
    })();

  return <div className={className}>{letter}</div>;
};
