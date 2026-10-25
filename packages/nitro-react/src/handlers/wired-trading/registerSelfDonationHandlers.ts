/**
 * The sandbox self donation tool's answer - Flash `roomevents/misc/SelfDonationTool.onSelfDonationResult`:
 * an alert saying whether the furni was handed over.
 *
 * The reference server (turbo-cloud) does not implement self donation; this follows Flash.
 */
import { SelfDonationResultCode, SelfDonationResultMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerSelfDonationHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(SelfDonationResultMessage, (data) => {
        const { getLocalizationValue, showAlert } = systemStore.getState();

        let resultKey = 'selfdonation.result.failed';
        let titleKey = 'selfdonation.fail';

        if (data.resultCode === SelfDonationResultCode.Success) {
            resultKey = 'selfdonation.result.success';
            titleKey = 'selfdonation.success';
        } else if (data.resultCode === SelfDonationResultCode.NotAllowed) {
            resultKey = 'selfdonation.result.not_allowed';
        }

        showAlert(getLocalizationValue(titleKey, titleKey), getLocalizationValue(resultKey, resultKey));
    }),
]);
