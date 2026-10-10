/**
 * The inspection tab's `preview_container` - `VariableHolderPreviewer` on the layout's
 * `preview_border`: the instruction to pick something (`preview_instruction_furni` /
 * `preview_instruction_user`), the room's globals' `global_placeholder`, or the inspected object
 * itself, centred in the border (`centerContainer`): a furni as the room engine draws it facing 180
 * at scale 64 (`preview_image_bitmap`, zoomed to half when it does not fit), an avatar or bot full
 * length (`preview_avatar`, cropped), a pet as the pet image widget draws it (`preview_pet`). The
 * object is drawn by code into the border, where the widget would be centred; the layout's widgets
 * and bitmap stay hidden. The tab binds the rest of the border's windows.
 *
 * The furni is rendered from its type and colour (`getGenericRoomObjectTexture`); what its stuff
 * data would add to the picture (a poster's image, a trophy's plate) is not drawn.
 */
import { AvatarGenderType, RoomGeometryScaleType, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { AvatarImage } from '#base/components/AvatarImage';
import { useRoom, useRoomStore } from '#base/context/room';
import { WiredInspectionPreview } from '#base/context/wired';
import { useChatPetFace, useFurnitureImageTexture } from '#base/hooks';
import { Box, ThemeImage } from '#base/theme';

/**
 * `setFurniByObjectId` zooms the bitmap to half when it is as wide as the previewer's container
 * (`preview_container`, 150 x 274) less 6, or taller than its height less 6.
 */
const ZOOM_WIDTH = 150 - 6;
const ZOOM_HEIGHT = 274 - 6;

const FurniPreview = ({ objectId }: { objectId: number }) => {
    const room = useRoom();
    const roomObject = room?.getRoomObject(Math.abs(objectId), (objectId < 0) ? RoomObjectCategoryEnum.Wall : RoomObjectCategoryEnum.Floor);
    const colorIndex = roomObject?.model.getValue<number>(RoomObjectVariableEnum.FurnitureColor) ?? 0;
    const extras = roomObject?.model.getValue<number>(RoomObjectVariableEnum.FurnitureExtras) ?? 0;
    const { texture, width, height } = useFurnitureImageTexture(roomObject?.type, Number(colorIndex) || 0, 180, RoomGeometryScaleType.ZoomedIn, Number(extras) || 0);

    if (!texture) return null;

    const zoom = ((width >= ZOOM_WIDTH) || (height > ZOOM_HEIGHT)) ? 0.5 : 1;

    return (
        <ThemeImage
            texture={texture}
            layout={{ width: width * zoom, height: height * zoom }}
        />
    );
};

const PetPreview = ({ figure, posture }: { figure: string; posture: string }) => {
    const { texture } = useChatPetFace(figure, posture, { scale: RoomGeometryScaleType.ZoomedIn, direction: 2 });

    if (!texture) return null;

    return <ThemeImage texture={texture} />;
};

/** `setPreviewByUserIndex`: a user, bot or rentable bot in the avatar widget, a pet in the pet widget. */
const UserPreview = ({ userIndex }: { userIndex: number }) => {
    const userData = useRoomStore(x => x.usersByRoomObjectId[userIndex]);

    if (!userData) return null;

    switch (Number(userData.userType)) {
        case Number(RoomObjectUserType.User):
        case Number(RoomObjectUserType.Bot):
        case Number(RoomObjectUserType.RentableBot):
            return (
                <AvatarImage
                    figure={userData.figure}
                    gender={userData.gender ?? AvatarGenderType.Male}
                    cropped
                    direction={2}
                />
            );
        case Number(RoomObjectUserType.Pet):
            return (
                <PetPreview
                    figure={userData.figure}
                    posture={userData.petPosture}
                />
            );
        default:
            return null;
    }
};

export interface WiredMenuInspectionPreviewProps {
    preview: WiredInspectionPreview;
}

/** The inspected furni or user, centred in `preview_border` (what goes into its `children`). */
export const WiredMenuInspectionPreview = ({ preview }: WiredMenuInspectionPreviewProps) => {
    if ((preview.kind !== 'furni') && (preview.kind !== 'user')) return null;

    return (
        <Box
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
            {(preview.kind === 'furni') && (
                <FurniPreview
                    key={preview.objectId}
                    objectId={preview.objectId}
                />
            )}
            {(preview.kind === 'user') && (
                <UserPreview
                    key={preview.userIndex}
                    userIndex={preview.userIndex}
                />
            )}
        </Box>
    );
};
