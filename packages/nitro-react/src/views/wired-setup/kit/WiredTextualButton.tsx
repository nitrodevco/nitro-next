/**
 * `wired_setup.uibuilder.presets.TextualButtonPreset` - an underlined one-line text that is
 * clicked like a link (`TextParam(MODE_STRETCH, false, 0, underline = true)` in a clickable
 * container). Static width: the text's.
 */
import { Region } from '#base/theme';

import { useWiredDisabled } from './useWiredDisabled';
import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { WiredText } from './WiredText';

export interface WiredTextualButtonProps {
    /** A literal or Flash's `${localization.key}` form. */
    text: string;
    onPress: () => void;
    disabled?: boolean;
    /** `TextParam.textColor`. */
    color?: string | null;
}

export const WiredTextualButton = ({ text, onPress, disabled = false, color }: WiredTextualButtonProps) => {
    const isDisabled = useWiredDisabled(disabled);
    const fillLayout = useWiredFillLayout('content');

    return (
        <Region
            cursor="pointer"
            disabled={isDisabled}
            onPointerTap={onPress}
            layout={{ flexDirection: 'row', ...fillLayout }}
        >
            <WiredFlow direction="row">
                <WiredText
                    text={text}
                    mode="stretch"
                    underline
                    color={color}
                    disabled={disabled}
                />
            </WiredFlow>
        </Region>
    );
};
