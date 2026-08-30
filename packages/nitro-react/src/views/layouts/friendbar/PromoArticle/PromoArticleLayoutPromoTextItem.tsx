import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `promo_text` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutPromoTextItemProps {
    captionPromoText?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const PromoArticleLayoutPromoTextItem = ({ captionPromoText, colorableTextColor, layout }: PromoArticleLayoutPromoTextItemProps) => {
    return (
        <ThemeText
            text={captionPromoText ?? ''}
            textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 330 }}
            name="promo_text"
            verticalAlign="top"
            layout={{ width: 330, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
