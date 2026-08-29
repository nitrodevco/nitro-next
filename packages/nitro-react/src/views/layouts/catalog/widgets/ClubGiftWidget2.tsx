import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/**
 * Catalog widget `clubGiftWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutClubGifts_1639Layout); each passes its own placement through `layout`.
 */
/** Named region `gift_list` of ClubGiftWidget2 - configured through the parent's `giftList` prop. */
export interface ClubGiftWidget2GiftListProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ClubGiftWidget2GiftList = ({ layout, tags }: ClubGiftWidget2GiftListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 35, bottom: 16, ...layout }}
        >
            <Region
                name="gift_list"
                tags={tags}
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `clubGiftWidget` of ClubGiftWidget2 - configured through the parent's `clubGiftWidget` prop. */
export interface ClubGiftWidget2Props {
    captionInfoText?: string;
    captionPastClubDays?: string;
    captionPastVipDays?: string;
    giftList?: ClubGiftWidget2GiftListProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const ClubGiftWidget2 = ({ captionInfoText, captionPastClubDays, captionPastVipDays, giftList, layout, tags }: ClubGiftWidget2Props) => {
    return (
        <Region
            name="clubGiftWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <ClubGiftWidget2GiftList {...giftList} />
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
