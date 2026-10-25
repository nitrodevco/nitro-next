/**
 * `CommunityGoalPrizesWidget`: the community goal competition's prizes and the user's rank, from
 * `achievement_competition_prizes`, over the community goal's progress (`CommunityGoalData`).
 *
 * The widget asks for nothing itself: it draws the progress another widget or element asked for
 * (`registerHotelViewHandlers`), and stays hidden until one has arrived. `refreshContent`:
 *
 * - The texts are the goal's own (`landing.view.competition.prizes.<goal>.caption`, `.info`,
 *   `.rewardname`, `.rewardinfo`, `.rank1` .. `.rank3`), the reward's picture
 *   `reception/<goal>Reward.png`.
 * - Each prize's ranks (`setPrizeRankLimits`): `rank` or `ranks` with its first and last rank.
 * - The user's rank, from the progress: their final rank once the goal has expired, else their
 *   rank or that they are not ranked yet, each with its info text (`yourrankinfo` with their points,
 *   or `youarenotrankedinfo`), hidden once expired. An expired goal the user has no rank in shows no
 *   rank at all.
 * - The user's head (`avatar_image`) is their own figure, as `UserObjectEvent` and their own
 *   `UserChangeMessageEvent` give it.
 *
 * `WidgetContainerLayout.applyCommonWidgetSettings` colours the `COLORABLE` texts.
 */
import { competitionPrizeRanks, hotelViewColorableBindings, HotelViewCommonSettings, hotelViewProperty, useConfigData, useSystemStore, useTranslation } from '#base/context/system';
import { useOwnUserFigure } from '#base/context/user';
import { TemplateBindings, TemplateWindow } from '#base/theme';
import { AvatarImageWidgetHead } from '#base/views/shared/AvatarImageWidgetHead';

import { hotelViewTemplateId } from './hotelViewTemplate';

/** The texts the layout tags `COLORABLE`. */
const COLORABLE = [
    'caption_txt', 'info_txt', 'reward_name_txt', 'reward_info_txt', 'rank_1_txt', 'rank_1_info_txt', 'rank_2_txt', 'rank_2_info_txt', 'rank_3_txt', 'rank_3_info_txt', 'user_rank_txt',
    'user_rank_info_txt',
] as const;

/** `getKey`. */
const prizesKey = (name: string) => `landing.view.competition.prizes.${name}`;

export interface HotelViewCompetitionPrizesWidgetProps {
    settings: HotelViewCommonSettings;
}

export const HotelViewCompetitionPrizesWidget = ({ settings }: HotelViewCompetitionPrizesWidgetProps) => {
    const goal = useSystemStore(x => x.hotelViewCommunityGoal);
    const config = useConfigData();
    const figure = useOwnUserFigure();
    const t = useTranslation();

    if (!goal) return (
        <TemplateWindow
            id={hotelViewTemplateId('achievement_competition_prizes')}
            bindings={{ '': { visible: false } }}
        />
    );

    /** `getCompetitionSpecificKey`. */
    const goalKey = (name: string) => prizesKey(`${goal.goalCode}.${name}`);
    const goalText = (name: string) => `\${${goalKey(name)}}`;
    const ranked = goal.personalContributionRank > 0;
    const rankName = goal.hasGoalExpired ? 'yourfinalrank' : (ranked ? 'yourrank' : 'youarenotranked');

    const bindings: TemplateBindings = {
        caption_txt: { caption: goalText('caption') },
        info_txt: { caption: goalText('info') },
        reward_name_txt: { caption: goalText('rewardname') },
        reward_info_txt: { caption: goalText('rewardinfo') },
        user_rank_border: { visible: !goal.hasGoalExpired || ranked },
        user_rank_txt: { caption: `\${${prizesKey(rankName)}}` },
        user_rank_info_txt: { visible: !goal.hasGoalExpired, caption: goalText(ranked ? 'yourrankinfo' : 'youarenotrankedinfo') },
        reward_image: { asset: `${hotelViewProperty(config, 'image.library.url')}reception/${goal.goalCode}Reward.png` },
        avatar_image: {
            children: figure
                ? (
                        <AvatarImageWidgetHead
                            figure={figure}
                            cropped
                        />
                    )
                : null,
        },
    };

    for (let prize = 1; prize <= 3; prize++) {
        const { start, end } = competitionPrizeRanks(goal.rewardUserLimits, prize);

        bindings[`rank_${prize}_txt`] = { caption: goalText(`rank${prize}`) };
        // `getLocalizationWithParams(key, "", "start", start, "end", end)`: the text itself, filled.
        bindings[`rank_${prize}_info_txt`] = { caption: t(prizesKey((start === end) ? 'rank' : 'ranks'), '', { start: String(start), end: String(end) }) };
    }

    return (
        <TemplateWindow
            id={hotelViewTemplateId('achievement_competition_prizes')}
            bindings={hotelViewColorableBindings(settings, COLORABLE, bindings)}
            parameters={{
                [goalKey('yourrankinfo')]: { points: String(goal.personalContributionScore) },
                [prizesKey(rankName)]: { rank: String(goal.personalContributionRank) },
            }}
        />
    );
};
