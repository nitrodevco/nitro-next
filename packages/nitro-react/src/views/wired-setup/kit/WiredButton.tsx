/**
 * `wired_setup.uibuilder.presets.ButtonPreset` - the style's `button` template with a caption.
 *
 * `kind` is the constructor's mode: `WIRED_BUTTON_SCALE` (`MODE_SCALE`, the default) makes the
 * button as wide as the room it is given - in a `WiredButtonRow` the buttons share the row -
 * and `WIRED_BUTTON_STRETCH` (`MODE_STRETCH`) keeps it as wide as its caption needs, which is a
 * static width.
 */
import { Box, Button } from '#base/theme';

import { useWiredCaption } from './useWiredCaption';
import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredFillLayout } from './useWiredFillLayout';
import { WIRED_BUTTON_SCALE, WIRED_BUTTON_STRETCH } from './wiredButtonModes';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredButtonProps {
    /** `buttonText` - a literal or Flash's `${localization.key}` form. */
    label: string;
    onPress: () => void;
    disabled?: boolean;
    /** `ButtonPreset.MODE_SCALE` (0, the default) or `MODE_STRETCH` (1) - see `wiredButtonModes`. */
    kind?: number;
    /** A literal or `${key}`. */
    tooltip?: string;
}

export const WiredButton = ({ label, onPress, disabled = false, kind = WIRED_BUTTON_SCALE, tooltip }: WiredButtonProps) => {
    const { button } = useWiredStyle().templates;
    const caption = useWiredCaption();
    const isDisabled = useWiredDisabled(disabled);
    const stretches = (kind === WIRED_BUTTON_STRETCH);
    const fillLayout = useWiredFillLayout(stretches ? 'content' : undefined);

    return (
        <Box
            alpha={wiredDisabledAlpha(isDisabled)}
            layout={{ flexDirection: 'row', flexShrink: 0, ...fillLayout }}
        >
            <Button
                variant={button.variant}
                textStyle={button.textStyle}
                disabled={isDisabled}
                tooltip={tooltip ? caption(tooltip) : undefined}
                onPointerTap={onPress}
                layout={{ height: button.height, minHeight: button.height, minWidth: button.width, flexGrow: stretches ? 0 : 1, flexShrink: 0 }}
            >
                {caption(label)}
            </Button>
        </Box>
    );
};
