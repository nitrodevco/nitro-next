import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `clubGiftWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutClubGifts_1639Layout); each passes its own placement through `layout`.
 */
/** Named region `clubGiftWidget` of ClubGiftWidget - configured through the parent's `clubGiftWidget` prop. */
export interface ClubGiftWidgetProps extends CatalogWidgetFlags {
    captionInfoText?: string;
    captionPastClubDays?: string;
    captionPastVipDays?: string;
    itemsGiftList?: ReactNode;
    layout?: BoxLayout;
    visiblePastVipDays?: boolean;
}

export const ClubGiftWidget = ({ captionInfoText, captionPastClubDays, captionPastVipDays, itemsGiftList, layout, visiblePastVipDays }: ClubGiftWidgetProps) => {
    return (
        <Region
            name="clubGiftWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, right: 0, top: 35, bottom: 16 }}
            >
                <Region
                    name="gift_list"
                    layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
                >
                    {itemsGiftList}
                </Region>
            </ScrollArea>
            <ThemeText
                text={captionInfoText ?? 'lorem ipsum'}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                name="info_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 35 }}
            />
            <ThemeText
                text={captionPastClubDays ?? 'lorem ipsum'}
                textStyle="text-style-u-small"
                textOptions={{ wordWrap: true, wordWrapWidth: 360, align: 'center' }}
                name="past_club_days"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 15 }}
            />
            {(visiblePastVipDays ?? false) && (
                <ThemeText
                    text={captionPastVipDays ?? 'lorem ipsum'}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 310, align: 'right' }}
                    name="past_vip_days"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 30, width: 310, bottom: 0, height: 15 }}
                />
            )}
        </Region>
    );
};
