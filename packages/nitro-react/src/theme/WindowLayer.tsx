/**
 * Window context 1's desktop - `HabboWindowManagerComponent.getDesktop(1)`: the screen-sized
 * container every window is drawn in, sorted by the z-index `useFrameDrag` hands each frame as it
 * is activated (Flash's `WindowController.activate()`). Mount it once, around the client's
 * windows; a `Frame` mounted outside it - a room widget's dialog, built over the room canvas -
 * moves its own container in here so it takes its turn in the same order. See `windowLayer`.
 */
import { Container } from 'pixi.js';
import { ReactNode, useCallback } from 'react';

import { Box } from './Box';
import { setWindowLayer, WindowPlacedContext } from './utils';

export interface WindowLayerProps {
    children?: ReactNode;
}

export const WindowLayer = ({ children }: WindowLayerProps) => {
    const attach = useCallback((node: Container | null) => {
        setWindowLayer(node);
    }, []);

    return (
        <Box
            ref={attach}
            sortableChildren={true}
            layout={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <WindowPlacedContext.Provider value={true}>
                {children}
            </WindowPlacedContext.Provider>
        </Box>
    );
};
