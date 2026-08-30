import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `level_title` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutLevelTitleItemProps {
    captionLevelTitle?: string;
    layout?: BoxLayout;
}

export const LevelUpLayoutLevelTitleItem = ({ captionLevelTitle, layout }: LevelUpLayoutLevelTitleItemProps) => {
    return (
        <ThemeText
            text={captionLevelTitle ?? 'Frank\'s Little Helper'}
            textStyle="text-style-il-heading-2"
            textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
            name="level_title"
            verticalAlign="top"
            layout={{ width: 340, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
