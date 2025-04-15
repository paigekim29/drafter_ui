import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  handleBackToMainMenu: () => void;
}

export default function BackButton({ handleBackToMainMenu }: BackButtonProps) {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleBackToMainMenu}
      className="rounded-full bg-slate-100"
      aria-label="뒤로 가기"
    >
      <ArrowLeft className="w-4 h-4" />
    </Button>
  );
}
