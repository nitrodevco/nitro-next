/**
 * Mounts the group management window - Flash's `GuildManagementWindowCtrl`, opened by the answer to
 * `GetGuildCreationInfoComposer` (the purchase wizard) or `GetGuildEditInfoComposer` (the editor)
 * and closed by its own buttons, or by the group being created.
 *
 * Stepping and closing go through `goToGroupManagementStep` / `closeGroupManagement`, which are
 * `validateView` + `saveView`: an editor tab sends what the tab being left changed, and a step that
 * does not validate raises its alert and stays put.
 */
import { GUILD_MEMBER_SEARCH_MEMBERS } from '@nitrodevco/nitro-packets';

import { buyGroup, closeGroupManagement, goToGroupManagementStep, hasGroupVip, openGroupVipPurchase, toggleGroupMembers } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupActions, useGroupStore } from '#base/context/groups';
import { GroupManagementView } from '#base/views/groups/GroupManagementView';

export const GroupManagementComponent = () => {
    const session = useGroupStore(x => x.session);
    const step = useGroupStore(x => x.step);
    const editorData = useGroupStore(x => x.editorData);
    const pickingLayerIndex = useGroupStore(x => x.pickingLayerIndex);
    const {
        setGroupManagementName, setGroupManagementDescription, setGroupManagementBaseRoom, setGroupBadgeLayer, resetGroupBadge,
        resetGroupColors, setGroupPrimaryColor, setGroupSecondaryColor, setGroupType, setGroupRightsLevel,
        openBadgePartPicker, closeBadgePartPicker,
    } = useGroupActions();
    const { send } = useWebSocketContext();

    if (!session) return null;

    /** Every layer edit is the row's own options with one field changed - `BadgeLayerCtrl.setLayerOptions`. */
    const layerOf = (layerIndex: number) => session.layers.find(layer => layer.layerIndex === layerIndex);

    return (
        <GroupManagementView
            session={session}
            step={step}
            editorData={editorData}
            pickingLayerIndex={pickingLayerIndex}
            hasVip={hasGroupVip()}
            onClose={() => closeGroupManagement(send)}
            onStep={nextStep => goToGroupManagementStep(send, nextStep)}
            onName={setGroupManagementName}
            onDescription={setGroupManagementDescription}
            onBaseRoom={setGroupManagementBaseRoom}
            onMembers={() => toggleGroupMembers(send, session.groupId, GUILD_MEMBER_SEARCH_MEMBERS)}
            onPickPart={openBadgePartPicker}
            onSelectPart={(layerIndex, partIndex) => {
                const layer = layerOf(layerIndex);

                if (layer) setGroupBadgeLayer(layerIndex, { ...layer, partIndex });

                closeBadgePartPicker();
            }}
            onPosition={(layerIndex, gridX, gridY) => {
                const layer = layerOf(layerIndex);

                if (layer) setGroupBadgeLayer(layerIndex, { ...layer, gridX, gridY });
            }}
            onLayerColor={(layerIndex, colorIndex) => {
                const layer = layerOf(layerIndex);

                if (layer && (colorIndex >= 0)) setGroupBadgeLayer(layerIndex, { ...layer, colorIndex });
            }}
            onResetBadge={resetGroupBadge}
            onPrimaryColor={setGroupPrimaryColor}
            onSecondaryColor={setGroupSecondaryColor}
            onResetColors={resetGroupColors}
            onGuildType={setGroupType}
            onRightsLevel={setGroupRightsLevel}
            onBuy={() => buyGroup(send)}
            onBuyClub={() => openGroupVipPurchase(send)}
        />
    );
};
