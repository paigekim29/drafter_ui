import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
}

const IconButton = ({ icon, label, onClick, active = false, className }: IconButtonProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClick}
          className={`rounded-full transition-all dark:text-slate-800 ${
            active ? 'bg-white dark:bg-slate-700 shadow-md dark:text-indigo-300' : 'dark:hover:bg-slate-200'
          } ${className}`}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">{label}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default IconButton;
