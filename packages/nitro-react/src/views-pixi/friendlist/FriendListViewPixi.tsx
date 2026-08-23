import { useFriendsSelectors, useTranslation } from '#base/context';
import { useSystemActions, useWindowParams } from '#base/context/system';
import { Accordion, Box, ColorLayer, Frame, Text } from '#base/theme-pixi';

import { FriendListFriendsPixi } from './FriendListFriendsPixi';
import { FriendListRequestsPixi } from './FriendListRequestsPixi';
import { FriendListSearchPixi } from './FriendListSearchPixi';

export type FriendListViewWindowParams = { tab?: '' | 'friends' | 'requests' | 'search' };

/**
 * Pixi port of views/friendlist/FriendListView.tsx. Skips DOM's `contentClassName="px-0! pt-0!
 * -mt-px"` override on its own Frame - Frame's Pixi ContentArea has no per-caller padding
 * override yet (unlike AccordionTrigger, extended this batch for a real behavioral need,
 * widening Frame's own contract - the single most-used component in this package - for a
 * cosmetic edge-to-edge fit wasn't judged worth it mid-batch), so the accordion sits inset by
 * ContentArea's normal padding instead of flush against the frame's edges.
 *
 * Known minor visual gap (verified via screenshot, not chased further): with a closed tab's
 * trigger sitting at the very bottom of the accordion (e.g. when "search" is the last collapsed
 * item), a few pixels of the Frame's own background show through below it rather than the
 * accordion's white background reaching the frame's bottom edge - `flex: 1`/`minHeight: 0` on
 * both Accordion and AccordionContent didn't fully close the gap, and root-causing the exact
 * yoga flex-distribution shortfall wasn't judged worth further time against the rest of this
 * migration.
 */
export const FriendListViewPixi = () => {
    const { tab: activeTab = 'friends' } = useWindowParams('friendlist');

    const { toggleWindow, updateWindowParams } = useSystemActions();
    const { tooltip } = useFriendsSelectors();

    const t = useTranslation();

    const setActiveTab = (tab: string) => {
        updateWindowParams('friendlist', { tab: tab as FriendListViewWindowParams['tab'] });
    };

    return (
        <Frame
            variant="0"
            id="friendlist"
            layout={{ position: 'absolute', top: 20, left: 20, width: 230, height: activeTab ? 350 : undefined }}
            caption={t('friendlist.friends')}
            onClose={() => toggleWindow('friendlist')}
        >
            <Accordion
                collapsible
                value={activeTab}
                onValueChange={setActiveTab}
                layout={{ position: 'relative', flex: activeTab ? 1 : undefined, minHeight: 0 }}
            >
                <ColorLayer color="#ffffff" />
                <pixiGraphics
                    eventMode="none"
                    layout={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 1 }}
                    draw={(g) => { g.clear().rect(0, 0, 1, 1).fill('#000000'); }}
                />
                <FriendListFriendsPixi value="friends" />
                <FriendListRequestsPixi value="requests" />
                <FriendListSearchPixi value="search" />
            </Accordion>
            <Box layout={{ width: '100%', height: 20, flexShrink: 0, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingTop: 8, paddingRight: 32 }}>
                <Text
                    text={t(tooltip)}
                    textStyle="text-style-regular"
                    textOptions={{ fontSize: 8.75, fill: '#ffffff' }}
                />
            </Box>
        </Frame>
    );
};
