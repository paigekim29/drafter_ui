import RoundButton from '@/components/parts/RoundButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { REFINE_OPTIONS, TARGET_OPTIONS } from '@/constants/refine';
import { RefineSettings } from '@/types';
import { getIconComponent } from '@/utils/iconHelper';
import { useEffect, useState, useCallback } from 'react';

interface RefineTextModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settings: RefineSettings;
  handleModalRefine: (settings: RefineSettings) => void;
}

export default function RefineTextModal({
  modalOpen,
  setModalOpen,
  settings,
  handleModalRefine,
}: RefineTextModalProps) {
  const [tempSettings, setTempSettings] = useState<RefineSettings>({ ...settings });

  useEffect(() => {
    if (modalOpen) {
      setTempSettings({ ...settings });
    }
  }, [modalOpen, settings]);

  const updateTempSettings = useCallback((key: keyof RefineSettings, value: string | number) => {
    setTempSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleGenerate = useCallback(() => {
    handleModalRefine(tempSettings);
  }, [tempSettings, handleModalRefine]);

  const renderRefineOptions = useCallback(
    () =>
      REFINE_OPTIONS.map((option) => (
        <RoundButton
          key={option.key}
          label={option.label}
          isActive={tempSettings.refineType === option.key}
          onClick={() => updateTempSettings('refineType', option.key)}
        />
      )),
    [tempSettings.refineType, updateTempSettings],
  );

  const renderTargetOptions = useCallback(
    () =>
      TARGET_OPTIONS.map((option) => (
        <RoundButton
          key={option.key}
          label={option.label}
          isActive={tempSettings.target === option.key}
          onClick={() => updateTempSettings('target', option.key)}
        />
      )),
    [tempSettings.target, updateTempSettings],
  );

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-md flex flex-col gap-6">
        <DialogTitle>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              {getIconComponent('Sparkles')}글 다듬기
            </h3>
            <div className="flex flex-wrap gap-2">{renderRefineOptions()}</div>
          </div>
        </DialogTitle>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            {getIconComponent('AlignVerticalSpaceAround')}
            문서 길이
          </h3>
          <div className="flex items-center px-1">
            <div className="flex-1 mx-2">
              <Slider
                value={[tempSettings.length]}
                onValueChange={([value]) => updateTempSettings('length', value)}
                max={80}
                step={20}
                className="my-2"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm">매우 짧게</span>
                <span className="text-sm">매우 길게</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            {getIconComponent('UserRound')}
            대상
          </h3>
          <div className="flex flex-wrap gap-2">{renderTargetOptions()}</div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            {getIconComponent('MessageCircleWarning')}
            세부 정보
          </h3>
          <Textarea
            placeholder="추가 세부 정보를 입력해 주세요. 더 정확하게 내용을 생성할 수 있어요!"
            value={tempSettings.detail}
            onChange={(e) => updateTempSettings('detail', e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleGenerate}
            className="rounded-full bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg transition-shadow"
            size="lg"
          >
            다시 생성
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
