/**
 * A reception widget in its `widget_slot_<n>`, reporting its size: the size the slot takes, as
 * `resize_to_accommodate_children` gives a Flash slot its widget's (`HotelViewWidgetGrid`).
 */
import { Container as PixiContainer } from 'pixi.js';
import { ReactNode, useEffect, useState } from 'react';

import { Box, useLayoutSize } from '#base/theme';

export interface HotelViewSlotSize {
    width: number;
    height: number;
}

export interface HotelViewMeasuredSlotProps {
    slot: number;
    onSize: (slot: number, size: HotelViewSlotSize) => void;
    children: ReactNode;
}

export const HotelViewMeasuredSlot = ({ slot, onSize, children }: HotelViewMeasuredSlotProps) => {
    const [ node, setNode ] = useState<PixiContainer | null>(null);
    const { width, height } = useLayoutSize(node);

    useEffect(() => {
        onSize(slot, { width: Math.ceil(width), height: Math.ceil(height) });
    }, [ slot, width, height, onSize ]);

    return (
        <Box
            ref={setNode}
            layout={{ position: 'absolute', left: 0, top: 0 }}
        >
            {children}
        </Box>
    );
};
