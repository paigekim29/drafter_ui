import { Button } from '@/components/ui/button';

interface SliderDotProps {
  onClick: () => void;
}

export default function SliderDot({ onClick }: SliderDotProps) {
  return (
    <Button size="icon" variant="ghost" className="rounded-full ignore-drag" onClick={onClick}>
      <div className="w-2 h-2 bg-slate-400 rounded-full" />
    </Button>
  );
}
