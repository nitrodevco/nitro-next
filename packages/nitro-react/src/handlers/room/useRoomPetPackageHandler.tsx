import { OpenPetPackageRequestedMessage, OpenPetPackageResultMessage } from "@nitrodevco/nitro-packets";

import { useMessageListener } from "#base/hooks";

export const useRoomPetPackageHandler = () => {
    useMessageListener(OpenPetPackageRequestedMessage, data => {
    });

    useMessageListener(OpenPetPackageResultMessage, data => {
    });
}