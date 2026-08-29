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
                <Region
                    name="usernames"
                    layout={{ position: 'absolute', right: 136, width: 120, top: 2, height: 16, maxWidth: 180, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUsernames ?? 'USERNAMES PH, A LIST'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
            {(visibleScore ?? true) && (
                <Region
                    name="score"
                    layout={{ position: 'absolute', right: 13, width: 56, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionScore ?? 'SCORE PH'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
        </Region>
    );
};
