/**
 * "Choose your style"'s name box - `friendbar/onBoardingHc/HitchNameChangeDialog` (style 2 of
 * `NameChangeDialog`), drawn where the flow puts it: its frame at `-width / 2` of the name area and
 * 50 up, so the 330x31 field's corner is `(x, y)` here.
 *
 * - The field holds `name` ("Enter name here") in Ubuntu 18 bold `0x666666` until it is first
 *   clicked, which empties it (`onInputClicked`).
 * - Half a second after the last change the name is asked about (`onIdleTimer` -> `checkName`),
 *   with the wait indicator turning at the field's right end until the answer for that name comes.
 * - A change hides the tick and any error (`removeIndicators`); an answer shows the tick again -
 *   always, as `nameIsCorrect`'s setter forces it on - and an error code shows the red field, the
 *   alert icon over the tick and the reason in a strip under the field (`showErrorMessage`).
 *
 * The tip balloon `init` builds is shown only when the name is not correct, which the forced tick
 * never lets happen, so it is not drawn.
 */
import { useEffect, useState } from 'react';

import { useOnboardingStore } from '#base/context/onboarding';
import { useTranslation } from '#base/context/system';
import { Box, TextInput } from '#base/theme';

import { OnboardingImage, OnboardingNineSlice, OnboardingText, OnboardingWaitIndicator } from './OnboardingWidgets';

/** `NameChangeDialog.IDLE_TIME_MS`. */
const IDLE_TIME_MS = 500;

/** The hitch field (`INPUT_FIELD_HITCH`, 330x31) and what sits on it. */
const FIELD_WIDTH = 330;
const FIELD_HEIGHT = 31;
const TEXT_X = 16;
/** The text field: Ubuntu 18 bold is 25 tall with its gutter, centred in the field (`int((31 - 25) / 2)`). */
const TEXT_HEIGHT = 25;
const ICON_SIZE = { width: 15, height: 17 };
const ICON_MARGIN = 7;
/** `showErrorMessage`: the strip under the field. */
const ERROR_GAP = 4;
const ERROR_HEIGHT = FIELD_HEIGHT - 11;

const TEXT_COLOR = '#666666';

/** `ChangeUserNameResultMessageEvent`'s codes, as `checkNameResponse` reads them. */
const ERROR_TEXTS: Record<number, [ string, string ]> = {
    2: [ 'rename.error.too_short', 'OOPS! YOUR NAME\'S TOO SHORT TO PRONOUNCE.' ],
    3: [ 'rename.error.too_long', 'OOPS! YOUR NAME\'S TOO LONG TO REMEMBER' ],
    4: [ 'rename.error.words', 'OOPS! THINK HARDER - THAT\'S NOT A VERY NICE NAME.' ],
    5: [ 'rename.error.taken', 'OOPS! SOMEONE\'S ALREADY USING THAT NAME.' ],
    6: [ 'rename.error.taken', 'OOPS! SOMEONE\'S ALREADY USING THAT NAME.' ],
};

interface OnboardingNameViewProps {
    x: number;
    y: number;
    value: string;
    onChange: (value: string) => void;
    /** `checkName`: true when it was asked. */
    onCheck: (name: string) => boolean;
}

export const OnboardingNameView = ({ x, y, value, onChange, onCheck }: OnboardingNameViewProps) => {
    const t = useTranslation();
    const nameCheck = useOnboardingStore(state => state.nameCheck);
    const [ clicked, setClicked ] = useState(false);
    const [ changed, setChanged ] = useState(false);
    const [ asked, setAsked ] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!changed) return;

        const timer = setTimeout(() => {
            if (onCheck(value)) setAsked(value);
        }, IDLE_TIME_MS);

        return () => clearTimeout(timer);
    }, [ value, changed, onCheck ]);

    // `checkNameResponse` only takes an answer for the name the field holds.
    const answer = (nameCheck && changed && (nameCheck.name === value) && (asked === value)) ? nameCheck : undefined;
    const error = answer && ERROR_TEXTS[answer.resultCode];
    const waiting = changed && (asked === value) && !answer;
    const showTick = !changed || !!answer;

    const change = (next: string) => {
        setChanged(true);
        setAsked(undefined);
        onChange(next);
    };

    return (
        <Box layout={{ position: 'absolute', left: x, top: y, width: FIELD_WIDTH, height: FIELD_HEIGHT }}>
            <OnboardingImage name={error ? 'input_error_hitch' : 'input_field_hitch'} />
            <Box layout={{ position: 'absolute', left: TEXT_X, top: Math.trunc((FIELD_HEIGHT - TEXT_HEIGHT) / 2), width: FIELD_WIDTH - 30, height: TEXT_HEIGHT }}>
                <TextInput
                    value={value}
                    onChange={change}
                    onFocusChange={(focused) => {
                        // `onInputClicked`: the first click empties the field of its default text.
                        if (!focused || clicked) return;

                        setClicked(true);
                        change('');
                    }}
                    fontFamily="Ubuntu"
                    fontSize={18}
                    textColor={TEXT_COLOR}
                    flashFormat={{ bold: true, kerning: false }}
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    flashPlacement
                    layout={{ width: FIELD_WIDTH - 30, height: TEXT_HEIGHT }}
                />
            </Box>
            <OnboardingImage
                name="icon_name_ok"
                x={FIELD_WIDTH - ICON_SIZE.width - ICON_MARGIN}
                y={Math.trunc((FIELD_HEIGHT - ICON_SIZE.height) / 2)}
                visible={showTick}
            />
            <OnboardingImage
                name="icon_name_alert"
                x={FIELD_WIDTH - ICON_SIZE.width - ICON_MARGIN}
                y={Math.trunc((FIELD_HEIGHT - ICON_SIZE.height) / 2)}
                visible={!!error}
            />
            {waiting && <OnboardingWaitIndicator layout={{ left: FIELD_WIDTH - Math.trunc(ICON_SIZE.width / 2) - ICON_MARGIN, top: Math.trunc(FIELD_HEIGHT / 2) + 2 }} />}
            {error && (
                <Box layout={{ position: 'absolute', left: 0, top: FIELD_HEIGHT + ERROR_GAP, width: FIELD_WIDTH, height: ERROR_HEIGHT }}>
                    <OnboardingNineSlice
                        name="input_error_alert_hitch"
                        left={3}
                        top={3}
                        right={3}
                        bottom={3}
                        width={FIELD_WIDTH}
                        height={ERROR_HEIGHT}
                    />
                    <Box layout={{ position: 'absolute', left: TEXT_X, top: 0, height: ERROR_HEIGHT, justifyContent: 'center' }}>
                        <OnboardingText
                            text={t(error[0], error[1])}
                            size={10}
                            color="#ffffff"
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};
