import { useTranslation } from '#base/context/system';
import { Border, Bubble, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/**
 * How the board ranks, in the ordinal order `HighScoreDisplayWidget` used. The two "time" types
 * are what switch the board from counting points to counting a clock.
 */
const SCORE_TYPES = [ 'perteam', 'mostwins', 'classic', 'fastesttime', 'longesttime' ];

/** How often the board wipes itself. */
const CLEAR_TYPES = [ 'alltime', 'daily', 'weekly', 'monthly' ];

/** Seconds to minutes to hours, as `scoreToTime` steps through them. */
const TIME_UNITS = [ 60, 60, 24 ];

/**
 * A clock score is stored as a plain number of seconds. Flash rendered it right to left, two
 * digits per unit, over two units below an hour and three from an hour up.
 */
const formatTime = (score: number, units: number) => {
    let remaining = score;
    let result = '';

    for (let i = 0; i < units; i++) {
        let part: string;

        if (i === (units - 1)) {
            part = `${remaining}`;
        } else {
            part = `${remaining % TIME_UNITS[i]}`;
            remaining = Math.floor(remaining / TIME_UNITS[i]);
        }

        if ((part.length < 2) && (i < 2)) part = `0${part}`;

        result = `${part}:${result}`;
    }

    return result.substring(0, (result.length - 1));
};

export interface FurnitureHighScoreEntry {
    score: number;
    users: string[];
}

export interface FurnitureHighScoreViewProps {
    scoreType: number;
    clearType: number;
    entries: FurnitureHighScoreEntry[];
}

/**
 * A game's scoreboard, on the `high_score_display` layout (275x341). The title says what the
 * board ranks and how often it resets, then every score with whoever holds it. Read-only, and
 * it has no close button: the furni's own state decides whether the board is up.
 */
export const FurnitureHighScoreView = ({ scoreType, clearType, entries }: FurnitureHighScoreViewProps) => {
    const t = useTranslation();
    const scoreTypeKey = SCORE_TYPES[scoreType] ?? SCORE_TYPES[0];
    const clearTypeKey = CLEAR_TYPES[clearType] ?? CLEAR_TYPES[0];
    const isTimed = (scoreTypeKey.indexOf('time') >= 0);

    const caption = t('high.score.display.caption', '', {
        scoretype: t(`high.score.display.scoretype.${scoreTypeKey}`, ''),
        cleartype: t(`high.score.display.cleartype.${clearTypeKey}`, ''),
    });

    return (
        <Region layout={{ position: 'relative', width: 275, height: 341 }}>
            <Bubble
                variant="100"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    backgroundColor="#3f3f3f"
                    layout={{ position: 'absolute', left: 9, width: 256, top: 8, height: 20, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={caption}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                        layout={{ position: 'absolute', left: 4, right: 4, top: 2, height: 17 }}
                    />
                </Region>
                <Border
                    variant="100"
                    layout={{ position: 'absolute', left: 8, width: 258, top: 30, height: 23, flexDirection: 'row' }}
                >
                    <Border
                        variant="100"
                        layout={{ width: 190, height: '100%' }}
                    >
                        <ThemeText
                            text={t('high.score.display.users.header')}
                            layout={{ position: 'absolute', left: 1, right: 1, top: 3, height: 16 }}
                        />
                    </Border>
                    <Border
                        variant="100"
                        layout={{ marginLeft: -2, width: 70, height: '100%' }}
                    >
                        <ThemeText
                            text={t(isTimed ? 'high.score.display.time.header' : 'high.score.display.score.header')}
                            textOptions={{ align: 'right' }}
                            layout={{ position: 'absolute', left: 1, right: 5, top: 3, height: 16 }}
                        />
                    </Border>
                </Border>
                <Border
                    variant="108"
                    tintColor="#676767"
                    layout={{ position: 'absolute', left: 8, width: 257, top: 53, height: 255 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 8, width: 256, top: 53, height: 253 }}
                    contentLayout={{ position: 'relative', flexDirection: 'column', width: '100%' }}
                >
                    {entries.map((entry, index) => (
                        <Region
                            key={index}
                            layout={{ width: 258, height: 20, flexShrink: 0 }}
                        >
                            <ThemeText
                                text={entry.users.join(', ')}
                                textOptions={{ fill: '#ffffff' }}
                                layout={{ position: 'absolute', left: 2, width: 180, top: 2, height: 16 }}
                            />
                            <ThemeText
                                text={isTimed ? formatTime(entry.score, (entry.score >= 3600) ? 3 : 2) : String(entry.score)}
                                textOptions={{ fill: '#ffffff', align: 'right' }}
                                layout={{ position: 'absolute', right: 13, width: 56, top: 2, height: 16 }}
                            />
                        </Region>
                    ))}
                </ScrollArea>
                <ThemeImage
                    src={LayoutImage('room-ui/high_score_highscore_cup.png')}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 269, height: 70 }}
                />
                <ThemeText
                    text={t('high.score.display.congratulations.footer')}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#6f6f6f', align: 'center' }}
                    layout={{ position: 'absolute', left: 41, width: 233, top: 311, height: 17 }}
                />
            </Bubble>
        </Region>
    );
};
