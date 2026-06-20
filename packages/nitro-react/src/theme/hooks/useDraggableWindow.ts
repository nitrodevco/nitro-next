import { useCallback, useMemo } from 'react';
import { useDraggableWindowStore } from '../stores/useDraggableWindowStore';
import { DraggableWindowPosition } from '../types';

interface UseDraggableWindowOptions {
  defaultX?: number;
  defaultY?: number;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultZIndex?: number;
}

export const useDraggableWindow = (
  windowId: string,
  options: UseDraggableWindowOptions = {}
) => {
  const {
    defaultX = 100,
    defaultY = 100,
    defaultWidth = 300,
    defaultHeight = 400,
    defaultZIndex = 10,
  } = options;

  const { positions, setPosition, getPosition } = useDraggableWindowStore();

  const position = useMemo(() => {
    const stored = getPosition(windowId);
    return stored || {
      x: defaultX,
      y: defaultY,
      width: defaultWidth,
      height: defaultHeight,
      zIndex: defaultZIndex,
    };
  }, [windowId, getPosition, defaultX, defaultY, defaultWidth, defaultHeight, defaultZIndex]);

  const updatePosition = useCallback(
    (newPosition: Partial<DraggableWindowPosition>) => {
      const updated = { ...position, ...newPosition };
      setPosition(windowId, updated);
    },
    [windowId, position, setPosition]
  );

  const setPosition_ = useCallback(
    (newPosition: DraggableWindowPosition) => {
      setPosition(windowId, newPosition);
    },
    [windowId, setPosition]
  );

  return {
    position,
    updatePosition,
    setPosition: setPosition_,
  };
};
