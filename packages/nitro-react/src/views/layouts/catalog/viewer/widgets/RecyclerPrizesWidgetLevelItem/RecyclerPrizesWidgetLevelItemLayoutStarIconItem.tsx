import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `star_icon` of RecyclerPrizesWidgetLevelItemLayout - pass real rows through its `items…` slot. */
export interface RecyclerPrizesWidgetLevelItemLayoutStarIconItemProps {
    layout?: BoxLayout;
    srcStarIcon?: string;
}

export const RecyclerPrizesWidgetLevelItemLayoutStarIconItem = ({ layout, srcStarIcon }: RecyclerPrizesWidgetLevelItemLayoutStarIconItemProps) => {
    return (
        <ThemeImage
            name="star_icon"
            src={srcStarIcon ?? layoutImage('star_small_gold.png')}
            layout={{ width: 18, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
