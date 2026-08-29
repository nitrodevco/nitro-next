import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `clubGiftWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutClubGifts_1639Layout); each passes its own placement through `layout`.
 */
/** Named region `gift_list` of ClubGiftWidget - configured through the parent's `giftList` prop. */
export interface ClubGiftWidgetGiftListProps {
    layout?: BoxLayout;
}

export const ClubGiftWidgetGiftList = ({ layout }: ClubGiftWidgetGiftListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 35, bottom: 16, ...layout }}
        >
            <Region
                name="gift_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `clubGiftWidget` of ClubGiftWidget - configured through the parent's `clubGiftWidget` prop. */
export interface ClubGiftWidgetProps extends CatalogWidgetFlags {
    captionInfoText?: string;
    captionPastClubDays?: string;
    captionPastVipDays?: string;
    giftList?: ClubGiftWidgetGiftListProps;
    layout?: BoxLayout;
}

export const ClubGiftWidget = ({ captionInfoText, captionPastClubDays, captionPastVipDays, giftList, layout }: ClubGiftWidgetProps) => {
    return (
        <Region
            name="clubGiftWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ClubGiftWidgetGiftList {...giftList} />
            <Region
                name="info_text"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfoText ?? 'lorem ipsum'}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                />
            </Region>
            <Region
                name="past_club_days"
                layout={{ position: 'absolute', left: 0, width: 360, bottom: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPastClubDays ?? 'lorem ipsum'}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 360, align: 'center' }}
                />
            </Region>
            <Region
                name="past_vip_days"
                visible={false}
                layout={{ position: 'absolute', left: 30, width: 310, bottom: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionPastVipDays ?? 'lorem ipsum'}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 310, align: 'right' }}
                />
            </Region>
        </Region>
    );
};
