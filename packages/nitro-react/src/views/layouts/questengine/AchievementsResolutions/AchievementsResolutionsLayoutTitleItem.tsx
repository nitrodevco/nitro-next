import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `title` of AchievementsResolutionsLayout - pass real rows through its `items…` slot. */
export interface AchievementsResolutionsLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const AchievementsResolutionsLayoutTitleItem = ({ captionTitle, layout }: AchievementsResolutionsLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionTitle ?? t('resolution.header')}
            textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
            name="title"
            verticalAlign="top"
            layout={{ width: 264, height: 50, flexShrink: 0, minHeight: 50, maxHeight: 50, ...layout }}
        />
    );
};
