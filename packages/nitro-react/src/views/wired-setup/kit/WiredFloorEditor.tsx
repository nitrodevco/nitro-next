/**
 * `uibuilder/presets/applications/FloorEditorPreset` - the frame around a floor drawing: the
 * row of tool buttons the element built (`AssetButtonRowPreset`) above a panel in the style's
 * advanced background colour (`border_view`, a border of skin 2), in which the drawing - the
 * child, which has a static width - is centred with 5px above and below.
 */
import { ReactNode } from 'react';

import { Border } from '#base/theme';

import { wiredFillLayout } from './useWiredFillLayout';
import { WiredCenteredContainer } from './WiredCenteredContainer';
import { WiredSimpleList } from './WiredSimpleList';
import { useWiredStyle } from './WiredStyleContext';

/** `createCenteredContainerPreset(drawing, 5, border)`. */
const DRAWING_MARGIN = 5;

export interface WiredFloorEditorProps {
    /** The tool button row (`WiredAssetButtonRow`). */
    buttons: ReactNode;
    /** The `WiredFloorDrawing`. */
    children?: ReactNode;
}

export const WiredFloorEditor = ({ buttons, children }: WiredFloorEditorProps) => {
    const style = useWiredStyle();

    return (
        <WiredSimpleList spacing={style.genericVerticalSpacing}>
            {buttons}
            <Border
                variant="2"
                tintColor={style.advancedBackgroundColor}
                layout={{ flexDirection: 'column', flexShrink: 0, ...wiredFillLayout('column') }}
            >
                <WiredCenteredContainer margin={DRAWING_MARGIN}>
                    {children}
                </WiredCenteredContainer>
            </Border>
        </WiredSimpleList>
    );
};
