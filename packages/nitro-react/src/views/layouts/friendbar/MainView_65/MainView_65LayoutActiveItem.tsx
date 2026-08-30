import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `active` of MainView_65Layout - pass real rows through its `items…` slot. */
export interface MainView_65LayoutActiveItemProps {
    captionActive?: string;
    layout?: BoxLayout;
}

export const MainView_65LayoutActiveItem = ({ captionActive, layout }: MainView_65LayoutActiveItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionActive ?? t('groupforum.view.shortcuts.active')}
            textOptions={{ fill: '#1b79ab' }}
            name="active"
            layout={{ width: 174, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
