/**
 * "Choose your room" - `friendbar/onBoardingHcSteps/RoomPicker`, in its container at 0,95 of the
 * flow's main area (`initView`):
 *
 * - the hint in Ubuntu 24 `0x7ECAEE`, wrapped at 500, at 25,-70;
 * - one round picture per room type of `new.user.flow.roomTypes` ("10,11,12"), from
 *   `https://images.habbo.com/c_images/nux/nux_room_<type>_round.png` - fixed in Flash, the hotel's
 *   `new.user.flow.room.image.url` here, `%type%` the type - 280 apart with 30 before
 *   each, 10 down; a press on one picks it (`onRoomClick`), and the tick sits on the picked one's
 *   bottom left corner (`chooseRoom`);
 * - under the pictures, 20 down, a 640x100 balloon (`0x0F324E`) with the room's name
 *   (`room.name.<type>`, Ubuntu 20 white, wrapped at 260) 30 under them and its description
 *   (`room.description.<type>`, Ubuntu 18 `0x7ECAEE`) 55 under them, both at 50;
 * - "Select" at 725,360, which sends the pick (`onButtonSelect`).
 *
 * The balloon, the texts and the button wait until every picture has loaded
 * (`roomImageLoadCompleteHandler`). The first room is picked to begin with.
 */
import { useEffect, useState } from 'react';

import { useConfigValue, useTranslation } from '#base/context/system';
import { Box, loadTexture, ThemeImage } from '#base/theme';

import { HITCH_TEXT_BODY_COLOUR, OnboardingBalloon, OnboardingGreenButton, OnboardingImage, OnboardingText } from './OnboardingWidgets';

/** `RoomPicker.galleryUrl` + `nux_room_<type>_round.png`, when the hotel names no other picture. */
const DEFAULT_ROOM_IMAGE_URL = 'https://images.habbo.com/c_images/nux/nux_room_%type%_round.png';

/** `fetchThumbnails`' fallback for `new.user.flow.roomTypes`. */
const DEFAULT_ROOM_TYPES = '10,11,12';

const IMAGE_WIDTH = 280;
/** `_spaceBetweenImages`. */
const IMAGE_SPACE = 30;
const IMAGE_Y = 10;
/** The pictures are 296x315; the balloon and texts are placed from their bottom. */
const IMAGE_HEIGHT = 315;
const TICK_HEIGHT = 98;
const BALLOON = { width: 640, height: 100, color: 0x0f324e };
const TEXT_X = 50;
const TEXT_WIDTH = 260;
const SELECT = { x: 725, y: 360 };
const HINT = { x: 25, y: -70, width: 500 };

const roomImageUrl = (template: string, type: string) => template.replaceAll('%type%', type);

/** A picture, loaded like any url texture; `onPick` on a press. */
const OnboardingRoomImage = ({ url, index, onPick }: { url: string; index: number; onPick: () => void }) => (
    <Box
        cursor="pointer"
        layout={{ position: 'absolute', left: ((index + 1) * IMAGE_SPACE) + (index * IMAGE_WIDTH), top: IMAGE_Y }}
        onPointerTap={onPick}
    >
        <ThemeImage src={url} />
    </Box>
);

interface OnboardingRoomPickerViewProps {
    onSelect: (roomType: string) => void;
}

export const OnboardingRoomPickerView = ({ onSelect }: OnboardingRoomPickerViewProps) => {
    const t = useTranslation();
    const roomTypesValue = useConfigValue<string>('new.user.flow.roomTypes') ?? DEFAULT_ROOM_TYPES;
    const imageUrl = useConfigValue<string>('new.user.flow.room.image.url') || DEFAULT_ROOM_IMAGE_URL;
    const roomTypes = roomTypesValue.split(',');
    const [ picked, setPicked ] = useState(0);
    const [ loadedTypes, setLoadedTypes ] = useState<string | undefined>(undefined);
    const loaded = loadedTypes === roomTypesValue;

    // `roomImageLoadCompleteHandler`: the rest is drawn once every picture is in.
    useEffect(() => {
        let cancelled = false;

        void Promise.all(roomTypesValue.split(',').map(type => loadTexture(roomImageUrl(imageUrl, type)))).then(() => {
            if (!cancelled) setLoadedTypes(roomTypesValue);
        });

        return () => {
            cancelled = true;
        };
    }, [ roomTypesValue, imageUrl ]);
    const type = roomTypes[picked];
    const pickedX = ((picked + 1) * IMAGE_SPACE) + (picked * IMAGE_WIDTH);
    const below = IMAGE_Y + IMAGE_HEIGHT;

    return (
        <Box layout={{ position: 'absolute', left: 0, top: 95, width: '100%', height: 420 }}>
            <OnboardingText
                text={t('onboarding.room.information', 'Choose your first room. This room gets you started. You can create more free rooms later, if you like.')}
                size={24}
                color={HITCH_TEXT_BODY_COLOUR}
                width={HINT.width}
                thickness={50}
                layout={{ position: 'absolute', left: HINT.x, top: HINT.y }}
            />
            {roomTypes.map((roomType, index) => (
                <OnboardingRoomImage
                    key={roomType}
                    url={roomImageUrl(imageUrl, roomType)}
                    index={index}
                    onPick={() => setPicked(index)}
                />
            ))}
            {loaded && (
                <>
                    <OnboardingBalloon
                        width={BALLOON.width}
                        height={BALLOON.height}
                        color={BALLOON.color}
                        layout={{ left: IMAGE_SPACE, top: below + 20 }}
                    />
                    <OnboardingText
                        text={t(`room.name.${type}`, `Room ${type}`)}
                        size={20}
                        color="#ffffff"
                        width={TEXT_WIDTH}
                        layout={{ position: 'absolute', left: TEXT_X, top: below + 30 }}
                    />
                    <OnboardingText
                        text={t(`room.description.${type}`, '\nTwo-line description')}
                        size={18}
                        color={HITCH_TEXT_BODY_COLOUR}
                        layout={{ position: 'absolute', left: TEXT_X, top: below + 55 }}
                    />
                    <OnboardingImage
                        name="icon_yes"
                        x={pickedX}
                        y={below - TICK_HEIGHT}
                    />
                    <OnboardingGreenButton
                        caption={t('room.select', 'Select')}
                        onPress={() => onSelect(type)}
                        layout={{ left: SELECT.x, top: SELECT.y }}
                    />
                </>
            )}
        </Box>
    );
};
