/**
 * `wired_setup.uibuilder.presets.IconButtonPreset` - the style's `iconbutton_<icon>` template: a
 * small square container button around one arrow of the client's icon set (the slider's left
 * and right steppers, the list movers). Static width: the template's.
 */
import { Box, ContainerButton, Icon } from '#base/theme';

import { useWiredCaption } from './useWiredCaption';
import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredStyle } from './WiredStyleContext';

export type WiredIconButtonIcon = 'left' | 'right' | 'up' | 'down';

export interface WiredIconButtonProps {
    /** Which `iconbutton_<icon>` of the style. */
    icon: WiredIconButtonIcon;
    onPress: () => void;
    disabled?: boolean;
    /** A literal or `${key}`. */
    tooltip?: string;
}

export const WiredIconButton = ({ icon, onPress, disabled = false, tooltip }: WiredIconButtonProps) => {
    const { iconButton } = useWiredStyle().templates;
    const caption = useWiredCaption();
    const isDisabled = useWiredDisabled(disabled);
    const glyph = iconButton.icons[icon];

    return (
        <Box
            alpha={wiredDisabledAlpha(isDisabled)}
            layout={{ width: iconButton.size, height: iconButton.size, flexShrink: 0 }}
        >
            <ContainerButton
                variant={iconButton.variant}
                disabled={isDisabled}
                tooltip={tooltip ? caption(tooltip) : undefined}
                onPointerTap={onPress}
                layout={{ position: 'relative', width: iconButton.size, height: iconButton.size }}
            >
                <Icon
                    variant={glyph.icon}
                    tintColor={iconButton.iconTint}
                    layout={{ position: 'absolute', left: glyph.x, top: glyph.y }}
                />
            </ContainerButton>
        </Box>
    );
};
