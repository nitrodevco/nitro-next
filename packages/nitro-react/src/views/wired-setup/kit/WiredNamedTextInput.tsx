/**
 * `wired_setup.uibuilder.presets.combinations.NamedTextInputPreset` - a one-line name
 * (`TextParam(MODE_STRETCH, bold)`) and a `WiredTextInput`, `genericHorizontalSpacing` apart.
 * The name is lowered by the style's `namedInputOffset` (Flash sets `namedTextYOffset` and then
 * overwrites it with that). The input takes what the name leaves, unless it has a static width
 * (`TextInputParam.width` of 0 or more) - then the pair has a static width too.
 *
 * `nameWidth` pins the name's width, which is how a box lines several of these up.
 */
import { Box } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { useWiredStyle } from './WiredStyleContext';
import { WiredText } from './WiredText';
import { WiredTextInput, WiredTextInputProps } from './WiredTextInput';

export interface WiredNamedTextInputProps extends WiredTextInputProps {
    /** The name - a literal or `${key}`. */
    name: string;
    /** The constructor's `param6`: the name in bold. Default `false`. */
    bold?: boolean;
    /** `nameWidth`. */
    nameWidth?: number;
}

export const WiredNamedTextInput = ({ name, bold = false, nameWidth, width = -1, ...input }: WiredNamedTextInputProps) => {
    const style = useWiredStyle();
    const fillLayout = useWiredFillLayout((width >= 0) ? 'content' : undefined);

    return (
        <Box layout={{ flexDirection: 'row', alignItems: 'flex-start', gap: style.genericHorizontalSpacing, flexShrink: 0, ...fillLayout }}>
            <WiredFlow direction="row">
                <WiredText
                    text={name}
                    bold={bold}
                    mode="stretch"
                    width={nameWidth}
                    layout={{ marginTop: style.namedInputOffset }}
                />
                <WiredTextInput
                    width={width}
                    {...input}
                />
            </WiredFlow>
        </Box>
    );
};
