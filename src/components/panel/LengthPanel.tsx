import BackButton from '@/components/parts/BackButton';
import IconButton from '@/components/parts/IconButton';
import SliderDot from '@/components/parts/SliderDot';
import { useSlider } from '@/hooks/useSlider';
import { RefineSettings } from '@/types';
import { getIconComponent } from '@/utils/iconHelper';
import { useRef } from 'react';

const LENGTH_OPTIONS = [20, 40, 60, 80, 100];

interface LengthPanelProps {
  handleBackToMainMenu: () => void;
  executeRefine: (type: string, value: number | string) => void;
  settings: RefineSettings;
}

const LengthPanel = ({ handleBackToMainMenu, executeRefine, settings }: LengthPanelProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const { isDragging, activeIndex, selectOption, handleMouseDown } = useSlider<number>({
    sliderRef,
    options: LENGTH_OPTIONS,
    initialValue: settings.length,
    onChange: (value) => executeRefine('length', value),
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={sliderRef}
        className={`flex flex-col items-center space-y-4 p-2 rounded-full bg-slate-200 shadow-lg border relative ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDownCapture={handleMouseDown}
      >
        {LENGTH_OPTIONS.map((option, index) => (
          <div key={option} className="relative z-10">
            {index === activeIndex ? (
              <IconButton
                icon={getIconComponent('AlignVerticalSpaceAround')}
                label={`${option}자`}
                active
                onClick={() => selectOption(index)}
                className="text-indigo-500 ignore-drag"
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

export default LengthPanel;
