import { ModeToggle } from '@/components/ModeToggle';
import Tiptap from '@/components/TipTap';

export default function Home() {
  return (
    <>
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <div className="flex flex-col h-screen p-8 gap-2">
        <h1 className="text-2xl font-bold">Joo Hee Paige Kim Darfter UI</h1>
        <Tiptap />
      </div>
    </>
  );
}
