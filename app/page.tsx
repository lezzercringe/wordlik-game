import { WordForm } from "@modules/Form/WordForm";

export default function Home() {
  return (
    <main className="grid grid-cols-6 items-center h-screen">
      <div className="col-start-3 col-span-2">
        <WordForm />
      </div>
    </main>
  );
}
