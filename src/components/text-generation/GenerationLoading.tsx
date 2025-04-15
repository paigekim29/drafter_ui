import { Loader2 } from 'lucide-react';

interface GenerationLoadingProps {
  message?: string;
}

export function GenerationLoading({ message = 'Generating...' }: GenerationLoadingProps) {
  return (
    <div className="p-4 border rounded-md bg-muted w-full flex items-center space-x-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
