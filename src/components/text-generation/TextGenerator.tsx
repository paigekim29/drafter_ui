'use client';

import SidePanel from '@/components/panel/SidePanel';
import PromptController from '@/components/text-generation/PromptController';
import PromptHistory from '@/components/text-generation/PromptHistory';
import PromptStatus from '@/components/text-generation/PromptStatus';
import DUMMY_RESPONSES from '@/constants/dummy';
import { PromptResult, RefineSettings } from '@/types';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

const DynamicTipTap = dynamic(() => import('@/components/TipTap'), {
  loading: () => <div className="h-6">Loading...</div>,
  ssr: false,
});

export function TextGenerator() {
  const [content, setContent] = useState('');
  const [results, setResults] = useState<PromptResult[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);

  const generateText = useCallback(async (prompt: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return DUMMY_RESPONSES[Math.floor(Math.random() * DUMMY_RESPONSES.length)];
  }, []);

  const showInput = () => {
    setError(null);
    setIsInputVisible(true);
  };

  const hideInput = () => {
    setError(null);
    setIsInputVisible(false);
  };

  const startGenerating = (prompt: string) => {
    setIsGenerating(true);
    setCurrentPrompt(prompt);
    setError(null);
  };

  const handlePromptSubmit = useCallback(
    async (prompt: string) => {
      if (!prompt.trim()) return;

      try {
        startGenerating(prompt);
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
    },
    [generateText],
  );

  const refineText = useCallback(
    async (settings?: RefineSettings) => {
      if (content.trim() === '' && results.length === 0) {
        return toast('Please generate or enter some text first.');
      }

      const refinementCount = results.filter((r) => r.prompt.includes('Refine #')).length;
      let refinementPrompt = `Refine #${refinementCount + 1}`;

      if (settings) {
        if (settings.refineType) refinementPrompt += ` Type: ${settings.refineType}`;
        if (settings.length > 0) refinementPrompt += ` Length: ${settings.length}`;
        if (settings.target) refinementPrompt += ` Target: ${settings.target}`;
      }

      startGenerating(refinementPrompt);

      try {
        const textToRefine = content.trim() || results[0]?.response || '';
        const promptWithSettings = settings?.detail
          ? `${textToRefine}\n\n세부 지시사항: ${settings.detail}`
          : textToRefine;

        const response = await generateText(promptWithSettings);
        const newResult: PromptResult = {
          id: Date.now().toString(),
          prompt: refinementPrompt,
          response,
          timestamp: new Date(),
          originalContent: textToRefine,
        };

        setResults((prev) => [newResult, ...prev]);
        return refinementPrompt;
      } catch (err) {
        console.error('Text refinement failed:', err);
        setError(err instanceof Error ? err.message : 'Text refinement failed. Please try again.');
        return undefined;
      } finally {
        setIsGenerating(false);
      }
    },
    [generateText, results, content],
  );

  return (
    <div className="w-full space-y-4">
      <DynamicTipTap setContent={setContent} />
      <SidePanel onRefine={refineText} setIsPanelActive={setIsPanelActive} />

      {!isPanelActive && (
        <PromptController
          isInputVisible={isInputVisible}
          isGenerating={isGenerating}
          onShowInput={showInput}
          onHideInput={hideInput}
          onSubmit={handlePromptSubmit}
        />
      )}

      <PromptStatus isGenerating={isGenerating} currentPrompt={currentPrompt} error={error} />
      <PromptHistory results={results} />
    </div>
  );
}
