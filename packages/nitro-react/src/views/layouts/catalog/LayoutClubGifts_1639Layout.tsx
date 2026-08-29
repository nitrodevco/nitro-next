import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1639_layout_club_gifts_xml` (layout "ctlg_presents", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubGifts_1639LayoutProps {
    ctlgPresents?: LayoutClubGifts_1639LayoutCtlgPresentsProps;
    layout?: BoxLayout;
}

export const LayoutClubGifts_1639Layout = ({ ctlgPresents, layout }: LayoutClubGifts_1639LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutClubGifts_1639LayoutCtlgPresents {...ctlgPresents} />
        </Region>
    );
};

/** Named region `gift_list` of LayoutClubGifts_1639Layout - configured through the parent's `giftList` prop. */
export interface LayoutClubGifts_1639LayoutGiftListProps {
    layout?: BoxLayout;
}

export const LayoutClubGifts_1639LayoutGiftList = ({ layout }: LayoutClubGifts_1639LayoutGiftListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 35, bottom: 16, ...layout }}
        >
            <Region
                name="gift_list"
                params={2064}
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `clubGiftWidget` of LayoutClubGifts_1639Layout - configured through the parent's `clubGiftWidget` prop. */
export interface LayoutClubGifts_1639LayoutClubGiftWidgetProps {
    captionInfoText?: string;
    captionPastClubDays?: string;
    captionPastVipDays?: string;
    giftList?: LayoutClubGifts_1639LayoutGiftListProps;
    layout?: BoxLayout;
}

export const LayoutClubGifts_1639LayoutClubGiftWidget = ({ captionInfoText, captionPastClubDays, captionPastVipDays, giftList, layout }: LayoutClubGifts_1639LayoutClubGiftWidgetProps) => {
    return (
        <Region
            name="clubGiftWidget"
            tags={[ 'EMBEDDED' ]}
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutClubGifts_1639LayoutGiftList {...giftList} />
            <Region
                name="info_text"
                params={16}
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
                params={1040}
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
                params={1040}
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

/** Named region `ctlg_presents` of LayoutClubGifts_1639Layout - configured through the parent's `ctlgPresents` prop. */
export interface LayoutClubGifts_1639LayoutCtlgPresentsProps {
    clubGiftWidget?: LayoutClubGifts_1639LayoutClubGiftWidgetProps;
    layout?: BoxLayout;
}

export const LayoutClubGifts_1639LayoutCtlgPresents = ({ clubGiftWidget, layout }: LayoutClubGifts_1639LayoutCtlgPresentsProps) => {
    return (
        <Region
            name="ctlg_presents"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <LayoutClubGifts_1639LayoutClubGiftWidget {...clubGiftWidget} />
        </Region>
    );
};
