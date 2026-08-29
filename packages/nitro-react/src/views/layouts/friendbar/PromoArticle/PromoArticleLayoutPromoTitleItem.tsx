import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `promo_title` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutPromoTitleItemProps {
    captionPromoTitle?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const PromoArticleLayoutPromoTitleItem = ({ captionPromoTitle, colorableTextColor, layout }: PromoArticleLayoutPromoTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="promo_title"
            layout={{ width: 330, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPromoTitle ?? t('promo.article.widget.loading')}
                textStyle="text-style-il-heading-title"
                textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 330 }}
            />
        </Region>
    );
};
