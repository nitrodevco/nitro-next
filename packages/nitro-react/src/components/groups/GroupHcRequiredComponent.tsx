/**
 * Mounts the club-required window - Flash's `HcRequiredWindowCtrl`, opened by the join and edit
 * failures whose reason is "club membership required" and closed by its own buttons.
 */
import { openGroupVipPurchase } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupActions, useGroupStore } from '#base/context/groups';
import { GroupHcRequiredView } from '#base/views/groups/GroupHcRequiredView';

export const GroupHcRequiredComponent = () => {
    const hcRequiredFor = useGroupStore(x => x.hcRequiredFor);
    const { setHcRequiredFor } = useGroupActions();
    const { send } = useWebSocketContext();

    if (!hcRequiredFor) return null;

    return (
        <GroupHcRequiredView
            reason={hcRequiredFor}
            onClose={() => setHcRequiredFor(undefined)}
            onBuyClub={() => {
                openGroupVipPurchase(send);
                setHcRequiredFor(undefined);
            }}
        />
    );
};
