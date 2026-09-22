import { OpenPetPackageComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { PetPackageData } from '#base/handlers';
import { Border, LayoutImage, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { FurnitureBannerDialogView } from '#base/views/room-widgets/furniture/FurnitureBannerDialogView';

import { PET_PACKAGE_WIDGET } from './furnitureWidgetData';

/**
 * Naming the pet inside an unopened package, on the `petpackage_new` layout (475x250) that
 * `PetPackageFurniWidget.showInterface` builds: its `input_border` sits at (17, 25) in the 475x124
 * container at y 90, and its button row at y 64 in that container. The server has the last word
 * on the name - it is checked rather than merely accepted - so a refusal comes back here and the
 * box stays shut until something acceptable is typed.
 *
 * Flash says why a name was refused in an alert (`windowManager.alert`); the port has no alert to
 * raise from here, so the reason is written under the field instead - the one line of this dialog
 * the layout does not place. Flash builds the older `petpackage` layout instead when the request
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
            captionKey="widgets.petpackage.name.title"
            titleKey="petpackage.header.title"
            descriptionKey="widgets.petpackage.name.select"
            iconPath="client_static/petpackage_box.png"
            height={250}
            buttonRow={{ left: 0, top: 154, cancelLeft: 107, confirmLeft: 239 }}
            confirmKey="widgets.petpackage.name.pick"
            onConfirm={() => send(new OpenPetPackageComposer({ objectId: data.objectId, name }))}
            onCancel={onClose}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 17, top: 115, width: 417, height: 34 }}
            >
                <TextInput
                    value={name}
                    onChange={setName}
                    maxLength={15}
                    textStyle="u_headline_medium"
                    textColor="#888888"
                    flashPlacement
                    alwaysShowSelection
                    layout={{ position: 'absolute', left: 7, top: 6, width: 380, height: 17 }}
                />
                <ThemeImage
                    src={LayoutImage('shared/common_small_pen.png')}
                    bitmap={{ fitSizeToContents: true }}
                    layout={{ position: 'absolute', left: 393, top: 8 }}
                />
            </Border>
            {!!data.error && (
                <ThemeText
                    text={t(data.error, data.error)}
                    textOptions={{ fill: '#aa0000' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 24, top: 150 }}
                />
            )}
        </FurnitureBannerDialogView>
    );
};
