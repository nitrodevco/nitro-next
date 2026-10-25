import { useTranslation } from '#base/context/system';
import { TemplateItem, TemplateWindow } from '#base/theme';

/**
 * How the board ranks, in the ordinal order `HighScoreDisplayWidget` used
 * (`SCORETYPE_LOCALIZATION_KEY_POSTFIX`). The two "time" types are what switch the board from counting
 * points to counting a clock.
 */
const SCORE_TYPES = [ 'perteam', 'mostwins', 'classic', 'fastesttime', 'longesttime' ];

/** How often the board wipes itself (`CLEARTYPE_LOCALIZATION_KEY_POSTFIX`). */
const CLEAR_TYPES = [ 'alltime', 'daily', 'weekly', 'monthly' ];

/** Seconds to minutes to hours, as `scoreToTime` steps through them. */
const TIME_UNITS = [ 60, 60, 24 ];

/**
 * `scoreToTime`: a clock score is stored as a plain number of seconds, rendered right to left, two
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
 * A game's scoreboard - `HighScoreDisplayWidget.open`, which builds `high_score_display_xml`
 * (`createWindow`): the title's `${high.score.display.caption}` with the board's score and clear
 * types registered on it, `score_header` the score or time header, and one clone of `entry_template`
 * (taken out of `entries`) per entry, its `usernames` the holders and `score` the score - a clock for
 * the timed types. Read-only, and it has no close button: the furni's own state decides whether the
 * board is up.
 *
 * Every text is set once the window is built, so `score_header` and `score`
 * (`on_accommodate_align_right`) keep their right edges as they fit their texts.
 */
export const FurnitureHighScoreView = ({ scoreType, clearType, entries }: FurnitureHighScoreViewProps) => {
    const t = useTranslation();
    const scoreTypeKey = SCORE_TYPES[scoreType] ?? SCORE_TYPES[0];
    const clearTypeKey = CLEAR_TYPES[clearType] ?? CLEAR_TYPES[0];
    const isTimed = (scoreTypeKey.indexOf('time') >= 0);

    const items: TemplateItem[] = entries.map((entry, index) => ({
        key: String(index),
        from: 'entry_template',
        bindings: {
            // `getUserNameList`.
            usernames: { caption: entry.users.join(', '), setCaptionAfterBuild: true },
            score: { caption: isTimed ? formatTime(entry.score, (entry.score >= 3600) ? 3 : 2) : String(entry.score), setCaptionAfterBuild: true },
        },
    }));

    return (
        <TemplateWindow
            id="habbo-room-ui-com/high_score_display_xml"
            parameters={{
                'high.score.display.caption': {
                    scoretype: t(`high.score.display.scoretype.${scoreTypeKey}`, ''),
                    cleartype: t(`high.score.display.cleartype.${clearTypeKey}`, ''),
                },
            }}
            bindings={{
                score_header: { caption: t(isTimed ? 'high.score.display.time.header' : 'high.score.display.score.header'), setCaptionAfterBuild: true },
                entries: { items },
            }}
        />
    );
};
