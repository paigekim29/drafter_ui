'use client';

import { PromptInput } from '@/components/text-generation/PromptInput';
import { Button } from '@/components/ui/button';

type PromptControllerProps = {
  isInputVisible: boolean;
  isGenerating: boolean;
  onShowInput: () => void;
  onHideInput: () => void;
  onSubmit: (prompt: string) => void;
};

export default function PromptController({
  isInputVisible,
  isGenerating,
  onShowInput,
  onHideInput,
  onSubmit,
}: PromptControllerProps) {
  return (
    <div className="flex justify-start">
      {!isInputVisible ? (
        <Button
          onClick={onShowInput}
          className="rounded-full bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg transition-shadow"
          size="lg"
        >
          초안 자동 생성
        </Button>
      ) : (
        <div className="flex flex-col space-y-4 w-full">
          <PromptInput onSubmit={onSubmit} onClose={onHideInput} loading={isGenerating} />
        </div>
      )}
    </div>
  );
}
