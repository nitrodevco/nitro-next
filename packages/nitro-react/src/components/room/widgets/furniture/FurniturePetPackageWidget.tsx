import { OpenPetPackageComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { PetPackageData } from '#base/handlers';
import { PET_PACKAGE_WIDGET } from '#base/utils';
import { FurnitureBannerDialogView } from '#base/views/room-widgets/furniture/FurnitureBannerDialogView';

/**
 * Naming the pet inside an unopened package, on the `petpackage_new` layout that
 * `PetPackageFurniWidget.showInterface` builds: its `input` takes the name and `pick_name` sends it
 * (`FurnitureBannerDialogView`). The server has the last word
 * on the name - it is checked rather than merely accepted - so a refusal comes back here and the
 * box stays shut until something acceptable is typed.
 *
 * Flash says why a name was refused in an alert (`windowManager.alert`); the port writes the reason
 * under the field instead - the one line of this dialog the layout does not place. Flash builds the older `petpackage` layout instead when the request
 * carries the pet's image; the port's request carries none, so `petpackage_new` is always the one.
 */
export const FurniturePetPackageWidget = () => {
    const request = useRoomWidget<PetPackageData>(PET_PACKAGE_WIDGET);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ name, setName ] = useState<string>('');
    const t = useTranslation();

    const data = request?.data;

    if (!request || !data) return null;

    const onClose = () => closeRoomWidget(PET_PACKAGE_WIDGET);

    return (
        <FurnitureBannerDialogView
            layout="petpackage"
            input={{ value: name, onChange: setName }}
            error={data.error && t(data.error, data.error)}
            onConfirm={() => send(new OpenPetPackageComposer({ objectId: data.objectId, name }))}
            onCancel={onClose}
        />
    );
};
