import { OpenPetPackageComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { PetPackageData } from '#base/handlers';
import { Border, TextInput, ThemeText } from '#base/theme';
import { FurnitureBannerDialogView } from '#base/views/room-widgets/furniture/FurnitureBannerDialogView';

import { PET_PACKAGE_WIDGET } from './furnitureWidgetData';

/**
 * Naming the pet inside an unopened package, on the `petpackage_new` layout (475x250). The
 * server has the last word on the name - it is checked rather than merely accepted - so a
 * refusal comes back here and the box stays shut until something acceptable is typed.
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
            height={250}
            confirmKey="widgets.petpackage.name.pick"
            onConfirm={() => send(new OpenPetPackageComposer({ objectId: data.objectId, name }))}
            onCancel={onClose}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 17, width: 417, top: 15, height: 65 }}
            >
                <TextInput
                    value={name}
                    onChange={setName}
                    maxLength={15}
                    layout={{ position: 'absolute', left: 7, right: 7, top: 6, height: 25 }}
                />
                {!!data.error && (
                    <ThemeText
                        text={t(data.error, data.error)}
                        textOptions={{ fill: '#aa0000', wordWrap: true, wordWrapWidth: 400 }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 7, width: 400, top: 36, height: 24 }}
                    />
                )}
            </Border>
        </FurnitureBannerDialogView>
    );
};
