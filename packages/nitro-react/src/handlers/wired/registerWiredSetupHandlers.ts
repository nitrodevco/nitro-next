/**
 * The wired setup dialog's packets - `roomevents/IncomingMessages`: the server's "open this box"
 * is answered with the client's own `Open`, the six `WiredFurni*` answers to that open the dialog
 * (`UserDefinedRoomEventsCtrl.prepareForUpdate`), and a save ends in `WiredSaveSuccess` or a
 * `WiredValidationError` alert. A reward box tells the user what became of their reward.
 *
 * The packets carry Flash's six `Triggerable` subclasses; they are folded into one
 * `WiredTriggerable` here, with the holder named and the fields a holder does not have zeroed.
 */
import { GuildMembershipsMessage, IWiredFurniActionDefBase, ObjectRemoveMessage, OpenComposer, OpenEventMessage, WiredFurniActionEventMessage, WiredFurniAddonEventMessage, WiredFurniConditionEventMessage, WiredFurniSelectorEventMessage, WiredFurniTriggerEventMessage, WiredFurniVariableEventMessage, WiredRewardResultMessage, WiredSaveSuccessEventMessage, WiredValidationErrorEventMessage } from '@nitrodevco/nitro-packets';

import { onWiredSaveFailure, onWiredSaveSuccess, prepareWiredForUpdate, wiredStuffRemoved } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { wiredStore } from '#base/context/wired';
import { WIRED_QUANTIFIER_NONE, WiredHolderKey, WiredTriggerable } from '#base/wired';

import { on, subscribeAll } from '../packetSubscriptions';

/** `WiredRewardResultMessageParser.reason`: the reward was given. */
const REWARD_RESULT_SUCCESS = 6;
/** The reward was a badge, and it was given. */
const REWARD_RESULT_BADGE_RECEIVED = 7;

const toTriggerable = (holder: WiredHolderKey, def: IWiredFurniActionDefBase, specifics: Partial<WiredTriggerable> = {}): WiredTriggerable => ({
    ...def,
    holder,
    delayInPulses: 0,
    quantifierCode: 0,
    quantifierType: WIRED_QUANTIFIER_NONE,
    conditionInvert: false,
    isFilter: false,
    isInvert: false,
    ...specifics,
});

export const registerWiredSetupHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { showAlert } = systemStore.getState();
    const { setGuildMemberships } = wiredStore.getState();

    return subscribeAll(subscribe, [
        on(OpenEventMessage, data => send(new OpenComposer({ id: data.stuffId }))),

        on(WiredFurniTriggerEventMessage, data => prepareWiredForUpdate(send, toTriggerable('trigger', data.def))),

        on(WiredFurniActionEventMessage, data => prepareWiredForUpdate(send, toTriggerable('action', data.def, { delayInPulses: data.def.delayInPulses }))),

        on(WiredFurniConditionEventMessage, (data) => {
            const { quantifierCode, quantifierType, isInvert, ...def } = data.def;

            // A condition's `isInvert` means "this is the negative twin"; a selector's is an option of the box.
            prepareWiredForUpdate(send, toTriggerable('condition', def, { quantifierCode, quantifierType: Number(quantifierType), conditionInvert: isInvert }));
        }),

        on(WiredFurniAddonEventMessage, data => prepareWiredForUpdate(send, toTriggerable('addon', data.def))),

        on(WiredFurniSelectorEventMessage, data => prepareWiredForUpdate(send, toTriggerable('selector', data.def, { isFilter: data.def.isFilter, isInvert: data.def.isInvert }))),

        on(WiredFurniVariableEventMessage, data => prepareWiredForUpdate(send, toTriggerable('variable', data.def))),

        on(WiredSaveSuccessEventMessage, () => onWiredSaveSuccess()),

        on(WiredValidationErrorEventMessage, (data) => {
            const { getLocalizationValue } = systemStore.getState();
            const replacements = Object.fromEntries(data.parameters.map(parameter => [ parameter.key, parameter.value ]));

            showAlert(
                getLocalizationValue('wiredfurni.error.title', 'Update failed'),
                getLocalizationValue(data.localizationKey, data.localizationKey, replacements),
            );

            onWiredSaveFailure();
        }),

        on(WiredRewardResultMessage, (data) => {
            const { getLocalizationValue } = systemStore.getState();
            const alert = (titleKey: string, bodyKey: string) => showAlert(getLocalizationValue(titleKey, titleKey), getLocalizationValue(bodyKey, bodyKey));

            if (data.reason === REWARD_RESULT_SUCCESS) alert('wiredfurni.rewardsuccess.title', 'wiredfurni.rewardsuccess.body');
            else if (data.reason === REWARD_RESULT_BADGE_RECEIVED) alert('wiredfurni.badgereceived.title', 'wiredfurni.badgereceived.body');
            else alert('wiredfurni.rewardfailed.title', `wiredfurni.rewardfailed.reason.${data.reason}`);
        }),

        on(ObjectRemoveMessage, data => wiredStuffRemoved(data.objectId)),

        // `onGuildMemberships`: kept for the element that asked (the group member condition, the users-in-group selector).
        on(GuildMembershipsMessage, data => setGuildMemberships(data.guilds)),
    ]);
};
