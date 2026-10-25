/**
 * `wired_setup.uibuilder.presets.combinations.NamedNumberInputPreset` - a one-line name
 * (`TextParam(MODE_STRETCH, bold)`) and a `WiredNumberInput`, `genericHorizontalSpacing` apart.
 * The name is lowered by the style's `namedInputOffset` (Flash sets `namedTextYOffset` and then
 * overwrites it with that). The input takes what the name leaves, unless it has a static width -
 * then the pair is as wide as both and has a static width itself.
 *
 * `nameWidth` pins the name's width, which is how a box lines several of these up.
 */
import { Box } from '#base/theme';

import { useWiredFillLayout } from './useWiredFillLayout';
import { WiredFlow } from './WiredFlow';
import { WiredNumberInput, WiredNumberInputProps } from './WiredNumberInput';
import { useWiredStyle } from './WiredStyleContext';
import { WiredText } from './WiredText';

export interface WiredNamedNumberInputProps extends WiredNumberInputProps {
    /** The name - a literal or `${key}`. */
    name: string;
    /** The constructor's `param6`: the name in bold. Default `false`. */
    bold?: boolean;
    /** `nameWidth`. */
    nameWidth?: number;
}

export const WiredNamedNumberInput = ({ name, bold = false, nameWidth, width = 45, ...input }: WiredNamedNumberInputProps) => {
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
                <WiredNumberInput
                    width={width}
                    {...input}
                />
            </WiredFlow>
        </Box>
    );
};
