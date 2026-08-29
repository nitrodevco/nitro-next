import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `promo_text` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutPromoTextItemProps {
    captionPromoText?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const PromoArticleLayoutPromoTextItem = ({ captionPromoText, colorableTextColor, layout }: PromoArticleLayoutPromoTextItemProps) => {
    return (
        <Region
            name="promo_text"
            layout={{ width: 330, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPromoText ?? ''}
                textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 330 }}
            />
        </Region>
    );
};
