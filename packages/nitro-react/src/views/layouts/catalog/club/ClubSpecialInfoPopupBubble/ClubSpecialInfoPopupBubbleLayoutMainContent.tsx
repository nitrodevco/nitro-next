import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

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
                layout={{ alignSelf: 'stretch', height: 120, flexShrink: 0 }}
            >
                <ThemeText
                    text={caption_247BhccenterBreakdownTitle7D ?? t('hccenter.breakdown.title')}
                    textStyle="text-style-u-bold"
                    name="%24%7Bhccenter.breakdown.title%7D"
                    layout={{ position: 'absolute', left: 0, right: 6, top: 0, height: 30 }}
                />
                <ThemeText
                    text={captionInfoCreditsspent ?? 'Lorem ipsum'}
                    name="info_creditsspent"
                    layout={{ position: 'absolute', left: 0, right: 6, top: 20, height: 30 }}
                />
                <ThemeText
                    text={captionInfoFactor ?? 'Lorem ipsum'}
                    name="info_factor"
                    layout={{ position: 'absolute', left: 0, right: 6, top: 40, height: 30 }}
                />
                <ThemeText
                    text={captionInfoStreakbonus ?? 'Lorem ipsum'}
                    name="info_streakbonus"
                    layout={{ position: 'absolute', left: 0, right: 6, top: 60, height: 30 }}
                />
                <Border
                    variant="1"
                    layout={{ position: 'absolute', left: 0, right: 6, top: 79, height: 1 }}
                />
                <ThemeText
                    text={captionInfoTotal ?? 'Lorem ipsum'}
                    name="info_total"
                    layout={{ position: 'absolute', left: 0, right: 6, bottom: 10, height: 30 }}
                />
                <Region
                    name="special_infolink"
                    layout={{ position: 'absolute', right: 11, width: 190, bottom: 3, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
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
