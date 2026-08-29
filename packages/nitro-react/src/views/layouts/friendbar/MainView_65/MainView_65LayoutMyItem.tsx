import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `my` of MainView_65Layout - pass real rows through its `items…` slot. */
export interface MainView_65LayoutMyItemProps {
    captionMy?: string;
    layout?: BoxLayout;
}

export const MainView_65LayoutMyItem = ({ captionMy, layout }: MainView_65LayoutMyItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="my"
            layout={{ width: 159, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMy ?? t('groupforum.view.shortcuts.my')}
                textOptions={{ fill: '#1b79ab' }}
            />
        </Region>
    );
};
