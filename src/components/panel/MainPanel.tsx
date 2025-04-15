import IconButton from '@/components/parts/IconButton';
import { SLIDER_OPTIONS } from '@/constants/refine';
import { RefineSettings } from '@/types';
import { getIconComponent } from '@/utils/iconHelper';

interface MainPanelProps {
  toggleButton: (key: string) => void;
  settings: RefineSettings;
}

const MainPanel = ({ toggleButton, settings }: MainPanelProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center space-y-4 p-2 rounded-full bg-white shadow-lg border">
        {SLIDER_OPTIONS.map((option) => (
          <IconButton
            key={option.key}
            icon={getIconComponent(option.icon)}
            label={option.label}
            onClick={() => toggleButton(option.key)}
            active={settings.refineType === option.key}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPanel;
