import BackButton from '@/components/parts/BackButton';
import IconButton from '@/components/parts/IconButton';
import SliderDot from '@/components/parts/SliderDot';
import { REFINE_OPTIONS } from '@/constants/refine';
import { useSlider } from '@/hooks/useSlider';
import { RefineSettings } from '@/types';
import { getIconComponent } from '@/utils/iconHelper';
import { useRef } from 'react';

interface RefinePanelProps {
  handleBackToMainMenu: () => void;
  executeRefine: (type: string, value: number | string) => void;
  settings: RefineSettings;
}

const RefinePanel = ({ handleBackToMainMenu, executeRefine, settings }: RefinePanelProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const { isDragging, activeIndex, selectOption, handleMouseDown } = useSlider({
    sliderRef,
    options: REFINE_OPTIONS,
    initialValue: REFINE_OPTIONS.find((opt) => opt.key === settings.refineType),
    onChange: (value) => executeRefine('refineType', value.key),
    findIndex: (options, value) => options.findIndex((opt) => opt.key === value?.key),
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={sliderRef}
        className="flex flex-col items-center space-y-4 p-2 rounded-full bg-slate-200 shadow-lg border relative"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDownCapture={handleMouseDown}
      >
        {REFINE_OPTIONS.map((option, index) => (
          <div key={option.key} className="relative z-10">
            {index === activeIndex ? (
              <IconButton
                icon={getIconComponent(option.icon)}
                label={option.label}
                onClick={() => selectOption(index)}
                active
                className="text-indigo-500"
              />
            ) : (
              <SliderDot onClick={() => selectOption(index)} />
            )}
          </div>
        ))}
      </div>
      <BackButton handleBackToMainMenu={handleBackToMainMenu} />
    </div>
  );
};

export default RefinePanel;
