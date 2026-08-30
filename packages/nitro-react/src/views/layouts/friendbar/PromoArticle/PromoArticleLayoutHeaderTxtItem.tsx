import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `header_txt` of PromoArticleLayout - pass real rows through its `items…` slot. */
export interface PromoArticleLayoutHeaderTxtItemProps {
    captionHeaderTxt?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const PromoArticleLayoutHeaderTxtItem = ({ captionHeaderTxt, colorableTextColor, layout }: PromoArticleLayoutHeaderTxtItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionHeaderTxt ?? t('landing.view.promo.article.header')}
            textStyle="text-style-il-heading-3"
            textOptions={{ fill: colorableTextColor }}
            name="header_txt"
            layout={{ width: 155, height: 14, flexShrink: 0, ...layout }}
        />
    );
};
