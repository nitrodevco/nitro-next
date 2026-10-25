/**
 * The new user flow - `friendbar/onBoardingHc/OnBoardingHcFlow`, the full-screen sequence Habbo
 * shows a new account before the hotel view: "Choose your style" (the look editor and, with login
 * action 0, the name box) and then, with action 1, "Choose your room".
 *
 * Laid out as `init` and `layoutMainElements` do over the whole stage:
 *
 * - `Background`: a vertical gradient - `0x0C5A7F` down to a quarter of the height, blending to
 *   `0x0C3A65` at half of it and that colour below (`createGradientBox(50, 100)` turned and scaled
 *   to the stage, ratios 127 and 255) - with `hitchTile` tiled over everything;
 * - the logo at 40,40 and the step's title in Ubuntu 40 white (thickness 50) at 185,45;
 * - the main area 95 down, centred: `(stage width - (its width + 20)) / 2`, or 0 when the stage is
 *   narrower - then the right of it is cut off, as it is in Habbo. Its width is the name box's
 *   right edge: the name area starts 125 short of the look editor's right edge (982, where its
 *   widest text ends), and the 330-wide field sits 200 left of that.
 *
 * "I'm ready" saves the look and claims the name and moves straight on (`saveOutfit`,
 * `submitName`, `editorFinished`): to the room picker with action 1, else the flow ends. The room
 * picker's answer ends it too (`registerOnboardingHandlers`).
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { checkOnboardingName, selectInitialRoom, submitOnboardingLook } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { ONBOARDING_ACTION_NAME_CHANGE, ONBOARDING_ACTION_ROOM_SELECT, useOnboardingActions, useOnboardingStore } from '#base/context/onboarding';
import { useTranslation } from '#base/context/system';
import { useViewportSize } from '#base/hooks';
import { Box, Gradient, Region, toCssHexColor, useTextureFromUrl } from '#base/theme';

import { onboardingAsset } from './onboardingAsset';
import { OnboardingAvatarEditorView } from './OnboardingAvatarEditorView';
import { OnboardingNameView } from './OnboardingNameView';
import { OnboardingRoomPickerView } from './OnboardingRoomPickerView';
import { OnboardingImage, OnboardingText } from './OnboardingWidgets';

/** `Background.resize`'s colours. */
const TOP_COLOR = 0x0c5a7f;
const BOTTOM_COLOR = 0x0c3a65;

/** `LOGO_AREA_HEIGHT`: the main area's top. */
const MAIN_Y = 95;

/** The name area (`§_-p1H§` after `layoutMainElements`) and its width (`_nameAreaWidth`). */
const NAME_AREA_X = 982 - 125;
const NAME_AREA_WIDTH = 400;
/** The name box's field, as `HitchNameChangeDialog` puts it: half the area left, 50 up. */
const NAME_FIELD = { x: NAME_AREA_X - (NAME_AREA_WIDTH / 2), y: MAIN_Y - 50 };
/** The main area's width: the name field's right edge. */
const MAIN_WIDTH = NAME_FIELD.x + 330;
/** Tall enough for both steps' lowest buttons; a press only reaches what is inside it. */
const ONBOARDING_MAIN_HEIGHT = 520;

/** `Background`: the gradient, then the tiles over it. */
const OnboardingBackground = ({ width, height }: { width: number; height: number }) => {
    const tiles = useTextureFromUrl(onboardingAsset('background_tiles'));
    const quarter = Math.round(height / 4);
    const half = Math.round(height / 2);

    return (
        <>
            <Region
                backgroundColor={toCssHexColor(TOP_COLOR)}
                layout={{ position: 'absolute', left: 0, top: 0, width, height: quarter }}
            />
            <Gradient
                color1={0xff000000 | TOP_COLOR}
                color2={0xff000000 | BOTTOM_COLOR}
                direction="down"
                layout={{ position: 'absolute', left: 0, top: quarter, width, height: half - quarter }}
            />
            <Region
                backgroundColor={toCssHexColor(BOTTOM_COLOR)}
                layout={{ position: 'absolute', left: 0, top: half, width, height: height - half }}
            />
            {tiles && (
                <pixiTilingSprite
                    texture={tiles}
                    eventMode="none"
                    layout={{ position: 'absolute', left: 0, top: 0, width, height }}
                />
            )}
        </>
    );
};

export const OnboardingView = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { width, height } = useViewportSize();
    const loginActions = useOnboardingStore(x => x.loginActions);
    const step = useOnboardingStore(x => x.step);
    const { setStep, finish } = useOnboardingActions();
    const [ name, setName ] = useState(() => t('name', 'Enter name here'));
    const nameStep = loginActions.includes(ONBOARDING_ACTION_NAME_CHANGE);
    const roomStep = loginActions.includes(ONBOARDING_ACTION_ROOM_SELECT);
    const mainX = Math.max(0, Math.trunc((width - (MAIN_WIDTH + 20)) / 2));

    /** `saveOutfit` -> `submitName` -> `editorFinished`. */
    const ready = (figure: string, gender: AvatarGenderType) => {
        submitOnboardingLook(send, figure, gender, nameStep ? name : undefined);

        if (roomStep) setStep('room');
        else finish();
    };

    return (
        <Region
            interactive
            layout={{ position: 'absolute', left: 0, top: 0, width, height }}
        >
            <OnboardingBackground
                width={width}
                height={height}
            />
            <OnboardingImage
                name="habbo_logo"
                x={40}
                y={40}
            />
            <OnboardingText
                text={(step === 'name') ? t('onboarding.choose.your.style', 'My looks') : t('onboarding.choose.your.room', 'Choose your room')}
                size={40}
                color="#ffffff"
                thickness={50}
                layout={{ position: 'absolute', left: 185, top: 45 }}
            />
            <Box layout={{ position: 'absolute', left: mainX, top: MAIN_Y, width: MAIN_WIDTH, height: ONBOARDING_MAIN_HEIGHT }}>
                {(step === 'name') && (
                    <>
                        <OnboardingAvatarEditorView onReady={ready} />
                        {nameStep && (
                            <OnboardingNameView
                                x={NAME_FIELD.x}
                                y={NAME_FIELD.y}
                                value={name}
                                onChange={setName}
                                onCheck={next => checkOnboardingName(send, next)}
                            />
                        )}
                    </>
                )}
                {(step === 'room') && <OnboardingRoomPickerView onSelect={type => selectInitialRoom(send, type)} />}
            </Box>
        </Region>
    );
};
