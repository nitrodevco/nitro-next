import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `level_title` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutLevelTitleItemProps {
    captionLevelTitle?: string;
    layout?: BoxLayout;
}

export const LevelUpLayoutLevelTitleItem = ({ captionLevelTitle, layout }: LevelUpLayoutLevelTitleItemProps) => {
    return (
        <Region
            name="level_title"
            layout={{ width: 340, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionLevelTitle ?? 'Frank\'s Little Helper'}
                textStyle="text-style-il-heading-2"
                textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
            />
        </Region>
    );
};
