import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, Box, Button, Dropmenu, ThemeText } from '#base/theme';
import { useRowVirtualizer } from '#base/theme/hooks/useRowVirtualizer';
import { useScrollController } from '#base/theme/hooks/useScrollController';

const PAGE_SIZE = 24;
const MAX_ITEMS = 200;
const COLUMNS = 4;
const ROW_SIZE = 40;
const ROW_GAP = 4;

/**
 * Pixi port of theme/InventoryFurniView.tsx. DOM hand-rolls its own `@tanstack/react-virtual`
 * row virtualizer (fixed 4 columns, not theme/InfiniteGrid.tsx's auto-column-count one) over a
 * placeholder item list (no real furni data source, no search/filter behavior behind its two
 * empty Dropmenus or its text input) - ported at that same fidelity, using
 * `useRowVirtualizer`/`useScrollController` (the same primitives theme's own InfiniteGrid
 * is built on) directly with a fixed column count instead of reusing InfiniteGrid itself, to
 * match DOM's actual fixed-4-column behavior rather than InfiniteGrid's viewport-width-driven
 * one. DOM's `<input type="text w-full overflow-hidden px-2">` is itself malformed (Tailwind
 * classes concatenated into the `type` attribute instead of `className` - a DOM source bug, not
 * a typo introduced here) and has no keyboard-typing behavior wired to it either way; matched by
 * rendering the same empty bordered box with no text-entry capability (this package has no
 * Pixi-native text input control yet) rather than inventing search functionality DOM lacks.
 */
export const InventoryFurniView = ({ scrollVariant }: { scrollVariant: string }) => {
    const [ itemCount, setItemCount ] = useState(PAGE_SIZE);
    const [ viewportNode, setViewportNode ] = useState<PixiContainer | null>(null);
    const [ viewportHeight, setViewportHeight ] = useState(0);
    const t = useTranslation();

    const scroll = useScrollController({ orientation: 'vertical' });

    useEffect(() => {
        if (!viewportNode) return;

        let raf = 0;
        const tick = () => {
            const height = viewportNode.layout?.computedLayout?.height ?? viewportNode.height ?? 0;
            setViewportHeight(prev => (Math.abs(prev - height) > 0.5 ? height : prev));
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(raf);
    }, [ viewportNode ]);

    const rowCount = Math.ceil(itemCount / COLUMNS);

    const { virtualItems, totalSize, measureRow } = useRowVirtualizer({
        count: rowCount,
        estimateSize: ROW_SIZE,
        overscan: 4,
        viewportHeight,
        scrollOffset: scroll.scrollOffset,
        gap: ROW_GAP,
    });

    useEffect(() => {
        const lastRow = virtualItems[virtualItems.length - 1];
        if (!lastRow) return;

        if (lastRow.index >= rowCount - 1 && itemCount < MAX_ITEMS) {
            // Mirrors DOM's own loadMore-in-effect (theme/InventoryFurniView.tsx) - pagination
            // reacting to the virtualizer's own visible range, not derivable during render.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setItemCount(count => Math.min(count + PAGE_SIZE, MAX_ITEMS));
        }
    }, [ virtualItems, rowCount, itemCount ]);

    return (
        <Box layout={{ flexDirection: 'column', gap: 4, height: '100%' }}>
            <Border
                variant="3"
                tintColor="#cacaca"
                layout={{ flexDirection: 'row', gap: 6, padding: 4, height: 25, alignItems: 'center' }}
            >
                <Border
                    variant="0"
                    layout={{ width: 139, height: 20 }}
                />
                <Dropmenu
                    variant="100"
                    layout={{ width: 119, height: 21 }}
                />
                <Dropmenu
                    variant="100"
                    layout={{ width: 119, height: 21 }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', flex: 1, gap: 4 }}>
                <Box layout={{ flexDirection: 'row', flex: 1, gap: 2 }}>
                    items will render here...
                </Box>
                <Box layout={{ flexDirection: 'column', width: 180, flexShrink: 0 }}>
                    <Box layout={{ flex: 1 }}>
                        <ThemeText
                            text="preview"
                            textStyle="text-style-regular"
                            textOptions={{}}
                        />
                    </Box>
                    <Box layout={{ flexDirection: 'row' }}>
                        <Button variant="102">{t('inventory.furni.placetoroom')}</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
