/**
 * `addons/variablefx/presets/VariableFxPreviewBlockPreset` - the 112px high block around the live
 * preview (`growing_container_view`): the bold soft "preview" title at (6, 6), the soft
 * `wiredfurni.params.variablefx.preview.zoom` label (`%level%` = the preview's zoom) right-aligned
 * 6px from the edge on the same line (the title wraps in what it leaves, `genericHorizontalSpacing`
 * apart), the preview centred, and the `variablefx_randomize` asset button 5px from the bottom
 * right corner.
 *
 * The block owns the preview's controller: the randomize button calls it straight away (Flash's
 * `onRandomizePreview`, whose `applyToState` + `sanitize` are no-ops on an already sanitised state)
 * and the zoom label follows its snapshot.
 */
import { useState, useSyncExternalStore } from 'react';

import { Box } from '#base/theme';
import { VariableFxPreviewController, VariableFxState, WiredElementContext } from '#base/wired';

import { WiredAssetButton } from '../../../../kit/WiredAssetButton';
import { WiredSimpleList } from '../../../../kit/WiredSimpleList';
import { useWiredStyle } from '../../../../kit/WiredStyleContext';
import { WiredText } from '../../../../kit/WiredText';
import { VariableFxPreview } from './VariableFxPreview';

/** `HEIGHT` and the insets of `resizeToWidth`. */
const HEIGHT = 112;
const TITLE_INSET = 6;
const ZOOM_RIGHT = 6;
const BUTTON_RIGHT = 5;
const BUTTON_BOTTOM = 5;

export interface VariableFxPreviewBlockProps {
    state: VariableFxState;
    refreshKey: string;
    ctx: WiredElementContext;
}

export const VariableFxPreviewBlock = ({ state, refreshKey, ctx }: VariableFxPreviewBlockProps) => {
    const style = useWiredStyle();
    const [ controller ] = useState(() => new VariableFxPreviewController());
    const { zoom } = useSyncExternalStore(controller.subscribe, controller.getSnapshot);

    return (
        <Box layout={{ position: 'relative', height: HEIGHT, flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>
            <VariableFxPreview
                controller={controller}
                state={state}
                refreshKey={refreshKey}
            />
            <Box layout={{ position: 'absolute', left: TITLE_INSET, right: ZOOM_RIGHT, top: TITLE_INSET, flexDirection: 'column', alignItems: 'stretch' }}>
                <WiredSimpleList
                    vertical={false}
                    spacing={style.genericHorizontalSpacing}
                >
                    <WiredText
                        text="${wiredfurni.params.variablefx.preview}"
                        bold
                        color={style.softTextColor}
                    />
                    <WiredText
                        text={ctx.localize('wiredfurni.params.variablefx.preview.zoom', { level: String(zoom) })}
                        mode="stretch"
                        color={style.softTextColor}
                    />
                </WiredSimpleList>
            </Box>
            <Box layout={{ position: 'absolute', right: BUTTON_RIGHT, bottom: BUTTON_BOTTOM }}>
                <WiredAssetButton
                    asset="variablefx_randomize"
                    tooltip="${wiredfurni.params.variablefx.preview.randomize}"
                    onPress={() => controller.randomize(state)}
                />
            </Box>
        </Box>
    );
};
