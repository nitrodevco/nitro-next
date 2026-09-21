import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, Button, CheckBox, Frame, TextInput, ThemeText } from '#base/theme';

/** The helper tops out at ten tiles, the height Flash's slider could reach. */
const MAX_HEIGHT = 10;
const STEP = 0.1;

export interface FurnitureStackHeightViewProps {
    height: number;
    multiWalkMode: boolean;
    onApply: (height: number, multiWalkMode: boolean) => void;
    /** Hands the tile back to normal stacking, the layout's "place on top". */
    onAboveStack: () => void;
    onClose: () => void;
}

const clamp = (height: number) => Math.min(Math.max(Number.isNaN(height) ? 0 : height, 0), MAX_HEIGHT);

/**
 * The stacking helper, on the `custom_stack_height` layout (320x210): a height in tiles, the
 * nudges either side of it, and the two shortcuts - back to normal stacking, or flat on the
 * floor. Heights go out in hundredths of a tile, so 1.5 tiles is 150 on the wire.
 */
export const FurnitureStackHeightView = ({ height, multiWalkMode, onApply, onAboveStack, onClose }: FurnitureStackHeightViewProps) => {
    const [ draft, setDraft ] = useState<string>(height.toString());
    const [ lastHeight, setLastHeight ] = useState<number>(height);
    const [ multiWalk, setMultiWalk ] = useState<boolean>(multiWalkMode);
    const t = useTranslation();

    // The server's own height wins whenever it changes under us.
    if (height !== lastHeight) {
        setLastHeight(height);
        setDraft(height.toString());
    }

    const applyHeight = (value: number) => {
        const next = clamp(value);

        setDraft(next.toString());
        onApply(next, multiWalk);
    };

    return (
        <Frame
            variant="0"
            id="furniture-stack-height"
            caption={t('widget.custom.stack.height.title')}
            onClose={onClose}
            defaultPosition={{ x: 90, y: 90 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 320, height: 210 }}
        >
            <ThemeText
                text={t('widget.custom.stack.height.text')}
                textStyle="il_regular"
                textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 294 }}
                verticalAlign="top"
                layout={{ width: 294, height: 45, marginBottom: 6 }}
            />
            <Box layout={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                <Button
                    variant="0"
                    onPointerTap={() => applyHeight(clamp(parseFloat(draft)) - STEP)}
                    layout={{ width: 24, height: 24 }}
                >
                    -
                </Button>
                <Border
                    variant="0"
                    layout={{ width: 58, height: 26, paddingLeft: 6, paddingRight: 6 }}
                >
                    <TextInput
                        value={draft}
                        onChange={setDraft}
                        onEnter={() => applyHeight(parseFloat(draft))}
                        onFocusChange={focused => !focused && applyHeight(parseFloat(draft))}
                        maxLength={5}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Border>
                <Button
                    variant="0"
                    onPointerTap={() => applyHeight(clamp(parseFloat(draft)) + STEP)}
                    layout={{ width: 24, height: 24 }}
                >
                    +
                </Button>
            </Box>
            <Box layout={{ flexDirection: 'row', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                <Button
                    variant="0"
                    onPointerTap={onAboveStack}
                    layout={{ width: 134, height: 24 }}
                >
                    {t('furniture.above.stack')}
                </Button>
                <Button
                    variant="0"
                    onPointerTap={() => applyHeight(0)}
                    layout={{ width: 126, height: 24 }}
                >
                    {t('furniture.floor.level')}
                </Button>
            </Box>
            <Box layout={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                <CheckBox
                    variant="0"
                    selected={multiWalk}
                    onPointerTap={() => {
                        setMultiWalk(!multiWalk);
                        onApply(clamp(parseFloat(draft)), !multiWalk);
                    }}
                    layout={{ width: 17, height: 16 }}
                />
                <ThemeText
                    text={t('widget.custom.multiwalk_mode.text')}
                    textStyle="il_regular"
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 282 }}
                    verticalAlign="top"
                    layout={{ width: 282, height: 28 }}
                />
            </Box>
        </Frame>
    );
};
