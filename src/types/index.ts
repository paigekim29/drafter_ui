interface PromptResult {
  id: string;
  prompt: string;
  response: string;
  timestamp: Date;
  originalContent?: string;
}

type RefineType = 'grammar' | 'simple' | 'full';
type TargetType = 'general' | 'academic' | 'business' | 'casual' | 'custom';
type PanelState = 'refine' | 'length' | null;

interface RefineSettings {
  refineType: string;
  length: number;
  target: string;
  detail: string;
}

export type { PromptResult, RefineType, TargetType, PanelState, RefineSettings };
