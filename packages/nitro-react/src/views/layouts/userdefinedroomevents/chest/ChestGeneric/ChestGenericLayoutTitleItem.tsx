import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `title` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutTitleItem = ({ captionTitle, layout }: ChestGenericLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionTitle ?? t('wiredchests.lock_info.title')}
            textStyle="text-style-u-bold"
            name="title"
            layout={{ width: 105, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
