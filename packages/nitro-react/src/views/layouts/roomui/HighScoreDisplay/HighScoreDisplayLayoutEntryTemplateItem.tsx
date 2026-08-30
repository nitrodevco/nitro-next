import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `entry_template` of HighScoreDisplayLayout - pass real rows through its `items…` slot. */
export interface HighScoreDisplayLayoutEntryTemplateItemProps {
    captionScore?: string;
    captionUsernames?: string;
    layout?: BoxLayout;
    visibleScore?: boolean;
    visibleUsernames?: boolean;
}

export const HighScoreDisplayLayoutEntryTemplateItem = ({ captionScore, captionUsernames, layout, visibleScore, visibleUsernames }: HighScoreDisplayLayoutEntryTemplateItemProps) => {
    return (
        <Region
            name="entry_template"
            layout={{ width: 258, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleUsernames ?? true) && (
                <ThemeText
                    text={captionUsernames ?? 'USERNAMES PH, A LIST'}
                    textOptions={{ fill: '#ffffff' }}
                    name="usernames"
                    layout={{ position: 'absolute', right: 136, width: 120, top: 2, height: 16, maxWidth: 180 }}
                />
            )}
            {(visibleScore ?? true) && (
                <ThemeText
                    text={captionScore ?? 'SCORE PH'}
                    textOptions={{ fill: '#ffffff' }}
                    name="score"
                    layout={{ position: 'absolute', right: 13, width: 56, top: 2, height: 16 }}
                />
            )}
        </Region>
    );
};
