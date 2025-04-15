'use client';

import Tiptap from '@/components/TipTap';
import DUMMY_RESPONSES from '@/constants/dummy';
import { PromptResult } from '@/types';
import { useCallback, useState } from 'react';
import PromptController from './PromptController';
import PromptHistory from './PromptHistory';
import PromptStatus from './PromptStatus';

export function TextGenerator() {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PromptResult[]>([]);

  const showInput = useCallback(() => {
    setError(null);
    setIsInputVisible(true);
  }, []);

  const hideInput = useCallback(() => {
    setError(null);
    setIsInputVisible(false);
  }, []);

  const generateText = async (prompt: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return DUMMY_RESPONSES[Math.floor(Math.random() * DUMMY_RESPONSES.length)];
  };

  const handlePromptSubmit = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setCurrentPrompt(prompt);
    setError(null);

    try {
      const response = await generateText(prompt);

      const newResult: PromptResult = {
        id: Date.now().toString(),
        prompt,
        response,
        timestamp: new Date(),
      };

      setResults((prev) => [newResult, ...prev]);
    } catch (err) {
      console.error('Text generation failed:', err);
      setError(err instanceof Error ? err.message : 'Text generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return (
    <div className="w-full space-y-4">
      <Tiptap />

      <PromptController
        isInputVisible={isInputVisible}
        isGenerating={isGenerating}
        onShowInput={showInput}
        onHideInput={hideInput}
        onSubmit={handlePromptSubmit}
      />

      <PromptStatus isGenerating={isGenerating} currentPrompt={currentPrompt} error={error} />

      <PromptHistory results={results} />
    </div>
  );
}
