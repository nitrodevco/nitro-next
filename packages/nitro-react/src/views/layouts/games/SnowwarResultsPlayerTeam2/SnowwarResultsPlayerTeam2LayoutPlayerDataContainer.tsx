import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SnowwarResultsPlayerTeam2LayoutPlayerStats, SnowwarResultsPlayerTeam2LayoutPlayerStatsProps } from './SnowwarResultsPlayerTeam2LayoutPlayerStats';

/** Named region `playerDataContainer` of SnowwarResultsPlayerTeam2Layout - configured through the parent's `playerDataContainer` prop. */
export interface SnowwarResultsPlayerTeam2LayoutPlayerDataContainerProps {
    captionPlayerName?: string;
    captionPlayerNameStroke?: string;
    captionTotalScore?: string;
    captionTotalScoreLabel?: string;
    captionTotalScoreStroke?: string;
    layout?: BoxLayout;
    onScoreTooltip?: () => void;
    playerStats?: SnowwarResultsPlayerTeam2LayoutPlayerStatsProps;
    srcPlayerDataBackground?: string;
    srcSkillLevel?: string;
    strokeTextColor?: string;
    tintPlayerDataBackground?: string;
    tintSkillLevel?: string;
    visibleScoreTooltip?: boolean;
}

export const SnowwarResultsPlayerTeam2LayoutPlayerDataContainer = ({ captionPlayerName, captionPlayerNameStroke, captionTotalScore, captionTotalScoreLabel, captionTotalScoreStroke, layout, onScoreTooltip, playerStats, srcPlayerDataBackground, srcSkillLevel, strokeTextColor, tintPlayerDataBackground, tintSkillLevel, visibleScoreTooltip }: SnowwarResultsPlayerTeam2LayoutPlayerDataContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="playerDataContainer"
            layout={{ width: 162, height: 62, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="playerDataBackground"
                src={srcPlayerDataBackground ?? layoutImage('red_infobox.png')}
                tint={tintPlayerDataBackground}
                layout={{ position: 'absolute', left: 0, width: 162, top: 0, height: 62 }}
            />
            <Region
                name="playerName_stroke"
                layout={{ position: 'absolute', width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerNameStroke ?? 'Painimies'}
                    textOptions={{ fill: strokeTextColor ?? '#993333' }}
                />
            </Region>
            <Region
                name="playerName"
                layout={{ position: 'absolute', width: 68, top: 3, height: 19, maxWidth: 150, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayerName ?? 'Painimies'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <SnowwarResultsPlayerTeam2LayoutPlayerStats {...playerStats} />
            <Region
                name="playerTotalStats"
                layout={{ position: 'absolute', left: 13, width: 140, top: 24, height: 35 }}
            >
                <Region layout={{ position: 'absolute', left: 0, width: 148, top: 9, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={captionTotalScoreLabel ?? t('snowwar.stats.total_score')}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 100, width: 54, top: 9, height: 17 }}>
                    <Region
                        name="totalScore_stroke"
                        layout={{ position: 'absolute', left: 0, width: 54, top: 0, height: 17, minWidth: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTotalScoreStroke ?? '20'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: strokeTextColor ?? '#cc6666' }}
                        />
                    </Region>
                    <Region
                        name="totalScore"
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 17, minWidth: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTotalScore ?? '20'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
            </Region>
            {(visibleScoreTooltip ?? false) && (
                <Region
                    name="scoreTooltip"
                    onPointerTap={onScoreTooltip}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 7, width: 150, top: 33, height: 13 }}
                >
                    <ThemeImage
                        name="skillLevel"
                        src={srcSkillLevel}
                        tint={tintSkillLevel}
                        layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 13 }}
                    />
                </Region>
            )}
        </Region>
    );
};
