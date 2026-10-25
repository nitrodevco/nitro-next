/**
 * "Choose your style"'s look editor - `friendbar/onBoardingHcSteps/AvatarEditor`, laid out as its
 * `onAddedToStage` lays it out (in the flow's main area, which it fills from 0,0):
 *
 * - three headers in Ubuntu 24 `0x7ECAEE` (thickness 50) at 35, 370 and 650, 5 down;
 * - the parts grid at 40,50: a row per category (`hr hd ch lg sh`), 63 apart, of up to five
 *   50x53 round buttons 60 apart, each drawing its part alone in the category's colours (a head
 *   cropped to the head, anything else to its bounds, facing 2);
 * - the colours of the category being edited at 375,50: four to a row, 52 across and 63 down;
 * - the figure facing 4 at twice its size at 750,90 (`getNameAreaX() + width / 2 + 15` with the
 *   name area still at its first 535 x 400), the glow under it at 695,90 (added) and the halo at
 *   785,290 (overlay), and the clouds over it;
 * - Male, Female and the dice at 655,105 (`lineUpHorizontally`: 60 between the two, 30 before the
 *   dice, the dice 10 up);
 * - "Can't decide?" in Ubuntu 12 bold white, wrapped at 300, at 715,380;
 * - "I'm ready" at 755,435 - its `x` was worked out from a button not yet drawn, so of width 0.
 *
 * The HC teaser and its HC-only parts are not shown: `HabboLandingView` turns them off
 * (`setHcVisibility(false)`).
 */
import { AvatarGenderType, IPartColor } from '@nitrodevco/nitro-api';

import { useOnboardingActions, useOnboardingStore } from '#base/context/onboarding';
import { useTranslation } from '#base/context/system';
import { Box, useAvatarImageTexture } from '#base/theme';
import { getOnboardingColors, getOnboardingFigureString, getOnboardingPartFigure, getOnboardingPartIds, getOnboardingWornParts, ONBOARDING_CATEGORIES } from '#base/utils';

import { OnboardingCloudsView } from './OnboardingCloudsView';
import { HITCH_TEXT_BODY_COLOUR, OnboardingColorButton, OnboardingGreenButton, OnboardingImage, OnboardingRadioButton, OnboardingRandomizeButton, OnboardingRoundButton, OnboardingText } from './OnboardingWidgets';

/** Where the editor's pieces are (`onAddedToStage`, `addFigureImage`, `addGenderButtons`). */
const GRID = { x: 40, y: 50 };
const GRID_COLUMN = 60;
const GRID_ROW = 63;
const COLORS = { x: 375, y: 50 };
const COLOR_COLUMN = 52;
const COLOR_ROW = 63;
const COLORS_PER_ROW = 4;
const FIGURE = { x: 750, y: 90 };
const FIGURE_SCALE = 2;
const FIGURE_DIRECTION = 4;
const THUMB_DIRECTION = 2;
const GENDER = { x: 655, y: 105 };
const READY = { x: 755, y: 435 };
const CANT_DECIDE = { x: 715, y: 380, width: 300 };
const HEADERS = [ { key: 'onboarding.your.looks', fallback: 'Choose looks', x: 35 }, { key: 'onboarding.your.colour', fallback: 'Choose colour', x: 370 }, { key: 'onboarding.this.is.your.habbo', fallback: 'This is your Habbo', x: 650 } ];

/**
 * A part button's thumbnail: the part on its own, centred in the 50x53 button. Flash makes it with
 * no gender (`createAvatarImage(figure, "h")`), so no body is filled in around the part.
 */
const OnboardingPartThumb = ({ figure, head }: { figure: string; head: boolean }) => {
    const { texture, width, height } = useAvatarImageTexture(figure, undefined, { headOnly: head, cropped: true, direction: THUMB_DIRECTION });

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            eventMode="none"
            layout={{ position: 'absolute', left: Math.trunc((50 - width) / 2), top: Math.trunc((53 - height) / 2), width, height }}
        />
    );
};

/** The figure at twice its size, pixel for pixel (`_figureContainer.scaleX = 2`). */
const OnboardingFigure = ({ figure, gender }: { figure: string; gender: AvatarGenderType }) => {
    const { texture, width, height } = useAvatarImageTexture(figure, gender, { direction: FIGURE_DIRECTION });

    if (!texture) return null;

    return (
        <pixiSprite
            texture={texture}
            eventMode="none"
            layout={{ position: 'absolute', left: FIGURE.x, top: FIGURE.y, width: width * FIGURE_SCALE, height: height * FIGURE_SCALE }}
        />
    );
};

interface OnboardingAvatarEditorViewProps {
    /** `saveOutfit`: "I'm ready", with the figure and gender to save. */
    onReady: (figure: string, gender: AvatarGenderType) => void;
}

export const OnboardingAvatarEditorView = ({ onReady }: OnboardingAvatarEditorViewProps) => {
    const t = useTranslation();
    const editor = useOnboardingStore(x => x.editor);
    const { rollFigure, chooseGender, clickPart, selectColor } = useOnboardingActions();

    if (!editor) return null;

    const gender = editor.gender;
    const figure = editor.figures[gender];
    const figureString = getOnboardingFigureString(figure);
    const worn = getOnboardingWornParts(editor);
    const colors: IPartColor[] = getOnboardingColors(editor.editing);

    return (
        <Box layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
            <OnboardingImage
                name="avatar_halo"
                x={FIGURE.x + 35}
                y={290}
                blendMode="overlay"
            />
            <OnboardingImage
                name="avatar_glow"
                x={FIGURE.x - 55}
                y={FIGURE.y}
                blendMode="add"
            />
            <OnboardingFigure
                figure={figureString}
                gender={gender}
            />
            <OnboardingCloudsView
                roll={editor.rolls}
                drift={editor.cloudDrift}
                layout={{ left: FIGURE.x, top: FIGURE.y }}
            />
            {HEADERS.map(header => (
                <OnboardingText
                    key={header.key}
                    text={t(header.key, header.fallback)}
                    size={24}
                    color={HITCH_TEXT_BODY_COLOUR}
                    width={300}
                    thickness={50}
                    layout={{ position: 'absolute', left: header.x, top: 5 }}
                />
            ))}
            <Box layout={{ position: 'absolute', left: GENDER.x, top: GENDER.y, flexDirection: 'row', alignItems: 'flex-start' }}>
                <OnboardingRadioButton
                    caption={t('gender.male', 'Male')}
                    on="button_boy_active"
                    off="button_boy"
                    selected={gender === AvatarGenderType.Male}
                    onSelect={() => (gender !== AvatarGenderType.Male) && chooseGender(AvatarGenderType.Male)}
                />
                <Box layout={{ marginLeft: 60 }}>
                    <OnboardingRadioButton
                        caption={t('gender.female', 'Female')}
                        on="button_girl_active"
                        off="button_girl"
                        selected={gender === AvatarGenderType.Female}
                        onSelect={() => (gender !== AvatarGenderType.Female) && chooseGender(AvatarGenderType.Female)}
                    />
                </Box>
                <Box layout={{ marginLeft: 30, marginTop: -10, width: 50, height: 52 }}>
                    <OnboardingRandomizeButton
                        onPress={rollFigure}
                        layout={{ left: 0, top: 0 }}
                    />
                </Box>
            </Box>
            <OnboardingGreenButton
                caption={t('onboarding.button.ready', 'I\'m ready')}
                onPress={() => onReady(figureString, gender)}
                layout={{ left: READY.x, top: READY.y }}
            />
            <OnboardingText
                text={t('onboarding.cant.decide', 'Can\'t decide? Don\'t worry, you can change your clothes later!')}
                size={12}
                color="#ffffff"
                bold
                width={CANT_DECIDE.width}
                layout={{ position: 'absolute', left: CANT_DECIDE.x, top: CANT_DECIDE.y }}
            />
            {ONBOARDING_CATEGORIES.map((category, row) => getOnboardingPartIds(category, gender).map((part, column) => (
                <OnboardingRoundButton
                    key={`${category}_${part}`}
                    selected={worn.includes(part)}
                    editing={editor.editingButton === `${category}_${part}`}
                    onPress={() => clickPart(category, part)}
                    layout={{ left: GRID.x + (column * GRID_COLUMN), top: GRID.y + (row * GRID_ROW) }}
                >
                    <OnboardingPartThumb
                        figure={getOnboardingPartFigure(figure, category, part)}
                        head={category === 'hd'}
                    />
                </OnboardingRoundButton>
            )))}
            {colors.map((color, index) => (
                <OnboardingColorButton
                    key={`${editor.editing}_${color.id}`}
                    rgb={color.rgb}
                    selected={editor.selectedColors[editor.editing] === String(color.id)}
                    onPress={() => selectColor(editor.editing, String(color.id))}
                    layout={{ left: COLORS.x + ((index % COLORS_PER_ROW) * COLOR_COLUMN), top: COLORS.y + (Math.floor(index / COLORS_PER_ROW) * COLOR_ROW) }}
                />
            ))}
        </Box>
    );
};
