/**
 * `uibuilder/presets/MiniIconDropdownPreset` (WIN63-202610121624) - a mini asset icon button
 * that opens a dropdown's list: the dropdown itself is never shown, it sits right-aligned under
 * the button (`x = button width - dropdown width`, `y = button height`) and a press on the button
 * opens its list (`requestOpen`). The box is the button's size; `asset` is the button's icon, which
 * the owner swaps with the selection (`assetName`).
 */
import { useState } from 'react';

import { Box } from '#base/theme';
import { WiredDropdownOption } from '#base/wired';

import { WiredDropdown } from './WiredDropdown';
import { WiredMiniAssetIconButton } from './WiredMiniAssetIconButton';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredMiniIconDropdownProps {
    options: readonly WiredDropdownOption[];
    selected: number;
    onSelect: (id: number) => void;
    /** `DropdownParam`'s width - the list's. */
    width: number;
    asset: string;
    /** A literal or `${key}`. */
    tooltip?: string;
}

export const WiredMiniIconDropdown = ({ options, selected, onSelect, width, asset, tooltip }: WiredMiniIconDropdownProps) => {
    const style = useWiredStyle();
    const template = style.templates.miniButton;
    const [ openRequest, setOpenRequest ] = useState(0);
    const buttonWidth = (template.kind === 'flat') ? template.width : template.size;
    const buttonHeight = (template.kind === 'flat') ? template.height : template.size;

    return (
        <Box layout={{ position: 'relative', width: buttonWidth, height: buttonHeight, flexShrink: 0 }}>
            <Box layout={{ position: 'absolute', left: buttonWidth - width, top: buttonHeight, width }}>
                <WiredDropdown
                    options={options}
                    selected={selected}
                    onSelect={onSelect}
                    width={width}
                    visible={false}
                    openRequest={openRequest}
                />
            </Box>
            <WiredMiniAssetIconButton
                asset={asset}
                tooltip={tooltip}
                onPress={() => setOpenRequest(request => request + 1)}
            />
        </Box>
    );
};
