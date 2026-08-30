import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `level_description` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutLevelDescriptionItemProps {
    captionLevelDescription?: string;
    layout?: BoxLayout;
}

export const LevelUpLayoutLevelDescriptionItem = ({ captionLevelDescription, layout }: LevelUpLayoutLevelDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionLevelDescription ?? 'Now that you know your  Now that you know way around  Now that you knowthe hotel, it\'s... Now that you know your way around the hotel, it\'s... Now that you know your way around the hotel, it\'s...'}
            textOptions={{ wordWrap: true, wordWrapWidth: 309 }}
            name="level_description"
            verticalAlign="top"
            layout={{ width: 309, height: 65, flexShrink: 0, ...layout }}
        />
    );
};
