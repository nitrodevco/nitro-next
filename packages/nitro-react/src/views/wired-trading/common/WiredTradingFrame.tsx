/**
 * The frame of the ubuntu-styled wired trading windows - Flash `wired_trading/AbstractUbuntuWiredUI`
 * with the `FramePreset` its subclasses build through `UbuntuPresetManager` (the `ubuntu` wired
 * style): the style's `frame` template (style 3, `#418db0`, margins 1/33/1/8, the 4px shadow)
 * around a list of parts `sectionSpacing` apart, the frame `resizeToWidth`'s given width wide
 * and as high as its parts. With `scroll` the parts scroll between `minHeight` and `maxHeight`
 * (`ListScrollParams`); the footer is the last part and scrolls with them, as Flash's
 * `stickyFooter = false` has it.
 *
 * `showFrame` centres the window the first time it shows (`window.center()`, then
 * `xOffsetFromCenter`); `isRememberLocation` windows keep their place after that.
 */
import { Container } from 'pixi.js';
import { ReactNode, useState } from 'react';

import { Box, Frame, useLayoutSize } from '#base/theme';
import { WiredScrollList } from '#base/views/wired-setup/kit/WiredScrollList';
import { WiredSpacer } from '#base/views/wired-setup/kit/WiredSpacer';
import { WiredStyleProvider } from '#base/views/wired-setup/kit/WiredStyleContext';
import { UBUNTU_WIRED_STYLE } from '#base/wired';

/** The ubuntu `frame` template's margins. */
const FRAME_MARGIN_TOP = 33;
const FRAME_MARGIN_BOTTOM = 8;
const FRAME_MARGIN_SIDE = 1;

export interface WiredTradingFrameProps {
    id: string;
    /** `framePreset.title` - a literal, already translated. */
    title: string;
    /** `framePreset.resizeToWidth`. */
    width: number;
    /** `ListScrollParams(alwaysShowScrollbar, minHeight, maxHeight)`. */
    scroll?: { minHeight: number; maxHeight: number };
    /** `xOffsetFromCenter`. */
    xOffsetFromCenter?: number;
    /** `isRememberLocation`. */
    rememberLocation?: boolean;
    /** Moves the window from where it would open - `RewardNotificationController` staggers its popups this way. */
    openOffset?: { x: number; y: number };
    onClose: () => void;
    /** The presets `createFramePreset` is given, in order; `null` / `false` parts are left out. */
    parts: ReactNode[];
}

export const WiredTradingFrame = ({ id, title, width, scroll, xOffsetFromCenter = 0, rememberLocation = false, openOffset, onClose, parts }: WiredTradingFrameProps) => {
    const [ contentNode, setContentNode ] = useState<Container | null>(null);
    const contentSize = useLayoutSize(contentNode);
    const [ centeredAt ] = useState(() => ({ x: Math.max(0, Math.round((window.innerWidth - width) / 2) + xOffsetFromCenter + (openOffset?.x ?? 0)), y: Math.max(0, Math.round((window.innerHeight - 300) / 2) + (openOffset?.y ?? 0)) }));
    const shown = parts.filter(part => (part !== null) && (part !== false) && (part !== undefined));
    const contentWidth = width - (FRAME_MARGIN_SIDE * 2);
    const height = Math.ceil(contentSize.height) + FRAME_MARGIN_TOP + FRAME_MARGIN_BOTTOM;
    const style = UBUNTU_WIRED_STYLE;

    const list = shown.map((part, index) => (
        <Box
            key={index}
            layout={{ flexDirection: 'column', alignItems: 'stretch', flexShrink: 0 }}
        >
            {part}
            {(index < (shown.length - 1)) && <WiredSpacer height={style.sectionSpacing} />}
        </Box>
    ));

    return (
        <WiredStyleProvider style={style}>
            <Frame
                id={id}
                variant="3"
                caption={title}
                tintColor={style.frameColor}
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                resizeDirection="none"
                rememberPosition={rememberLocation}
                centered={!openOffset && !xOffsetFromCenter}
                defaultPosition={centeredAt}
                onClose={onClose}
                contentLayout={{ paddingLeft: FRAME_MARGIN_SIDE, paddingRight: FRAME_MARGIN_SIDE, paddingTop: 0, paddingBottom: 0, marginBottom: 0 }}
                layout={{ position: 'absolute', width, height, minWidth: width, minHeight: height }}
            >
                <Box
                    ref={setContentNode}
                    layout={{ flexDirection: 'column', alignItems: 'stretch', width: contentWidth, flexShrink: 0 }}
                >
                    {scroll
                        ? (
                                <WiredScrollList
                                    minHeight={scroll.minHeight}
                                    maxHeight={scroll.maxHeight}
                                    spacing={0}
                                >
                                    {list}
                                </WiredScrollList>
                            )
                        : list}
                </Box>
            </Frame>
        </WiredStyleProvider>
    );
};
