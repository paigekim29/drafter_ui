import { RefObject, useCallback, useEffect, useState } from 'react';

interface UseSliderProps<T> {
  sliderRef: RefObject<HTMLDivElement | null>;
  options: T[];
  initialValue?: T;
  onChange: (value: T) => void;
  findIndex?: (options: T[], value: T | undefined) => number;
}

/**
 * Custom hook for slider functionality
 * Provides dragging, mouse position detection, and option selection
 */
export function useSlider<T>({ sliderRef, options, initialValue, onChange, findIndex }: UseSliderProps<T>) {
  const [isDragging, setIsDragging] = useState(false);

  const [activeIndex, setActiveIndex] = useState(() => {
    const index = findIndex ? findIndex(options, initialValue) : options.findIndex((opt) => opt === initialValue);
    return index >= 0 ? index : 0;
  });

  const updateIndexFromPosition = useCallback(
    (clientY: number) => {
      if (!sliderRef.current) return;

      const { top, height } = sliderRef.current.getBoundingClientRect();
      const optionHeight = height / options.length;
      const relativeY = clientY - top;
      const newIndex = Math.max(0, Math.min(options.length - 1, Math.floor(relativeY / optionHeight)));

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    },
    [activeIndex, options.length, sliderRef],
  );

  const selectOption = useCallback(
    (index: number) => {
      setActiveIndex(index);
      onChange(options[index]);
    },
    [onChange, options],
  );

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('.ignore-drag')) return;
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        updateIndexFromPosition(e.clientY);
      }
    },
    [isDragging, updateIndexFromPosition],
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      selectOption(activeIndex);
    }
  }, [isDragging, activeIndex, selectOption]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    isDragging,
    activeIndex,
    selectOption,
    handleMouseDown,
  };
}
