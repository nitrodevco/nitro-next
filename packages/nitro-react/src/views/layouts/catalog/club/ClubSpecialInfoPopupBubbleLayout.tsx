import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Region, ThemeText } from '#base/theme';

/** Generated from `1565_club_special_info_popup_bubble_xml` (layout "room_info_popup_bubble", 374x146) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubSpecialInfoPopupBubbleLayoutProps {
    layout?: BoxLayout;
    mainContent?: ClubSpecialInfoPopupBubbleLayoutMainContentProps;
}

export const ClubSpecialInfoPopupBubbleLayout = ({ layout, mainContent }: ClubSpecialInfoPopupBubbleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 374, height: 146, ...layout }}>
            <Bubble
                variant="7"
                pointer="left"
                layout={{ position: 'absolute', left: 0, width: 374, top: 0, height: 146 }}
            >
                <ClubSpecialInfoPopupBubbleLayoutMainContent {...mainContent} />
            </Bubble>
        </Region>
    );
};

/** Named region `main_content` of ClubSpecialInfoPopupBubbleLayout - configured through the parent's `mainContent` prop. */
export interface ClubSpecialInfoPopupBubbleLayoutMainContentProps {
    caption_247BhccenterBreakdownTitle7D?: string;
    captionInfoCreditsspent?: string;
    captionInfoFactor?: string;
    captionInfoStreakbonus?: string;
    captionInfoTotal?: string;
    captionSpecialInfolink?: string;
    layout?: BoxLayout;
    onSpecialInfolink?: () => void;
}

export const ClubSpecialInfoPopupBubbleLayoutMainContent = ({ caption_247BhccenterBreakdownTitle7D, captionInfoCreditsspent, captionInfoFactor, captionInfoStreakbonus, captionInfoTotal, captionSpecialInfolink, layout, onSpecialInfolink }: ClubSpecialInfoPopupBubbleLayoutMainContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="main_content"
            layout={{ position: 'absolute', left: 11, width: 345, top: -21, height: 120, flexDirection: 'column', gap: 3, ...layout }}
        >
            <Border
                variant="3"
                tintColor="#eeeeee"
                layout={{ width: 346, height: 120, flexShrink: 0 }}
            >
                <Region
                    name="%24%7Bhccenter.breakdown.title%7D"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={caption_247BhccenterBreakdownTitle7D ?? t('hccenter.breakdown.title')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="info_creditsspent"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 20, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionInfoCreditsspent ?? 'Lorem ipsum'}
                </Region>
                <Region
                    name="info_factor"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 40, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionInfoFactor ?? 'Lorem ipsum'}
                </Region>
                <Region
                    name="info_streakbonus"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 60, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionInfoStreakbonus ?? 'Lorem ipsum'}
                </Region>
                <Border
                    variant="1"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 79, height: 1 }}
                />
                <Region
                    name="info_total"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 80, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionInfoTotal ?? 'Lorem ipsum'}
                </Region>
                <Region
                    name="special_infolink"
                    layout={{ position: 'absolute', right: 11, width: 190, top: 100, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                    onPointerTap={onSpecialInfolink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionSpecialInfolink ?? t('hccenter.special.infolink')}
                        textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 190, align: 'right' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
