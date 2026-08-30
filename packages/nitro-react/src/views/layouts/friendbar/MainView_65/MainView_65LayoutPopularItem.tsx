import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `popular` of MainView_65Layout - pass real rows through its `items…` slot. */
export interface MainView_65LayoutPopularItemProps {
    captionPopular?: string;
    layout?: BoxLayout;
}

export const MainView_65LayoutPopularItem = ({ captionPopular, layout }: MainView_65LayoutPopularItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPopular ?? t('groupforum.view.shortcuts.popular')}
            textOptions={{ fill: '#1b79ab' }}
            name="popular"
            layout={{ width: 183, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
