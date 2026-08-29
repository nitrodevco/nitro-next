import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `hdr_line` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutHdrLineItemProps {
    layout?: BoxLayout;
    srcHdrLine?: string;
}

export const PromoArticleLayoutHdrLineItem = ({ layout, srcHdrLine }: PromoArticleLayoutHdrLineItemProps) => {
    return (
        <ThemeImage
            name="hdr_line"
            src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
            layout={{ width: 500, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
