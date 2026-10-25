/**
 * `wired_setup.uibuilder.presets.combinations.NamedDropdownPreset` - a one-line name
 * (`TextParam(MODE_STRETCH, bold)`) and a `WiredDropdown` in a row list centred on its height,
 * `genericVerticalSpacing` apart (the list's default row gap). The centring overrides the
 * `namedDropdownOffset` Flash sets on the name first. The dropdown takes what the name leaves,
 * unless it has a static width - then the pair has one too.
 *
 * `nameWidth` pins the name's width, which is how a box lines several of these up.
 */
import { WiredDropdown, WiredDropdownProps } from './WiredDropdown';
import { WiredSimpleList } from './WiredSimpleList';
import { WiredText } from './WiredText';

export interface WiredNamedDropdownProps extends WiredDropdownProps {
    /** The name - a literal or `${key}`. */
    name: string;
    /** The constructor's `param6`: the name in bold. Default `false`. */
    bold?: boolean;
    /** `nameWidth`. */
    nameWidth?: number;
}

export const WiredNamedDropdown = ({ name, bold = false, nameWidth, width = -1, ...dropdown }: WiredNamedDropdownProps) => {
    return (
        <WiredSimpleList
            vertical={false}
            centerVertically
            staticWidth={(width >= 0) ? 'content' : undefined}
        >
            <WiredText
                text={name}
                bold={bold}
                mode="stretch"
                width={nameWidth}
            />
            <WiredDropdown
                width={width}
                {...dropdown}
            />
        </WiredSimpleList>
    );
};
