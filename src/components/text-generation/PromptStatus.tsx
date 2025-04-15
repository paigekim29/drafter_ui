'use client';

import { GenerationLoading } from '@/components/text-generation/GenerationLoading';

type PromptStatusProps = {
  isGenerating: boolean;
  currentPrompt: string | null;
  error: string | null;
};

export default function PromptStatus({ isGenerating, currentPrompt, error }: PromptStatusProps) {
  return (
    <>
      {error && <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md mt-4">{error}</div>}
      {isGenerating && currentPrompt && (
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-1">
            <span className="font-medium">Current Prompt:</span> {currentPrompt}
          </div>
          <GenerationLoading />
        </div>
      )}
    </>
  );
}
