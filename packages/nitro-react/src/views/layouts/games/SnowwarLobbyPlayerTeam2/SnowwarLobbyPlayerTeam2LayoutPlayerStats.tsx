import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Named region `playerStats` of SnowwarLobbyPlayerTeam2Layout - configured through the parent's `playerStats` prop. */
export interface SnowwarLobbyPlayerTeam2LayoutPlayerStatsProps {
    captionPlayerHits?: string;
    captionPlayerHitsLabel?: string;
    captionPlayerHitsLabelStroke?: string;
    captionPlayerHitsStroke?: string;
    captionPlayerKills?: string;
    captionPlayerKillsLabel?: string;
    captionPlayerKillsLabelStroke?: string;
    captionPlayerKillsStroke?: string;
    layout?: BoxLayout;
    strokeTextColor?: string;
}

export const SnowwarLobbyPlayerTeam2LayoutPlayerStats = ({ captionPlayerHits, captionPlayerHitsLabel, captionPlayerHitsLabelStroke, captionPlayerHitsStroke, captionPlayerKills, captionPlayerKillsLabel, captionPlayerKillsLabelStroke, captionPlayerKillsStroke, layout, strokeTextColor }: SnowwarLobbyPlayerTeam2LayoutPlayerStatsProps) => {
    return (
        <Region
            name="playerStats"
            layout={{ position: 'absolute', left: 13, width: 140, top: 29, height: 20, flexDirection: 'row', ...layout }}
        >
            <Region layout={{ width: 33, height: 17, flexShrink: 0 }}>
                <ThemeText
                    text={captionPlayerHitsLabelStroke ?? 'HITS'}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: strokeTextColor ?? '#fd6859' }}
                    name="playerHitsLabel_stroke"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 33 }}
                />
                <ThemeText
                    text={captionPlayerHitsLabel ?? 'HITS'}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                    name="playerHitsLabel"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 33 }}
                />
            </Region>
            <Region layout={{ width: 54, height: 17, flexShrink: 0 }}>
                <ThemeText
                    text={captionPlayerHitsStroke ?? '20'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: strokeTextColor ?? '#fd6859' }}
                    name="playerHits_stroke"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 24 }}
                />
                <ThemeText
                    text={captionPlayerHits ?? '20'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                    name="playerHits"
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, bottom: 0, minWidth: 20 }}
                />
            </Region>
            <Region layout={{ width: 40, height: 17, flexShrink: 0 }}>
                <ThemeText
                    text={captionPlayerKillsLabelStroke ?? 'KILLS'}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: strokeTextColor ?? '#fd6859' }}
                    name="playerKillsLabel_stroke"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 40 }}
                />
                <ThemeText
                    text={captionPlayerKillsLabel ?? 'KILLS'}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                    name="playerKillsLabel"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 40 }}
                />
            </Region>
            <Region layout={{ width: 50, height: 17, flexShrink: 0 }}>
                <ThemeText
                    text={captionPlayerKillsStroke ?? '5'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: strokeTextColor ?? '#fd6859' }}
                    name="playerKills_stroke"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 20 }}
                />
                <ThemeText
                    text={captionPlayerKills ?? '5'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                    name="playerKills"
                    layout={{ position: 'absolute', left: 0, width: 41, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};
