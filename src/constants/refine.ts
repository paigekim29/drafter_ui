const SLIDER_OPTIONS = [
  { key: 'refine', icon: 'Sparkles', label: '글다듬기' },
  { key: 'length', icon: 'AlignVerticalSpaceAround', label: '문장 길이' },
  { key: 'modal', icon: 'SlidersHorizontal', label: '조정' },
];

const REFINE_OPTIONS = [
  { key: 'grammar', icon: 'CodeXml', label: '문법/오타 수정' },
  { key: 'simple', icon: 'ArrowDownWideNarrow', label: '간단한 수정' },
  { key: 'full', icon: 'ArrowDownAZ', label: '전체 수정' },
];

const TARGET_OPTIONS = [
  { key: 'general', label: '일반' },
  { key: 'academic', label: '학술' },
  { key: 'business', label: '비즈니스' },
  { key: 'casual', label: '캐주얼' },
  { key: 'custom', label: '사용자 지정' },
];

export { REFINE_OPTIONS, TARGET_OPTIONS, SLIDER_OPTIONS };
