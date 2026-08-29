import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `border_bar` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutBorderBarItemProps {
    layout?: BoxLayout;
    srcBorderBar?: string;
}

export const PromoArticleLayoutBorderBarItem = ({ layout, srcBorderBar }: PromoArticleLayoutBorderBarItemProps) => {
    return (
        <ThemeImage
            name="border_bar"
            src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
            layout={{ width: 12, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
