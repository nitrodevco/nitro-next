/**
 * `WiredErrorInfoView` on `error_info_view_xml` - what an error of the monitor tab's log means:
 * its category's icon, its name, and the explanation `wiredmenu.error_info.<errorId>`. The window
 * grows with the explanation (`_window.height = contents.height + 48`). It belongs to the monitor
 * tab and goes when the menu's view does.
 */
import type { IWiredErrorLogsError } from '@nitrodevco/nitro-packets';
import { Container as PixiContainer } from 'pixi.js';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, Frame, LayoutImage, ThemeImage, ThemeText, useLayoutSize } from '#base/theme';

/** `contents`' `height_min` and the explanation's. */
const CONTENTS_MIN_HEIGHT = 100;
const TEXT_MIN_HEIGHT = 50;
const TEXT_TOP = 46;

export interface WiredErrorInfoViewProps {
    error: IWiredErrorLogsError;
    onClose: () => void;
}

export const WiredErrorInfoView = ({ error, onClose }: WiredErrorInfoViewProps) => {
    const t = useTranslation();
    const [ textNode, setTextNode ] = useState<PixiContainer | null>(null);
    const textSize = useLayoutSize(textNode);
    const contentsHeight = Math.max(CONTENTS_MIN_HEIGHT, TEXT_TOP + Math.max(TEXT_MIN_HEIGHT, textSize.height));

    return (
        <Frame
            variant="3"
            id="wired_error_info"
            caption={t('wiredmenu.error_info.title', 'wiredmenu.error_info.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            defaultPosition={{ x: 35, y: 30 }}
            onClose={onClose}
            layout={{ position: 'absolute', width: 337, height: contentsHeight + 48 }}
        >
            <Box layout={{ position: 'absolute', left: 8, top: 3, width: 320, height: contentsHeight }}>
                <ThemeImage
                    src={LayoutImage(`wired/icon_wired_${error.category.toLowerCase()}.png`)}
                    layout={{ position: 'absolute', left: 280, top: 0 }}
                />
                <ThemeText
                    text={error.errorName}
                    textStyle="u_bold"
                    textOptions={{ fill: '#000000' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 109, top: 11, height: 17 }}
                />
                <Box
                    ref={setTextNode}
                    layout={{ position: 'absolute', left: 0, top: TEXT_TOP, width: 319 }}
                >
                    <ThemeText
                        text={t(`wiredmenu.error_info.${error.errorId}`, `wiredmenu.error_info.${error.errorId}`)}
                        textStyle="u_regular"
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 315 }}
                        verticalAlign="top"
                    />
                </Box>
            </Box>
        </Frame>
    );
};
