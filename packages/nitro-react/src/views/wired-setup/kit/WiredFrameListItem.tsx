/**
 * One element of the frame's list (`WiredFrameList`): a preset `WiredUIBuilder.addElements` put
 * into the dialog, which the frame's `createListView` places by its index. Inside a frame list it
 * registers the box it renders into, learns whether it is the first element and renders
 *
 * - its content, with `splitterHidden` true for the first element under `InnerBorderFramePreset`
 *   (a section passes it on to its splitter);
 * - then its spacer - `sectionSpacing` high, painted in `blendColor` (`blendSpacer`) - unless it is
 *   that first element.
 *
 * `visible` is `WiredUIPreset.visible`: a hidden element keeps its place, its index and its
 * spacer, and only its own window leaves the list (`onInvisibilityChanged`), so `GiveScore`'s
 * hidden "times per game" slider still leaves its spacer between its neighbours. Its content
 * stays mounted, the way Flash keeps the hidden preset.
 *
 * Anywhere else - a section inside a section, a list or any other kit container - it is its
 * content and nothing more, and a hidden one renders nothing. The frame list's context stops at
 * the element, so what an element holds never counts as an element itself.
 *
 * `WiredSection`, `WiredSplitter` and `WiredAlignCenter` are items of their own; a view that puts
 * another kit component at its top level wraps it in one.
 */
import { Container } from 'pixi.js';
import { ReactNode, useContext, useLayoutEffect, useState, useSyncExternalStore } from 'react';

import { Box } from '#base/theme';

import { WiredFlow } from './WiredFlow';
import { WiredFrameListReactContext } from './wiredKitContexts';
import { WiredSpacer } from './WiredSpacer';

const subscribeNothing = () => () => {};

export interface WiredFrameListItemProps {
    /** `WiredUIPreset.visible`. Default `true`. */
    visible?: boolean;
    /** `blendingBackgroundColor` - a CSS colour the spacer after the element takes. */
    blendColor?: string;
    /** The element; `splitterHidden` is `InnerBorderFramePreset`'s `splitterVisible = false` for the first one. */
    children: (splitterHidden: boolean) => ReactNode;
}

export const WiredFrameListItem = ({ visible = true, blendColor, children }: WiredFrameListItemProps) => {
    const list = useContext(WiredFrameListReactContext);
    const registry = list?.registry ?? null;
    const [ node, setNode ] = useState<Container | null>(null);
    const first = useSyncExternalStore(registry ? registry.subscribe : subscribeNothing, () => (registry !== null) && (node !== null) && (registry.first === node));

    useLayoutEffect(() => {
        if (!registry || !node) return;

        return registry.register(node);
    }, [ registry, node ]);

    if (!list) return visible ? children(false) : null;

    const leading = list.innerBorder && first;

    return (
        <Box
            ref={setNode}
            layout={{ flexDirection: 'column', alignItems: 'stretch', alignSelf: 'stretch', flexShrink: 0 }}
        >
            <WiredFrameListReactContext.Provider value={null}>
                <WiredFlow direction="column">
                    <Box
                        visible={visible}
                        layout={{ display: visible ? 'flex' : 'none', flexDirection: 'column', alignItems: 'stretch', flexShrink: 0 }}
                    >
                        {children(leading)}
                    </Box>
                    {!leading && (
                        <WiredSpacer
                            height={list.spacing}
                            backgroundColor={blendColor}
                        />
                    )}
                </WiredFlow>
            </WiredFrameListReactContext.Provider>
        </Box>
    );
};
