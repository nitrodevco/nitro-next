import { OpenPetPackageRequestedMessage, OpenPetPackageResultMessage } from "@nitrodevco/nitro-shared";

import { useMessageListener } from "#base/hooks";

export const useRoomPetPackageHandler = () => {
    useMessageListener(OpenPetPackageRequestedMessage, data => {
    });

    useMessageListener(OpenPetPackageResultMessage, data => {
    });
}