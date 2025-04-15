'use client';

import { PromptResult } from '@/types';

type PromptHistoryProps = {
  results: PromptResult[];
};

export default function PromptHistory({ results }: PromptHistoryProps) {
  if (results.length === 0) return null;

  return (
    <div className="space-y-4 my-6 divide-gray-100">
      {results.map(({ id, prompt, response, timestamp }) => (
        <div key={id} className="pt-4">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground flex justify-between items-baseline">
              <div>
                <span className="font-medium">Prompt:</span> {prompt}
              </div>
              <span className="text-xs text-gray-400">
                {timestamp.toLocaleTimeString()} {timestamp.toLocaleDateString()}
              </span>
            </div>
            <div className="p-4 border rounded-md w-full">
              <p className="whitespace-pre-wrap">{response}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
