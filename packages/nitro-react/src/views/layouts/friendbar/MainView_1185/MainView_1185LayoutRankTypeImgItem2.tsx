import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `rank_type_img` of MainView_1185Layout - pass real rows through its `items…` slot. */
export interface MainView_1185LayoutRankTypeImgItem2Props {
    layout?: BoxLayout;
    srcRankTypeImg?: string;
}

export const MainView_1185LayoutRankTypeImgItem2 = ({ layout, srcRankTypeImg }: MainView_1185LayoutRankTypeImgItem2Props) => {
    return (
        <ThemeImage
            name="rank_type_img"
            src={srcRankTypeImg ?? layoutImage('badge_rarity_badges_emblem_unique.png')}
            layout={{ width: 25, height: 25, flexShrink: 0, ...layout }}
        />
    );
};
