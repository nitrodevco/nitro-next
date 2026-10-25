/**
 * `CommunityGoalHallOfFameWidget` over `UserListWidget`: the community goal competition's leaders,
 * from `user_list`, each a `user_entry` with their figure and one `competition_user_popup` above.
 *
 * `refresh` asks the timing code of `landing.view.dynamic.slot.6.conf` - the bottom slot's
 * schedule, wherever the widget is - and its answer asks for that code's hall of fame
 * (`registerHotelViewHandlers`). Hidden until the leaders arrive (`refreshContent`); then:
 *
 * - `refreshList`: ten entries side by side from `startOffset` (150), each its layout's width - or
 *   the code's `avatarlist.widths.array` entry - and dropped by its `avatarlist.yoffsets.array`
 *   entry (`setupVariation`: `0,10,5,0,5,10,0,10,5,10`) plus 70, its figure facing the way
 *   `setupVariation` turns it; an entry with no leader is hidden. The variables are the timing
 *   code's (`loadConfigurationOverrides`); Flash reads them before the first list is built and keeps
 *   the entries it built, so a later code with other offsets changes nothing there - here the list
 *   follows the current code.
 * - The popup shows the leader under the pointer (`WME_OVER`), and the first leader otherwise
 *   (`backToDefaultPopup`): their name, points (`landing.view.competition.hof.points`) and the goal's
 *   leader title, centred over the entry.
 * - A click on an entry opens the leader's profile (`GetExtendedProfileMessageComposer`). With
 *   `landing.view.communitygoalhof.hasroomlink` each entry also shows the room link, to the
 *   leader's competition room (`extraLinkClicked`).
 *
 * `UserListWidget` has no `ISettingsAwareWidget`, so the hotel's text colours do not reach it.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { goToHallOfFameRoom, openProfile } from '#base/commands';
import { AvatarImage } from '#base/components/AvatarImage';
import { useWebSocketContext } from '#base/context/communication';
import {
    HALL_OF_FAME_AVATAR_DIRECTIONS, HALL_OF_FAME_ENTRY_COUNT, HALL_OF_FAME_ENTRY_TOP, HALL_OF_FAME_POPUP_BOTTOM, hallOfFameLayout, hallOfFameSchedule, hotelViewProperty, useConfigData, useSystemStore,
} from '#base/context/system';
import { TemplateItem, TemplateWindow, useTemplateLibrary } from '#base/theme';

import { HOTEL_VIEW_LIBRARY, hotelViewTemplate, hotelViewTemplateId } from './hotelViewTemplate';

export const HotelViewHallOfFameWidget = () => {
    const config = useConfigData();
    const { send } = useWebSocketContext();
    const templates = useTemplateLibrary(HOTEL_VIEW_LIBRARY);
    const hallOfFame = useSystemStore(x => x.hotelViewHallOfFame);
    const code = useSystemStore(x => x.hotelViewTimingCodes[hallOfFameSchedule(config)]);
    const [ hovered, setHovered ] = useState<number | undefined>(undefined);
    const entryTemplate = hotelViewTemplate(templates, 'user_entry');
    const popupTemplate = hotelViewTemplate(templates, 'competition_user_popup');
    const users = hallOfFame?.hof ?? [];
    // `showPopup`, on the leader under the pointer, else the first (`backToDefaultPopup`).
    const shown = ((hovered !== undefined) && users[hovered]) ? hovered : 0;
    const leader = users[shown];
    const added: TemplateItem[] = [];

    if (hallOfFame && entryTemplate && popupTemplate) {
        const { startOffset, offsetsY, widths } = hallOfFameLayout(config, code);
        const hasExtraLink = hotelViewProperty(config, 'landing.view.communitygoalhof.hasroomlink') === 'true';
        const entryWidth = (index: number) => ((widths.length > index) ? widths[index] : entryTemplate.width);
        const entryX: number[] = [];

        for (let index = 0, x = startOffset; index < HALL_OF_FAME_ENTRY_COUNT; index++) {
            entryX.push(x);
            x += entryWidth(index);
        }

        for (let index = 0; index < HALL_OF_FAME_ENTRY_COUNT; index++) {
            const user = users[index];
            const offsetY = offsetsY[index] ?? 0;
            // `onEntry` / `onExtraLink`: over shows the entry's leader, out goes back to the first.
            const hover = { onPointerOver: () => setHovered(index), onPointerOut: () => setHovered(undefined) };

            added.push({
                key: `entry_${index}`,
                from: entryTemplate,
                bindings: {
                    '': { visible: !!user, onPointerTap: () => user && openProfile(send, user.userId), ...hover },
                    avatar_image_widget: {
                        children: user
                            ? (
                                    <AvatarImage
                                        figure={user.figure}
                                        gender={AvatarGenderType.Male}
                                        direction={HALL_OF_FAME_AVATAR_DIRECTIONS[index]}
                                    />
                                )
                            : null,
                    },
                    extra_link_region: {
                        visible: hasExtraLink,
                        // `onExtraLink`: the link's own procedure takes the click, so the entry's never sees it.
                        onPointerTap: (event) => {
                            event.stopPropagation();

                            if (user) goToHallOfFameRoom(send, hallOfFame.goalCode, user.userId);
                        },
                        ...hover,
                    },
                },
                // `createAvatarContainer` and `setupVariation`.
                arrange: ({ root, find }) => {
                    const entry = root();
                    const link = find('extra_link_region');

                    if (!entry) return;

                    entry.setY(entry.y + offsetY + HALL_OF_FAME_ENTRY_TOP);

                    if (offsetY < 0) entry.setHeight(entry.height - offsetY);

                    link?.setY(link.y - offsetY);
                    entry.setX(entryX[index]);
                    entry.setWidth(entryWidth(index));
                },
            });
        }

        if (leader) {
            added.push({
                key: 'popup',
                from: popupTemplate,
                bindings: {
                    user_name_txt: { caption: leader.userName },
                    score_txt: { caption: '${landing.view.competition.hof.points}' },
                    rank_desc_txt: { caption: `\${landing.view.competition.hof.${hallOfFame.goalCode}.rankdesc.leader}` },
                },
                arrange: ({ root }) => {
                    const popup = root();

                    if (!popup) return;

                    popup.setY(Math.max(0, HALL_OF_FAME_POPUP_BOTTOM - popup.height));
                    popup.setX(entryX[shown] + Math.trunc((entryWidth(shown) - popup.width) / 2));
                },
            });
        }
    }

    return (
        <TemplateWindow
            id={hotelViewTemplateId('user_list')}
            bindings={{ '': { visible: !!hallOfFame, added } }}
            parameters={leader ? { 'landing.view.competition.hof.points': { points: String(leader.currentScore) } } : undefined}
        />
    );
};
