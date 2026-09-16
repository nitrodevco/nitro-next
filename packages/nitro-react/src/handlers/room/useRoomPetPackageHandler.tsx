import { RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { OpenPetPackageRequestedMessage, OpenPetPackageResultMessage } from '@nitrodevco/nitro-packets';

import { PET_PACKAGE_WIDGET } from '#base/components/room/widgets/furniture/furnitureWidgetData';
import { useRoomWidgetActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

/** The server accepted the name; anything else is a reason to show. */
const NAME_ACCEPTED = 0;

/** What the naming dialog is told: the box, and why the last name was refused. */
export type PetPackageData = {
    objectId: number;
    error?: string;
};

/**
 * Opening a pet package is a naming conversation: the server asks for a name, checks whatever
 * comes back, and either lets the box open or says why not. Nothing here is driven by the
 * furni's own logic, so this is what puts the dialog up and takes it down.
 */
export const useRoomPetPackageHandler = () => {
    const { openRoomWidget, updateRoomWidgetData, closeRoomWidget } = useRoomWidgetActions();

    useMessageListener(OpenPetPackageRequestedMessage, (data) => {
        openRoomWidget({
            type: PET_PACKAGE_WIDGET,
            objectId: data.objectId,
            category: RoomObjectCategoryEnum.Floor,
            objectType: '',
        });
        updateRoomWidgetData(PET_PACKAGE_WIDGET, { objectId: data.objectId });
    });

    useMessageListener(OpenPetPackageResultMessage, (data) => {
        if (data.nameValidationStatus === NAME_ACCEPTED) {
            closeRoomWidget(PET_PACKAGE_WIDGET);

            return;
        }

        updateRoomWidgetData(PET_PACKAGE_WIDGET, {
            objectId: data.objectId,
            /*
             * The server answers with a localization key when it has one and a plain reason when
             * it does not, so the dialog translates it if it can and shows it as it stands if
             * it cannot.
             */
            error: data.nameValidationInfo.length
                ? data.nameValidationInfo
                : `widgets.petpackage.name.error.${data.nameValidationStatus}`,
        });
    });
};
