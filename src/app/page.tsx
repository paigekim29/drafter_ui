import { TextGenerator } from '@/components/text-generation/TextGenerator';
import { ModeToggle } from '@/components/ModeToggle';

export default function Home() {
  return (
    <>
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <div className="flex flex-col px-8 gap-4">
        <h1 className="text-2xl font-bold">Joo Hee Paige Kim Drafter UI</h1>
        <TextGenerator />
      </div>
    </>
  );
}
