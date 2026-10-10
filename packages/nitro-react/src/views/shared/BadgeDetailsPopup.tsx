/**
 * The badge details window two views show while the pointer is over a badge - the infostand's
 * (`InfoStandUserView`, `habbo-room-ui-com/badge_details`) and the extended profile's
 * (`ExtendedProfileWindowCtrl`, `habbo-groups-com/extended_profile_badge_details`), each built
 * from its own layout and filled by its `populateBadgeDetails`:
 *
 * - the badge's name and description (`useBadgeDetails`), the description hidden when there is none;
 * - with the slot's `SelectedBadgeData`, `rarity_tag` - the rarity text in white (`rarity`, and the
 *   same text in `rarity_border`) on the tier's colour - and `owner_count`;
 * - `details_list.arrangeListItems()` and the window `details_list.y + details_list.height + 6` high.
 *
 * It opens on the desktop beside the badge (`getGlobalRectangle`) - the infostand's with its right
 * edge on the badge's left, the profile's with its left edge on the badge's right - centred on the
 * badge's height.
 */
import { Container as PixiContainer } from 'pixi.js';
import { useState } from 'react';

import { Box, FloatingPopup, GlobalRect, TemplateBindings, TemplateWindow, TemplateWindows, useLayoutSize } from '#base/theme';

import { BadgeDetails } from './useBadgeDetails';

/** Both details layouts' width, which a window left of its badge is placed by. */
const DETAILS_WIDTH = 263;

/** `populateBadgeDetails`: the window ends this far under `details_list`. */
const DETAILS_BOTTOM_SPACING = 6;

/** `rarity.textColor = 16777215`. */
const RARITY_TEXT_COLOR = 0xffffff;

export interface BadgeDetailsPopupProps {
    /** The details layout: `badge_details` or `extended_profile_badge_details`. */
    templateId: string;
    /** The badge's global rect. */
    anchor: GlobalRect;
    /** Which side of the badge the window opens on. */
    side: 'left' | 'right';
    details: BadgeDetails;
}

export const BadgeDetailsPopup = ({ templateId, anchor, side, details }: BadgeDetailsPopupProps) => {
    const [ node, setNode ] = useState<PixiContainer | null>(null);
    const size = useLayoutSize(node);

    const bindings: TemplateBindings = {
        name: { caption: details.name },
        description: { visible: !!details.description.length, caption: details.description },
        rarity_tag: details.rarity ? { visible: true, color: details.rarity.color } : { visible: false },
        rarity_border: { caption: details.rarity?.text ?? '' },
        rarity: { caption: details.rarity?.text ?? '', color: RARITY_TEXT_COLOR },
        owner_count: { visible: details.ownerCount !== undefined, caption: details.ownerCount ?? '' },
    };

    const arrange = ({ find, root }: TemplateWindows) => {
        const list = find('details_list');

        if (list) root()?.setHeight(list.y + list.height + DETAILS_BOTTOM_SPACING);
    };

    return (
        <FloatingPopup
            x={Math.trunc((side === 'left') ? (anchor.x - DETAILS_WIDTH) : (anchor.x + anchor.width))}
            y={Math.trunc(anchor.y + ((anchor.height - size.height) / 2))}
            onOutsideClick={() => undefined}
        >
            <Box
                ref={setNode}
                eventMode="none"
                layout={{ flexDirection: 'column' }}
            >
                <TemplateWindow
                    id={templateId}
                    bindings={bindings}
                    arrange={arrange}
                />
            </Box>
        </FloatingPopup>
    );
};
