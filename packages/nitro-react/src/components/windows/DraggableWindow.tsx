import { FC, ReactNode, useRef, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../theme/hooks/useTheme';
import { useDraggableWindow } from '../../theme/hooks/useDraggableWindow';
import { cn } from '../../theme/utils/classNameUtils';

interface DraggableWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose?: () => void;
  defaultX?: number;
  defaultY?: number;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
  movable?: boolean;
  className?: string;
}

const DRAG_HANDLE_HEIGHT = 24;
const RESIZE_HANDLE_SIZE = 8;

export const DraggableWindow: FC<DraggableWindowProps> = ({
  id,
  title,
  children,
  onClose,
  defaultX = 100,
  defaultY = 100,
  defaultWidth = 350,
  defaultHeight = 450,
  minWidth = 200,
  minHeight = 200,
  resizable = true,
  movable = true,
  className,
}) => {
  const { theme } = useTheme();
  const { position, updatePosition } = useDraggableWindow(id, {
    defaultX,
    defaultY,
    defaultWidth,
    defaultHeight,
    defaultZIndex: 10,
  });

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [zIndex, setZIndex] = useState(position.zIndex || 10);

  const portalElement = typeof window !== 'undefined'
    ? document.getElementById('draggable-windows-container')
    : null;

  // Handle window dragging
  const handleMouseDownDrag = useCallback((e: React.MouseEvent) => {
    if (!movable) return;

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDragging(true);
    setZIndex(prev => prev + 1);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position.x, position.y, movable]);

  // Handle window resizing
  const handleMouseDownResize = useCallback((e: React.MouseEvent) => {
    if (!resizable) return;

    e.preventDefault();
    setIsResizing(true);
    setZIndex(prev => prev + 1);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: position.width || defaultWidth,
      height: position.height || defaultHeight,
    });
  }, [position.width, position.height, defaultWidth, defaultHeight, resizable]);

  // Handle mouse move for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updatePosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
          zIndex,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;

        updatePosition({
          width: Math.max(minWidth, resizeStart.width + deltaX),
          height: Math.max(minHeight, resizeStart.height + deltaY),
          zIndex,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, resizeStart, minWidth, minHeight, updatePosition, zIndex]);

  const windowContent = (
    <div
      ref={windowRef}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${position.width || defaultWidth}px`,
        height: `${position.height || defaultHeight}px`,
        zIndex: position.zIndex || zIndex,
      }}
      className={cn(
        'absolute pointer-events-auto flex flex-col bg-[var(--color-windowBg)] border-2 border-[var(--color-windowBorder)] shadow-[var(--shadow-window)]',
        'user-select-none transition-shadow duration-150',
        isDragging && 'shadow-xl',
        className
      )}
    >
      {/* Header/Title Bar */}
      <div
        onMouseDown={handleMouseDownDrag}
        style={{
          background: theme.colors.windowHeaderGradient,
          height: `${DRAG_HANDLE_HEIGHT}px`,
        }}
        className={cn(
          'flex items-center justify-between px-2 text-white text-sm font-bold cursor-move select-none',
          'border-b border-[var(--color-windowBorder)]',
          movable ? 'cursor-move' : 'cursor-default'
        )}
      >
        <span className="flex-1 truncate">{title}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 h-5 w-5 flex items-center justify-center hover:bg-red-600 transition-colors text-white font-bold text-xs leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[var(--color-windowBg)]">
        {children}
      </div>

      {/* Resize Handle */}
      {resizable && (
        <div
          onMouseDown={handleMouseDownResize}
          style={{
            width: `${RESIZE_HANDLE_SIZE}px`,
            height: `${RESIZE_HANDLE_SIZE}px`,
          }}
          className="absolute bottom-0 right-0 cursor-se-resize bg-gradient-to-tl from-[var(--color-windowBorder)] to-transparent opacity-50 hover:opacity-100 transition-opacity"
          title="Drag to resize"
        />
      )}
    </div>
  );

  if (!portalElement) {
    return windowContent;
  }

  return createPortal(windowContent, portalElement);
};
