import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1631_clubGiftWidget_xml` (layout "clubGiftWidget", 340x320) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubGiftWidgetLayoutProps {
    layout?: BoxLayout;
    widgetMainContainer?: ClubGiftWidgetLayoutWidgetMainContainerProps;
}

export const ClubGiftWidgetLayout = ({ layout, widgetMainContainer }: ClubGiftWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 340, height: 320, ...layout }}>
            <ClubGiftWidgetLayoutWidgetMainContainer {...widgetMainContainer} />
        </Region>
    );
};

/** Named region `gift_list` of ClubGiftWidgetLayout - configured through the parent's `giftList` prop. */
export interface ClubGiftWidgetLayoutGiftListProps {
    layout?: BoxLayout;
}

export const ClubGiftWidgetLayoutGiftList = ({ layout }: ClubGiftWidgetLayoutGiftListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 340, top: 35, bottom: 16, ...layout }}
        >
            <Region
                name="gift_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `widget_main_container` of ClubGiftWidgetLayout - configured through the parent's `widgetMainContainer` prop. */
export interface ClubGiftWidgetLayoutWidgetMainContainerProps {
    captionInfoText?: string;
    captionPastClubDays?: string;
    captionPastVipDays?: string;
    giftList?: ClubGiftWidgetLayoutGiftListProps;
    layout?: BoxLayout;
}

export const ClubGiftWidgetLayoutWidgetMainContainer = ({ captionInfoText, captionPastClubDays, captionPastVipDays, giftList, layout }: ClubGiftWidgetLayoutWidgetMainContainerProps) => {
    return (
        <Region
            name="widget_main_container"
            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 320, ...layout }}
        >
            <ClubGiftWidgetLayoutGiftList {...giftList} />
            <Region
                name="info_text"
                layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInfoText ?? 'lorem ipsum'}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
                />
            </Region>
            <Region
                name="past_club_days"
                layout={{ position: 'absolute', left: 0, width: 340, top: 305, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPastClubDays ?? 'lorem ipsum'}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 340, align: 'center' }}
                />
            </Region>
            <Region
                name="past_vip_days"
                visible={false}
                layout={{ position: 'absolute', left: 30, width: 310, top: 305, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
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
