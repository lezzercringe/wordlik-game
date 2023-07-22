import { WordRow } from "./WordRow";

const AVAILABLE_TRIES = 5;
// it should be defined in settings

export const GameField = () => {
  const tries = Array.from(
    { length: AVAILABLE_TRIES },
    (_, index) => index + 1
  );

  return (
    <div className="flex flex-col  gap-3 p-3 ">
      {tries.map((tryNumber) => (
        <WordRow key={tryNumber} />
      ))}
    </div>
  );
};
