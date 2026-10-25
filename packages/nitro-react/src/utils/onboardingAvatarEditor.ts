/**
 * The new user flow's look editor - `friendbar/onBoardingHcSteps/AvatarEditor` - as state and the
 * moves its buttons make, kept apart from the view so the store can run them outside React (the
 * dice is random, and a first figure is rolled before the editor is drawn).
 *
 * Flash's quirks are kept:
 *
 * - The figure is two dictionaries per gender: the part per category (`§_-g12§`) and its colours
 *   (`§_-oV§`). A part's second colour is always written `25` (`getFigure`).
 * - A part button already worn takes the part off, except a head, legs or - for a girl - a top
 *   (`gridClick`). Whether it is "worn" is whether its part id is worn in any category.
 * - A colour keeps a second layer (`25`) only when the worn part was once shown in a grid while
 *   its category had two colours (`§_-X1x§`, filled by `updateGrids`).
 * - The dice picks one of its figures, never the last (`Math.random() * (length - 1)`),
 *   and rolls again when it would change only one part (`setRandomFigure`). After a roll the hair
 *   category is the one being edited, and its button is pressed twice, which leaves the hair on.
 * - The colour chosen per category (`_selectedColors`) is shared by both genders.
 */
import { AvatarGenderType, GetConfigValue, IPartColor } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';

/** `CATEGORIES`: the grid's rows. */
export const ONBOARDING_CATEGORIES = [ 'hr', 'hd', 'ch', 'lg', 'sh' ] as const;

/** `NORMAL_ITEMS_TO_SHOW`: parts per row. */
const PARTS_PER_CATEGORY = 5;

/** The colours a category offers (`populateColors`'s 16). */
const MAX_COLORS = 16;

/** `getFigure`: a part's second colour. */
const SECOND_COLOR = '25';

/** `RANDOM_MALE_FIGURES`: the dice's looks for a boy when `new.user.flow.figures.male` names none. */
const RANDOM_MALE_FIGURES = [
    'hr-891-34.hd-209-10.ch-255-71.lg-280-81', 'hr-893-42.hd-209-19.ch-230-80.lg-3290-82.sh-906-64', 'hr-889-34.hd-200-1.ch-3030-73.lg-3023-88.sh-300-64',
    'hr-145-42.hd-185-1.ch-230-66.lg-270-82.sh-290-81', 'hr-110-38.hd-190-1.ch-3030-85.lg-275-84.sh-290-74', 'hr-891-42.hd-190-14.ch-230-64.lg-3290-64.sh-906-64',
    'hr-110-35.hd-185-1.ch-3110-80-25.lg-270-84.sh-905-80', 'hr-145-43.hd-209-1.ch-809-80.lg-275-82.sh-906-64', 'hr-889-42.hd-207-1370.ch-230-80.lg-280-80.sh-906-64',
    'hr-891-48.hd-200-1370.ch-809-84.lg-3290-84.sh-300-84', 'hd-190-30.ch-230-82.lg-275-72.sh-905-88', 'hd-185-10.ch-3110-85-25.lg-275-82.sh-300-84',
    'hr-893-40.hd-200-14.ch-255-75.lg-280-75.sh-906-75', 'hr-889-45.hd-190-1370.ch-255-68.lg-3023-88.sh-906-68', 'hr-110-45.hd-200-1371.ch-255-85.lg-280-84.sh-3068-85-25',
    'hr-893-35.hd-185-10.ch-230-1408.lg-275-72', 'hr-145-42.hd-200-10.ch-255-64.lg-3290-64.sh-906-64', 'hr-889-42.hd-209-10.ch-809-81.lg-3290-64.sh-300-64',
    'hr-110-39.hd-190-1371.ch-3110-80-25.lg-275-81.sh-3068-83-25', 'hr-891-48.hd-185-20.ch-3030-71.lg-3023-80.sh-300-81', 'hr-145-37.hd-200-1.ch-3030-75.lg-270-80.sh-3068-83-25',
    'hr-891-44.hd-207-1.ch-809-76.lg-270-76.sh-3068-76-25', 'hr-145-48.hd-185-20.ch-3110-76-25.lg-270-74.sh-290-75', 'hr-110-44.hd-200-30.ch-809-83.lg-270-84.sh-300-64',
    'hr-891-34.hd-207-14.ch-230-81.lg-270-76.sh-290-80',
];

/** `RANDOM_FEMALE_FIGURES`, for `new.user.flow.figures.female`. */
const RANDOM_FEMALE_FIGURES = [
    'hr-891-40.hd-627-1371.ch-665-66.lg-700-82.sh-3068-68-25', 'hr-515-48.hd-628-1.ch-635-73.lg-695-81.sh-735-83', 'hr-891-35.hd-625-8.ch-685-73.lg-715-73.sh-907-73',
    'hr-837-45.hd-627-14.ch-670-76.lg-695-71.sh-907-73', 'hr-892-48.hd-605-14.ch-685-64.lg-700-72.sh-906-64', 'hr-893-32.hd-628-20.ch-823-76.lg-710-82.sh-735-76',
    'hr-892-32.hd-628-1.ch-665-81.lg-700-80.sh-3068-81-25', 'hr-893-40.hd-610-12.ch-670-81.lg-716-81-25.sh-725-83', 'hr-891-42.hd-625-10.ch-635-64.lg-695-64.sh-906-64',
    'hd-625-1370.ch-823-72.lg-710-74.sh-725-74', 'hr-515-45.hd-628-1.ch-823-75.lg-710-73.sh-3068-84-25', 'hr-893-34.hd-605-19.ch-685-84.lg-695-85.sh-906-85',
    'hr-837-39.hd-610-1.ch-685-91.lg-695-90.sh-906-80', 'hr-891-34.hd-610-1369.ch-635-74.lg-695-82.sh-906-71', 'hr-892-39.hd-628-1370.ch-670-64.lg-716-64-25.sh-907-64',
    'hr-837-46.hd-627-20.ch-665-76.lg-716-68-25', 'hr-892-37.hd-605-10.ch-665-88.lg-700-88', 'hr-892-48.hd-628-1371.ch-823-82.lg-700-71.sh-725-81',
    'hr-891-36.hd-625-8.ch-670-80.lg-715-80.sh-907-80', 'hr-891-48.hd-628-12.ch-823-64.lg-715-64.sh-907-76', 'hr-837-48.hd-627-14.ch-685-73.lg-695-76.sh-907-82',
    'hr-893-48.hd-605-1371.ch-665-74.lg-700-72.sh-725-74', 'hr-515-35.hd-625-10.ch-665-72.lg-695-72.sh-906-64', 'hr-837-35.hd-628-1.ch-635-81.lg-710-75.sh-735-81',
    'hr-893-44.hd-628-30.ch-670-76.lg-715-76.sh-907-76',
];

/** How often the dice rolls again for a look that changed too little before it settles. */
const MAX_ROLLS = 20;

/** `RandomAvatarCloudsAnimation.§_-hQ§`: how far the clouds drift up (or down) a tick. */
const CLOUD_DRIFTS = [ -9, -8, -5, -3, 3, 5, 8, 9 ];

export type OnboardingGender = AvatarGenderType.Male | AvatarGenderType.Female;

/** One gender's figure: the part per category and its colour ids, in the order they were set. */
export interface OnboardingFigure {
    parts: Record<string, string>;
    colors: Record<string, string[]>;
}

export interface OnboardingEditorState {
    gender: OnboardingGender;
    figures: Partial<Record<OnboardingGender, OnboardingFigure>>;
    /** `§_-bp§`: the category whose colours are shown. */
    editing: string;
    /** `§_-81f§`: the part button being edited (`hr_891`), drawn in its "editing" skin. */
    editingButton: string | undefined;
    /** `_selectedColors`: the colour button chosen per category, shared by both genders. */
    selectedColors: Record<string, string>;
    /** `§_-X1x§`: the parts known to take a second colour. */
    twoColorParts: Record<string, true>;
    /** Counts the dice rolls; each one starts the clouds again. */
    rolls: number;
    /** The clouds' drift for this roll (`startAnimation`). */
    cloudDrift: number;
}

/** A category's first five offered parts (`populateCategory`): pre-selectable, no club parts, the gender's or unisex. */
export const getOnboardingPartIds = (category: string, gender: OnboardingGender): string[] => {
    const figureData = GetAvatarRenderManager().structureData;
    const type = figureData.getSetType(category);

    if (!type) return [];

    const ids: string[] = [];

    for (const partSet of type.partSets.values()) {
        if (partSet.clubLevel > 0) continue;
        if (!partSet.isPreSelectable) continue;
        if ((partSet.gender !== gender) && (partSet.gender !== AvatarGenderType.Unisex)) continue;

        ids.push(String(partSet.id));

        if (ids.length === PARTS_PER_CATEGORY) break;
    }

    return ids;
};

/** A category's colour buttons (`populateColors`): its palette's selectable colours, sixteen at most, by index. */
export const getOnboardingColors = (category: string): IPartColor[] => {
    const figureData = GetAvatarRenderManager().structureData;
    const type = figureData.getSetType(category);
    const palette = type && figureData.getPalette(type.paletteId);

    if (!palette) return [];

    const colors: IPartColor[] = [];

    for (const color of palette.colors.values()) {
        if (color.isSelectable && (colors.length < MAX_COLORS)) colors.push(color);
    }

    return colors.sort((a, b) => a.index - b.index);
};

/** `getFigure`. */
export const getOnboardingFigureString = (figure: OnboardingFigure | undefined): string => {
    if (!figure) return '';

    return Object.entries(figure.parts).map(([ category, part ]) => {
        const colors = [ ...(figure.colors[category] ?? []) ];

        if (colors.length > 1) colors[1] = SECOND_COLOR;

        return [ category, part, ...colors ].join('-');
    }).join('.');
};

/** The figure a part button draws: the part with its category's colours (`updateGrids`). */
export const getOnboardingPartFigure = (figure: OnboardingFigure | undefined, category: string, part: string): string =>
    [ category, part, ...(figure?.colors[category] ?? []) ].join('-');

/** The part ids worn in any category (`getCurrentlySelectedItems`). */
export const getOnboardingWornParts = (state: OnboardingEditorState): string[] => {
    const figure = state.figures[state.gender];

    return ONBOARDING_CATEGORIES.map(category => String(figure?.parts[category]));
};

/** `updateGrids`: every part shown in a category that has two colours takes a second colour from now on. */
const markTwoColorParts = (state: OnboardingEditorState): OnboardingEditorState => {
    const figure = state.figures[state.gender];
    const twoColorParts = { ...state.twoColorParts };

    for (const category of ONBOARDING_CATEGORIES) {
        if ((figure?.colors[category]?.length ?? 0) < 2) continue;

        for (const part of getOnboardingPartIds(category, state.gender)) twoColorParts[part] = true;
    }

    return { ...state, twoColorParts };
};

const withFigure = (state: OnboardingEditorState, figure: OnboardingFigure): OnboardingEditorState =>
    ({ ...state, figures: { ...state.figures, [state.gender]: figure } });

/** `colorSelected`: the category takes the colour, keeping a second one when its part has two. */
export const selectOnboardingColor = (state: OnboardingEditorState, category: string, colorId: string): OnboardingEditorState => {
    const figure = state.figures[state.gender] ?? { parts: {}, colors: {} };
    const part = figure.parts[category];
    const colors = (part !== undefined && state.twoColorParts[part]) ? [ colorId, SECOND_COLOR ] : [ colorId ];

    return markTwoColorParts({
        ...withFigure(state, { ...figure, colors: { ...figure.colors, [category]: colors } }),
        selectedColors: { ...state.selectedColors, [category]: colorId },
    });
};

/** `gridClick`: a part button puts the part on, or takes it off when it is worn (not a head, legs or a girl's top). */
export const clickOnboardingPart = (state: OnboardingEditorState, category: string, part: string): OnboardingEditorState => {
    const figure = state.figures[state.gender] ?? { parts: {}, colors: {} };
    const keepsPart = (category === 'hd') || (category === 'lg') || ((state.gender === AvatarGenderType.Female) && (category === 'ch'));
    const takeOff = !keepsPart && getOnboardingWornParts(state).includes(part);
    const parts = { ...figure.parts };

    if (takeOff) delete parts[category];
    else parts[category] = part;

    return markTwoColorParts({
        ...withFigure(state, { ...figure, parts }),
        editing: category,
        editingButton: takeOff ? undefined : `${category}_${part}`,
    });
};

/**
 * The looks the dice rolls: Flash's two lists are fixed in the client, so a hotel's own go in its
 * configuration - `new.user.flow.figures.male` / `.female`, figures separated by commas (or a list).
 */
const onboardingFigures = (gender: OnboardingGender): string[] => {
    const key = (gender === AvatarGenderType.Male) ? 'new.user.flow.figures.male' : 'new.user.flow.figures.female';
    const value = GetConfigValue<string | string[]>(key);
    const figures = (Array.isArray(value) ? value : (value ?? '').split(',')).map(figure => figure.trim()).filter(figure => figure.length);

    if (figures.length) return figures;

    return (gender === AvatarGenderType.Male) ? RANDOM_MALE_FIGURES : RANDOM_FEMALE_FIGURES;
};

/** `getRandomFigureData`: never the list's last figure, as Flash's arithmetic has it - unless it is the only one. */
const randomFigureData = (gender: OnboardingGender): string => {
    const figures = onboardingFigures(gender);

    return figures[Math.floor(Math.random() * Math.max(1, figures.length - 1))];
};

/** `setRandomFigure`. */
export const rollOnboardingFigure = (state: OnboardingEditorState): OnboardingEditorState => {
    // Flash rolls until the look changes; a hotel offering one or two looks would never get there.
    for (let attempt = 0; ; attempt++) {
        const sets = randomFigureData(state.gender).split('.');
        const previous = state.figures[state.gender]?.parts ?? {};
        const figure: OnboardingFigure = { parts: { ...previous }, colors: { ...(state.figures[state.gender]?.colors ?? {}) } };
        let next = state;
        let unchanged = 0;
        let hair: string | undefined;

        for (const set of sets) {
            const [ category, part, color, secondColor ] = set.split('-');

            if (previous[category] === part) unchanged++;

            figure.parts[category] = part;
            next = selectOnboardingColor(withFigure(next, figure), category, color);
            figure.colors = { ...next.figures[state.gender]!.colors, [category]: secondColor ? [ color, secondColor ] : [ color ] };

            if (category === 'hr') hair = part;
        }

        next = { ...withFigure(next, figure), editing: 'hr' };

        // The hair's button, when the grid shows it, is pressed twice: off, then on again.
        if (hair !== undefined && getOnboardingPartIds('hr', state.gender).includes(hair)) {
            next = clickOnboardingPart(clickOnboardingPart(next, 'hr', hair), 'hr', hair);
        }

        if ((unchanged < (sets.length - 1)) || (attempt >= MAX_ROLLS)) {
            return {
                ...next,
                rolls: state.rolls + 1,
                cloudDrift: CLOUD_DRIFTS[Math.round(Math.random() * (CLOUD_DRIFTS.length - 1))],
            };
        }
    }
};

/** `onChooseGender`: the other gender's own figure, rolled anew. */
export const chooseOnboardingGender = (state: OnboardingEditorState, gender: OnboardingGender): OnboardingEditorState =>
    rollOnboardingFigure({ ...state, gender, figures: { ...state.figures, [gender]: state.figures[gender] ?? { parts: {}, colors: {} } } });

/** `onAddedToStage`: a boy, with a random look. */
export const createOnboardingEditor = (): OnboardingEditorState => rollOnboardingFigure({
    gender: AvatarGenderType.Male,
    figures: { [AvatarGenderType.Male]: { parts: {}, colors: {} } },
    editing: 'hr',
    editingButton: undefined,
    selectedColors: {},
    twoColorParts: {},
    rolls: 0,
    cloudDrift: CLOUD_DRIFTS[0],
});
