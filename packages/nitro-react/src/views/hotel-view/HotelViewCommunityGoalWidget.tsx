/**
 * `CommunityGoalWidget` and its `CommunityGoalVsModeWidget` / `CommunityGoalVsModeWidgetWithVoting`
 * subclasses: the community goal's texts and meter, from `community_goal` - or, voting,
 * `community_goal_voting` - with the progress `registerHotelViewHandlers` asks for.
 *
 * Hidden until the progress arrives. The texts are the goal's own (`landing.view.community.*.<goal>`),
 * the meter's level bitmaps its own art (`meter_level_<n>_<goal>.png`). The needle points at the
 * frame the progress gives:
 *
 * - `communitygoal`: 1.5 seconds after the progress first arrives the needle sweeps up to its frame
 *   over a second, lighting each level it passes (`update`). Flash keeps that progress on the widget,
 *   which outlives the landing view, so the sweep plays once a session; it is kept here the same way.
 *   The catalogue button shows under `landing.view.community.interactive` and opens
 *   `landing.view.community.catalog.target`.
 * - `communitygoalvsmode`: a needle that swings either way from the middle, no levels lit and no
 *   total, set straight away.
 * - `communitygoalvsmodevote`: that, with the two vote buttons in the catalogue button's place.
 *   A vote hides them and sends `CommunityGoalVoteComposer`, as does the server taking a vote
 *   (`CommunityVoteReceivedMessage`). Otherwise `refresh` shows them only to a user who has not
 *   contributed - from the progress known when the landing view opens, which is when this mounts;
 *   until any is known they show, as the layout has them.
 *
 * `refreshContent` also sizes `goal_info` to its text (`textHeight + 6`) once the progress is in, so
 * the buttons under it in `info_container` move with it.
 */
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useEffect, useState } from 'react';

import { voteCommunityGoal } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import {
    COMMUNITY_GOAL_METER_BUILDUP_MS, COMMUNITY_GOAL_METER_DELAY_MS, COMMUNITY_GOAL_NEEDLE_BASE_FRAMES, communityGoalNeedleFrame, communityGoalVsNeedleFrame, hotelViewColorableBindings, HotelViewCommonSettings,
    hotelViewProperty, LandingViewWidgetType, useConfigBoolean, useConfigData, useSystemStore, useWindowActions,
} from '#base/context/system';
import { Box, LayoutImage, TemplateBindings, TemplateWindow, TemplateWindows } from '#base/theme';

import { positionAfterAndStretch } from './hotelViewTemplate';

/** The texts the layouts tag `COLORABLE`. */
const COLORABLE = [ 'community_title', 'goal_caption', 'goal_info', 'community_total_status' ] as const;

/** `CommunityGoalWidget`'s own progress through its meter's sweep, which outlives the landing view as the widget does. */
const sweep = { elapsed: 0, buildup: 0 };

/** `refreshContent`'s `goal_info.height = textHeight + 6`. */
const GOAL_INFO_PADDING = 6;

const arrange = (windows: TemplateWindows) => positionAfterAndStretch(windows, 'community_title', 'hdr_line');

/** `refreshContent`, once there is progress: the title line, and `goal_info` as tall as its text. */
const arrangeWithProgress = (windows: TemplateWindows) => {
    arrange(windows);

    const info = windows.find('goal_info');

    if (info) info.setHeight(info.textHeight + GOAL_INFO_PADDING);
};

/** `updateMeter(frame, lit)`, or `undefined` before the first: the levels the needle has reached, and the needle. */
interface MeterState {
    frame: number;
    lit: boolean;
}

export interface HotelViewCommunityGoalWidgetProps {
    type: string;
    settings: HotelViewCommonSettings;
}

export const HotelViewCommunityGoalWidget = ({ type, settings }: HotelViewCommunityGoalWidgetProps) => {
    const goal = useSystemStore(x => x.hotelViewCommunityGoal);
    const voted = useSystemStore(x => x.hotelViewCommunityVoted);
    const config = useConfigData();
    const { send } = useWebSocketContext();
    const { hideWindow, showWindow } = useWindowActions();
    const vsMode = type !== LandingViewWidgetType.COMMUNITYGOAL;
    const voting = type === LandingViewWidgetType.COMMUNITYGOALVSVOTE;
    // `refresh` on activation: the buttons for a user who has not contributed, as far as is known yet.
    const [ showVoteButtons, setShowVoteButtons ] = useState(() => !goal || (goal.personalContributionScore === 0));
    // Only the sweep is animated; once it is over - or for a VS needle - the frame is the progress's own.
    const [ sweepMeter, setSweepMeter ] = useState<MeterState | undefined>(undefined);
    const sweeping = !!goal && !vsMode && (sweep.buildup < 1);

    useEffect(() => {
        if (!goal || !sweeping) return;

        const target = communityGoalNeedleFrame(goal);

        const tick = (ticker: Ticker) => {
            sweep.elapsed += ticker.deltaMS;

            if (sweep.elapsed <= COMMUNITY_GOAL_METER_DELAY_MS) return;

            sweep.buildup = Math.min(1, sweep.buildup + (ticker.deltaMS / COMMUNITY_GOAL_METER_BUILDUP_MS));
            setSweepMeter({ frame: Math.floor(target * sweep.buildup), lit: true });

            if (sweep.buildup >= 1) GetTicker().remove(tick);
        };

        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
        };
    }, [ goal, sweeping ]);

    const meter: MeterState | undefined = !goal
        ? undefined
        : vsMode
            ? { frame: communityGoalVsNeedleFrame(goal), lit: false }
            : (sweeping ? sweepMeter : { frame: communityGoalNeedleFrame(goal), lit: true });

    const goalCode = goal?.goalCode ?? '';
    const imageLibrary = hotelViewProperty(config, 'image.library.url');
    const interactive = useConfigBoolean('landing.view.community.interactive');
    const campaignText = (key: string) => `\${${key}.${goalCode}}`;

    const vote = (option: number) => {
        setShowVoteButtons(false);
        voteCommunityGoal(send, option);
    };

    const bindings: TemplateBindings = {
        '': { visible: !!goal },
        community_title: { caption: campaignText('landing.view.community.headline') },
        goal_caption: { caption: campaignText('landing.view.community.caption') },
        goal_info: { caption: campaignText('landing.view.community.info') },
        community_total_status: { visible: !vsMode, caption: campaignText('landing.view.community.meter') },
        meter_level_0: { asset: `${imageLibrary}reception/meter_level_0_${goalCode}.png` },
        meter_needle: meter ? { asset: LayoutImage(`habbo-window-manager-com/landing_view_needle_meter_needle${meter.frame}.png`) } : {},
    };

    for (let level = 1; level < COMMUNITY_GOAL_NEEDLE_BASE_FRAMES.length; level++) {
        const reached = !!meter && meter.lit && (meter.frame >= COMMUNITY_GOAL_NEEDLE_BASE_FRAMES[level]);

        bindings[`meter_level_${level}`] = { visible: reached, asset: `${imageLibrary}reception/meter_level_${level}_${goalCode}.png` };
        // The layout's icons have no art: `campaignizeMeterElementAssetUri` makes them `_<goal>.png`, which loads nothing.
        bindings[`meter_level_${level}_icon`] = { visible: reached, asset: '' };
        bindings[`meter_level_${level}_icon_locked`] = { visible: !!meter && !reached, asset: '' };
    }

    if (voting) {
        const buttonsVisible = showVoteButtons && !voted;

        bindings.community_vote_one_button = { visible: buttonsVisible, caption: campaignText('landing.view.vote_one_button.text'), onPointerTap: () => vote(1) };
        bindings.community_vote_two_button = { visible: buttonsVisible, caption: campaignText('landing.view.vote_two_button.text'), onPointerTap: () => vote(2) };
    } else {
        bindings.community_catalog_button = {
            visible: interactive,
            caption: campaignText('landing.view.community_catalog_button.text'),
            onPointerTap: () => {
                hideWindow('builders_catalog');
                showWindow('catalog', { pageName: hotelViewProperty(config, 'landing.view.community.catalog.target') });
            },
        };
    }

    return (
        <Box layout={{ flexShrink: 0 }}>
            <TemplateWindow
                id={voting ? 'habbo-friend-bar-com/community_goal_voting_xml' : 'habbo-friend-bar-com/community_goal_xml'}
                bindings={hotelViewColorableBindings(settings, COLORABLE, bindings)}
                arrange={goal ? arrangeWithProgress : arrange}
                parameters={goal ? { [`landing.view.community.meter.${goalCode}`]: { totalAmount: String(goal.communityTotalScore) } } : undefined}
            />
        </Box>
    );
};
