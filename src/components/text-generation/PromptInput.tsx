'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  onClose: () => void;
  loading: boolean;
}

export function PromptInput({ onSubmit, onClose, loading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    onSubmit(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit();
    }
  };

  return (
    <div className="flex w-full max-w-[66%] items-center space-x-2">
      <div className="relative flex-grow">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          disabled={loading}
          className="rounded-full shadow-sm h-10"
          onKeyDown={handleKeyDown}
        />
        <Button
          size="icon"
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <Button onClick={onClose} variant="outline" size="icon" className="rounded-full bg-slate-100">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
