import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Named region `playerStats` of SnowwarResultsPlayerTeam1Layout - configured through the parent's `playerStats` prop. */
export interface SnowwarResultsPlayerTeam1LayoutPlayerStatsProps {
    captionPlayerHits?: string;
    captionPlayerHitsLabel?: string;
    captionPlayerHitsStroke?: string;
    captionPlayerKills?: string;
    captionPlayerKillsLabel?: string;
    captionPlayerKillsStroke?: string;
    layout?: BoxLayout;
    strokeTextColor?: string;
}

export const SnowwarResultsPlayerTeam1LayoutPlayerStats = ({ captionPlayerHits, captionPlayerHitsLabel, captionPlayerHitsStroke, captionPlayerKills, captionPlayerKillsLabel, captionPlayerKillsStroke, layout, strokeTextColor }: SnowwarResultsPlayerTeam1LayoutPlayerStatsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playerStats"
            layout={{ position: 'absolute', left: 20, width: 135, top: 26, height: 35, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 17 }}>
                <ThemeText
                    text={captionPlayerHitsLabel ?? t('snowwar.results.hits')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                    name="playerHitsLabel"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 16, minWidth: 33 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 62, width: 60, top: 0, height: 17 }}>
                <ThemeText
                    text={captionPlayerHitsStroke ?? '20'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: strokeTextColor ?? '#6699cc', align: 'right' }}
                    name="playerHits_stroke"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 30 }}
                />
                <ThemeText
                    text={captionPlayerHits ?? '20'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                    name="playerHits"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 30 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 114, top: 14, height: 17 }}>
                <ThemeText
                    text={captionPlayerKillsLabel ?? t('snowwar.results.kills')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#ffffff' }}
                    name="playerKillsLabel"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 16, minWidth: 40 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 62, width: 60, top: 14, height: 17 }}>
                <ThemeText
                    text={captionPlayerKillsStroke ?? '5'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: strokeTextColor ?? '#6699cc', align: 'right' }}
                    name="playerKills_stroke"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 30 }}
                />
                <ThemeText
                    text={captionPlayerKills ?? '5'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                    name="playerKills"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minWidth: 30 }}
                />
            </Region>
        </Region>
    );
};
