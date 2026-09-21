/**
 * The inspection tab's `preview_border` - `VariableHolderPreviewer`: the instruction to pick
 * something, the placeholder for the room's globals, or the inspected object itself, centred
 * (`centerContainer`): a furni as the room engine draws it facing 180 at scale 64 (halved when it
 * does not fit, as Flash zooms the bitmap), an avatar or bot full length, a pet as the pet image
 * widget draws it. The "highlight wireds" button sits in its corner for a furni.
 *
 * The furni is rendered from its type and colour (`getGenericRoomObjectTexture`); what its stuff
 * data would add to the picture (a poster's image, a trophy's plate) is not drawn.
 */
import { AvatarGenderType, RoomGeometryScaleType, RoomObjectCategoryEnum, RoomObjectUserType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { AvatarImage } from '#base/components/AvatarImage';
import { useRoom, useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { WiredInspectionPreview } from '#base/context/wired';
import { useChatPetFace } from '#base/hooks';
import { Border, Box, ContainerButton, LayoutImage, ThemeImage, ThemeText } from '#base/theme';

import { useFurnitureImageTexture } from '../catalog/useFurnitureImageTexture';

const BORDER_WIDTH = 141;
const BORDER_HEIGHT = 225;

const FurniPreview = ({ objectId }: { objectId: number }) => {
    const room = useRoom();
    const roomObject = room?.getRoomObject(Math.abs(objectId), (objectId < 0) ? RoomObjectCategoryEnum.Wall : RoomObjectCategoryEnum.Floor);
    const colorIndex = roomObject?.model.getValue<number>(RoomObjectVariableEnum.FurnitureColor) ?? 0;
    const extras = roomObject?.model.getValue<number>(RoomObjectVariableEnum.FurnitureExtras) ?? 0;
    const { texture, width, height } = useFurnitureImageTexture(roomObject?.type, Number(colorIndex) || 0, 180, RoomGeometryScaleType.ZoomedIn, Number(extras) || 0);

    if (!texture) return null;

    // `setFurniByObjectId`: zoomed to half when it would not fit inside the border.
    const zoom = ((width >= (BORDER_WIDTH - 6)) || (height > (BORDER_HEIGHT - 6))) ? 0.5 : 1;

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
    /** The highlight button is there for a furni, and enabled when the furni is configured in wired boxes. */
    showHighlightButton: boolean;
    highlightEnabled: boolean;
    onHighlight: () => void;
}

export const WiredMenuInspectionPreview = ({ preview, showHighlightButton, highlightEnabled, onHighlight }: WiredMenuInspectionPreviewProps) => {
    const t = useTranslation();
    const catalogIconsUrl = useConfigValue<string>('catalog.icons.url') ?? '';

    const instruction = (key: string) => (
        <ThemeText
            text={t(key, key)}
            textStyle="u_regular"
            textOptions={{ fill: '#000000', align: 'center' }}
            alpha={0.6}
            verticalAlign="top"
            layout={{ position: 'absolute', left: 0, top: 104, width: BORDER_WIDTH, height: 17 }}
        />
    );

    return (
        <Border
            variant="3"
            tintColor="#dadada"
            layout={{ position: 'absolute', left: 0, top: 20, width: BORDER_WIDTH, height: BORDER_HEIGHT, overflow: 'hidden' }}
        >
            {(preview.kind === 'furni_instructions') && instruction('wiredmenu.inspection.preview_furni_instruction')}
            {(preview.kind === 'user_instructions') && instruction('wiredmenu.inspection.preview_user_instruction')}
            <Box layout={{ position: 'absolute', left: 0, top: 0, width: BORDER_WIDTH, height: BORDER_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
                {(preview.kind === 'global') && <ThemeImage src={LayoutImage('wired/wired_global_placeholder.png')} />}
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
            {showHighlightButton && (
                <Box
                    alpha={highlightEnabled ? 1 : 0.5}
                    layout={{ position: 'absolute', left: 110, top: 6, width: 25, height: 26 }}
                >
                    <ContainerButton
                        variant="7"
                        disabled={!highlightEnabled}
                        tooltip={t('wiredmenu.inspection.highlight_wireds', 'wiredmenu.inspection.highlight_wireds')}
                        onPointerTap={onHighlight}
                        layout={{ width: 25, height: 26 }}
                    >
                        {/* `${image.library.url}catalogue/icon_80.png` - the catalogue icon set, which this client reaches through `catalog.icons.url`. */}
                        {!!catalogIconsUrl.length && (
                            <ThemeImage
                                src={catalogIconsUrl.replace('%name%', '80')}
                                eventMode="none"
                                layout={{ position: 'absolute', left: 4, top: 6 }}
                            />
                        )}
                    </ContainerButton>
                </Box>
            )}
        </Border>
    );
};
