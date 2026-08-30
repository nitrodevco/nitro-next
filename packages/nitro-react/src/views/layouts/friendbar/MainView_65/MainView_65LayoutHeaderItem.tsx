import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `header` of MainView_65Layout - pass real rows through its `items…` slot. */
export interface MainView_65LayoutHeaderItemProps {
    captionHeader?: string;
    layout?: BoxLayout;
}

export const MainView_65LayoutHeaderItem = ({ captionHeader, layout }: MainView_65LayoutHeaderItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionHeader ?? t('groupforum.view.shortcuts.header')}
            name="header"
            layout={{ width: 191, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
