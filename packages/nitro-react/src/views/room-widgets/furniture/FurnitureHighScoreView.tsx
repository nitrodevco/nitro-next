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
 * A game's scoreboard, on the `high_score_display` layout (275x341) that
 * `HighScoreDisplayWidget.open` fills: the title says what the board ranks and how often it
 * resets, then every score with whoever holds it, one cloned `entry_template` per entry. Read-only,
 * and it has no close button: the furni's own state decides whether the board is up.
 *
 * The title and footer are labels centred in their parent (`relative_horizontal_scale_center` +
 * `on_accommodate_align_center`). `score_header` and each row's `score` are right-aligned
 * auto-size texts, so they keep their right edge; a row's `usernames` grows right from x 2, up to
 * its `width_max` of 180. A row is 258 wide in a 256 wide list, which clips it.
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
        <Bubble
            variant="100"
            margins={[ 1, 1, 1, 1 ]}
            layout={{ width: 275, height: 341 }}
        >
            <Region
                backgroundColor="#3f3f3f"
                layout={{ position: 'absolute', left: 9, width: 256, top: 8, height: 20, flexDirection: 'row', justifyContent: 'center' }}
            >
                <ThemeText
                    text={caption}
                    textStyle="u_bold"
                    textOptions={{ fill: '#ffffff' }}
                    verticalAlign="top"
                    layout={{ marginTop: 2, height: 17, flexShrink: 0 }}
                />
            </Region>
            <Border
                variant="100"
                layout={{ position: 'absolute', left: 8, width: 258, top: 30, height: 23 }}
            >
                <Border
                    variant="100"
                    layout={{ position: 'absolute', left: 0, width: 190, top: 0, height: 23 }}
                >
                    <ThemeText
                        text={t('high.score.display.users.header')}
                        textStyle="il_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 1, top: 3, height: 16 }}
                    />
                </Border>
                <Border
                    variant="100"
                    layout={{ position: 'absolute', left: 188, width: 70, top: 0, height: 23, overflow: 'hidden' }}
                >
                    <ThemeText
                        text={t(isTimed ? 'high.score.display.time.header' : 'high.score.display.score.header')}
                        textStyle="il_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', right: 5, top: 3, height: 16 }}
                    />
                </Border>
            </Border>
            <Border
                variant="108"
                tintColor="#676767"
                layout={{ position: 'absolute', left: 8, width: 257, top: 53, height: 255 }}
            />
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 311, height: 17, flexDirection: 'row', justifyContent: 'center' }}>
                <ThemeText
                    text={t('high.score.display.congratulations.footer')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#6f6f6f' }}
                    verticalAlign="top"
                    layout={{ height: 17, flexShrink: 0 }}
                />
            </Region>
            <ThemeImage
                src={LayoutImage('room-ui/high_score_highscore_cup.png')}
                bitmap={{ fitSizeToContents: true }}
                layout={{ position: 'absolute', left: 0, top: 269 }}
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
                        <Region layout={{ position: 'absolute', left: 2, top: 2, height: 16, maxWidth: 180, overflow: 'hidden' }}>
                            <ThemeText
                                text={entry.users.join(', ')}
                                textStyle="il_regular"
                                textOptions={{ fill: '#ffffff' }}
                                flashFormat={{ etchingColor: 0x62FFFFFF }}
                                verticalAlign="top"
                                layout={{ height: 16, flexShrink: 0 }}
                            />
                        </Region>
                        <ThemeText
                            text={isTimed ? formatTime(entry.score, (entry.score >= 3600) ? 3 : 2) : String(entry.score)}
                            textStyle="il_regular"
                            textOptions={{ fill: '#ffffff' }}
                            flashFormat={{ etchingColor: 0x62FFFFFF }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', right: 13, top: 2, height: 16 }}
                        />
                    </Region>
                ))}
            </ScrollArea>
        </Bubble>
    );
};
