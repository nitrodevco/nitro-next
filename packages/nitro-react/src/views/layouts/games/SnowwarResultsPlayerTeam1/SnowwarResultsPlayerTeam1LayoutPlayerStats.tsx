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
                <Region
                    name="playerHitsLabel"
                    layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 16, minWidth: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerHitsLabel ?? t('snowwar.results.hits')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 62, width: 60, top: 0, height: 17 }}>
                <Region
                    name="playerHits_stroke"
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerHitsStroke ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: strokeTextColor ?? '#6699cc', align: 'right' }}
                    />
                </Region>
                <Region
                    name="playerHits"
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerHits ?? '20'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 0, width: 114, top: 14, height: 17 }}>
                <Region
                    name="playerKillsLabel"
                    layout={{ position: 'absolute', left: 0, width: 114, top: 0, height: 16, minWidth: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPlayerKillsLabel ?? t('snowwar.results.kills')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 62, width: 60, top: 14, height: 17 }}>
                <Region
                    name="playerKills_stroke"
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerKillsStroke ?? '5'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: strokeTextColor ?? '#6699cc', align: 'right' }}
                    />
                </Region>
                <Region
                    name="playerKills"
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, minWidth: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionPlayerKills ?? '5'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
