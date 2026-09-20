/**
 * The frame's quick menu - `presets/menu/MenuPreset` with the items `FramePreset.createMenuPreset`
 * gives it, drawn from the style's `quick_menu` template: a black outline around two tinted
 * borders, one `itemHeight` row per `MenuItem` (a checkbox at the template's place for the one
 * item that has it, the caption at `x = 28`), and a 3px ruled `SPACER` between groups. The menu is
 * as wide as its widest caption plus `menuRightOffset` (`requestedMinWidth`).
 *
 * A row is highlighted under the pointer unless disabled (`MenuItemView.updateUI`); a click on a
 * row without a checkbox runs it and closes the menu, a click on the checkbox row flips the box
 * and keeps it open. Clicking anywhere else closes it (`WE_DEACTIVATED`).
 */
import { Container } from 'pixi.js';
import { Fragment, useRef, useState } from 'react';

import { Border, Box, CheckBox, Region, useOutsideClick } from '#base/theme';
import { WiredStyle } from '#base/wired';

import { useWiredCaption } from './kit/useWiredCaption';
import { WiredDisabled } from './kit/WiredDisabled';
import { WiredText } from './kit/WiredText';

/** `MenuItem` - a `SPACER` is `null`. */
export interface WiredSetupQuickMenuItem {
    /** A `${key}` caption, or a literal (`Erase from existence`). */
    name: string;
    onClick: () => void;
    tooltip?: string;
    /** The item's checkbox state, for the one item that has a checkbox. */
    checked?: boolean;
    disabled?: boolean;
}

export interface WiredSetupQuickMenuProps {
    style: WiredStyle;
    items: (WiredSetupQuickMenuItem | null)[];
    onClose: () => void;
}

const MenuRow = ({ style, item, onClose }: { style: WiredStyle; item: WiredSetupQuickMenuItem; onClose: () => void }) => {
    const { quickMenu } = style.templates;
    const caption = useWiredCaption();
    const [ hovered, setHovered ] = useState(false);
    const disabled = item.disabled ?? false;
    const hasCheckbox = item.checked !== undefined;

    const onTap = () => {
        if (disabled) return;

        item.onClick();

        if (!hasCheckbox) onClose();
    };

    return (
        <Region
            tooltip={item.tooltip && caption(item.tooltip)}
            backgroundColor={(hovered && !disabled) ? quickMenu.itemHoverColor : undefined}
            cursor={disabled ? undefined : 'pointer'}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerTap={onTap}
            layout={{ position: 'relative', height: quickMenu.itemHeight, paddingLeft: quickMenu.text.x, paddingTop: quickMenu.text.y, paddingRight: style.menuRightOffset, flexShrink: 0 }}
        >
            <WiredDisabled disabled={disabled}>
                {hasCheckbox && (
                    <CheckBox
                        variant={quickMenu.checkbox.variant}
                        selected={item.checked}
                        disabled={disabled}
                        layout={{ position: 'absolute', left: quickMenu.checkbox.x, top: quickMenu.checkbox.y, width: quickMenu.checkbox.width, height: quickMenu.checkbox.height }}
                    />
                )}
                <WiredText
                    text={item.name}
                    wrap={false}
                    color={quickMenu.text.color}
                />
            </WiredDisabled>
        </Region>
    );
};

export const WiredSetupQuickMenu = ({ style, items, onClose }: WiredSetupQuickMenuProps) => {
    const { quickMenu } = style.templates;
    const ref = useRef<Container>(null);

    useOutsideClick(ref, onClose);

    return (
        <Region
            ref={ref}
            backgroundColor="#000000"
            layout={{ flexDirection: 'column', padding: 1, alignSelf: 'flex-start' }}
        >
            <Border
                variant={quickMenu.outerBorderVariant}
                tintColor={quickMenu.outerBorderColor ?? undefined}
                layout={{ flexDirection: 'column', padding: 1 }}
            >
                <Border
                    variant={quickMenu.innerBorderVariant}
                    tintColor={quickMenu.innerBorderColor ?? undefined}
                    layout={{ flexDirection: 'column' }}
                >
                    {items.map((item, index) => (
                        <Fragment key={index}>
                            {item
                                ? (
                                        <MenuRow
                                            style={style}
                                            item={item}
                                            onClose={onClose}
                                        />
                                    )
                                : (
                                        <Box layout={{ height: quickMenu.spacerHeight, flexShrink: 0, paddingLeft: quickMenu.spacerLineInset, paddingRight: quickMenu.spacerLineInset, paddingTop: 1 }}>
                                            <Region
                                                backgroundColor={quickMenu.spacerLineColor}
                                                layout={{ height: 1, flexGrow: 1 }}
                                            />
                                        </Box>
                                    )}
                        </Fragment>
                    ))}
                </Border>
            </Border>
        </Region>
    );
};
