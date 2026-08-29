import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `badges_rank_region` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutBadgesRankRegionItemProps {
    captionBadgesRankText?: string;
    layout?: BoxLayout;
    onBadgesRankRegion?: () => void;
    visibleBadgesRankRegion?: boolean;
}

export const UserViewLayoutBadgesRankRegionItem = ({ captionBadgesRankText, layout, onBadgesRankRegion, visibleBadgesRankRegion }: UserViewLayoutBadgesRankRegionItemProps) => {
    const t = useTranslation();

    return (
        (visibleBadgesRankRegion ?? false) && (
            <Region
                name="badges_rank_region"
                layout={{ width: 170, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
                onPointerTap={onBadgesRankRegion}
                cursor="pointer"
            >
                <ThemeText
                    text={captionBadgesRankText ?? t('infostand.text.badges_rank')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
                />
            </Region>
        )
    );
};
