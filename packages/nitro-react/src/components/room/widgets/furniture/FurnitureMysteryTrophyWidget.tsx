import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { OpenMysteryTrophyComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { Border, LayoutImage, TextInput, ThemeImage } from '#base/theme';
import { FurnitureBannerDialogView } from '#base/views/room-widgets/furniture/FurnitureBannerDialogView';

/** What the layout's field takes; the engraving is permanent, so it is a generous limit. */
const MAX_INSCRIPTION_LENGTH = 500;

/**
 * A mystery trophy, engraved as it is opened - `MysteryTrophyOpenDialogView` on the `mysterytrophy`
 * layout, whose `input_border` sits at (17, 15) in the 475x90 container at y 100. Whatever is typed here is what the trophy will
 * say for good - there is no second dialog, which is why the box asks so plainly.
 */
export const FurnitureMysteryTrophyWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ inscription, setInscription ] = useState<string>('');

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG);

    if (!request) return null;

    return (
        <FurnitureBannerDialogView
            captionKey="mysterytrophy.name.title"
            titleKey="mysterytrophy.header.title"
            descriptionKey="mysterytrophy.header.description"
            iconPath="client_static/alert_mystTrophy.png"
            height={270}
            buttonRow={{ left: -1, top: 186, cancelLeft: 177, confirmLeft: 319 }}
            onConfirm={() => {
                send(new OpenMysteryTrophyComposer({ objectId: request.objectId, inscription }));
                onClose();
            }}
            onCancel={onClose}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 17, top: 115, width: 417, height: 65 }}
            >
                <TextInput
                    value={inscription}
                    onChange={setInscription}
                    maxLength={MAX_INSCRIPTION_LENGTH}
                    multiline
                    textStyle="u_regular"
                    flashPlacement
                    layout={{ position: 'absolute', left: 7, top: 6, width: 380, height: 50 }}
                />
                <ThemeImage
                    src={LayoutImage('shared/common_small_pen.png')}
                    bitmap={{ fitSizeToContents: true }}
                    layout={{ position: 'absolute', left: 390, top: 20 }}
                />
            </Border>
        </FurnitureBannerDialogView>
    );
};
