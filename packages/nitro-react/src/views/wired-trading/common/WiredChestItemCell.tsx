/**
 * One 42x42 item cell of the wired trading grids - the `furni_template` region of
 * `furni_chest_contents_xml` (`FurniChestItemView`) and of `transaction_details_xml`
 * (`TransactionItemView`), with `FurniChestItemView.initChestBasedIconUI` filling it:
 *
 * - a style 5 border at 1,1 whose colour follows the pointer (`NOT_HOVERED_COLOR` `#cbcbcb`,
 *   hovered `#d6d6d6`), holding the furni's `product_icon`;
 * - a limited edition item gets the `unique_item_label_1` background at 2,2;
 * - a count above one shows in the 13x16 `number_container` badge at 27,2;
 * - `outline_focus` (`inventory_thumb_selected_outline`) marks the selected cell;
 * - `TransactionItemView` also has a coins cell (`coins_icon` at 7,11) and an "incomplete data"
 *   cell (`incomplete_text`, "+N" in 16px bold grey, 12px from 1000 up).
 *
 * The `limited_item_overlay_grid` / `rarity_item_overlay_grid` window widgets (the shining serial
 * plaque and the rarity flag drawn over the icon) are not ported in this client, so a limited
 * item shows its label background without the plaque, and a collectible no rarity flag.
 */
import type { IChestItemType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useWiredChestItemIconUrl } from '#base/hooks';
import { Border, Box, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

/** `FurniChestItemView.NOT_HOVERED_COLOR` / `§_-KJ§`. */
const NOT_HOVERED_COLOR = '#cbcbcb';
const HOVERED_COLOR = '#d6d6d6';
/** `number_container`'s colour, and its text's. */
const NUMBER_COLOR = '#2f6982';

export interface WiredChestItemCellProps {
    /** The furni shown; absent for the coins and "incomplete" cells. */
    itemType?: IChestItemType;
    /** `stuffData.uniqueSerialNumber > 0`: the limited edition background. */
    isLimited?: boolean;
    /** `numItems`: a badge from 2 up. */
    count: number;
    /** `outline_focus`: the cell is the selection. */
    active?: boolean;
    /** `TransactionItemView.TYPE_COINS`. */
    coins?: boolean;
    /** `TransactionItemView.TYPE_INCOMPLETE_DATA`: "+count" instead of an icon. */
    incomplete?: boolean;
    /** The region's `toolTipCaption`, already translated. */
    tooltip?: string;
    onPress?: () => void;
}

export const WiredChestItemCell = ({ itemType, isLimited = false, count, active = false, coins = false, incomplete = false, tooltip, onPress }: WiredChestItemCellProps) => {
    const [ hovered, setHovered ] = useState(false);
    const iconUrl = useWiredChestItemIconUrl(itemType);

    return (
        <Region
            tooltip={tooltip}
            cursor={onPress ? 'pointer' : undefined}
            onPointerTap={onPress}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            layout={{ position: 'relative', width: 42, height: 42, flexShrink: 0 }}
        >
            <Border
                variant="5"
                tintColor={hovered ? HOVERED_COLOR : NOT_HOVERED_COLOR}
                layout={{ position: 'absolute', left: 1, top: 1, width: 40, height: 40 }}
            >
                {coins && (
                    <ThemeImage
                        src={LayoutImage('wired/inventory_furni_icon_credits.png')}
                        layout={{ position: 'absolute', left: 7, top: 11, width: 25, height: 18 }}
                    />
                )}
                {isLimited && (
                    <ThemeImage
                        src={LayoutImage('shared/unique_item_label_1.png')}
                        layout={{ position: 'absolute', left: 2, top: 2 }}
                    />
                )}
                {(iconUrl !== '') && (
                    <Box layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeImage src={iconUrl} />
                    </Box>
                )}
                {!incomplete && (count > 1) && (
                    <Region
                        backgroundColor={NUMBER_COLOR}
                        layout={{ position: 'absolute', left: 27, top: 2, height: 16, minWidth: 13, paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 1 }}
                    >
                        <Region
                            backgroundColor="#ffffff"
                            layout={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 1, paddingRight: 1 }}
                        >
                            <ThemeText
                                text={String(count)}
                                textStyle="regular"
                                textOptions={{ fill: NUMBER_COLOR }}
                            />
                        </Region>
                    </Region>
                )}
                {incomplete && (
                    <ThemeText
                        text={`+${count}`}
                        textStyle="u_bold"
                        textOptions={{ fill: '#666666', fontSize: (count >= 1000) ? 12 : 16, align: 'center' }}
                        layout={{ position: 'absolute', left: 3, top: 9, width: 34, height: 21 }}
                    />
                )}
            </Border>
            {active && (
                <ThemeImage
                    src={LayoutImage('shared/inventory_thumb_selected_outline.png')}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            )}
        </Region>
    );
};
