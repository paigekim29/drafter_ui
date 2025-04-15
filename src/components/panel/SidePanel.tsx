'use client';

import LengthPanel from '@/components/panel/LengthPanel';
import MainPanel from '@/components/panel/MainPanel';
import RefinePanel from '@/components/panel/RefinePanel';
import RefineTextModal from '@/components/panel/RefineTextModal';
import { RefineSettings } from '@/types';
import { useCallback, useState } from 'react';

type RefineModeType = 'main' | 'length' | 'refine';

interface SidePanelProps {
  onRefine?: (settings?: RefineSettings) => Promise<string | number | undefined>;
  setIsPanelActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidePanel({ onRefine, setIsPanelActive }: SidePanelProps) {
  const [refineMode, setRefineMode] = useState<RefineModeType>('main');
  const [settings, setSettings] = useState<RefineSettings>({
    refineType: 'grammar',
    length: 20,
    target: '',
    detail: '',
  });
  const [modalOpen, setModalOpen] = useState(false);

  const toggleButton = useCallback(
    (key: string) => {
      if (key === 'modal') {
        setRefineMode('main');
        setModalOpen(true);
      } else {
        setIsPanelActive(true);
        setRefineMode(key as RefineModeType);
      }
    },
    [setIsPanelActive],
  );

  const executeRefine = useCallback(
    (type: string, value: number | string) => {
      const updatedSettings = { ...settings, [type]: value };
      setSettings(updatedSettings);
      onRefine && onRefine(updatedSettings);
    },
    [settings, onRefine],
  );

  const handleBackToMainMenu = useCallback(() => {
    setRefineMode('main');
    setIsPanelActive(false);
  }, [setIsPanelActive]);

  const handleModalRefine = useCallback(
    (updatedSettings: RefineSettings) => {
      setSettings(updatedSettings);
      onRefine && onRefine(updatedSettings);
      setModalOpen(false);
    },
    [onRefine, setSettings, setModalOpen],
  );

  const renderControls = useCallback(() => {
    switch (refineMode) {
      case 'length':
        return (
          <LengthPanel handleBackToMainMenu={handleBackToMainMenu} executeRefine={executeRefine} settings={settings} />
        );
      case 'refine':
        return (
          <RefinePanel handleBackToMainMenu={handleBackToMainMenu} executeRefine={executeRefine} settings={settings} />
        );
      default:
        return <MainPanel toggleButton={toggleButton} settings={settings} />;
    }
  }, [refineMode, settings, executeRefine, handleBackToMainMenu, toggleButton]);

  return (
    <>
      <div className="fixed right-4 top-1/10 z-50 flex items-center space-x-4">{renderControls()}</div>

      <RefineTextModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        settings={settings}
        handleModalRefine={handleModalRefine}
      />
    </>
  );
}
