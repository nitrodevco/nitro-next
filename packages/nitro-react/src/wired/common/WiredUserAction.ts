/**
 * `wired_setup/common/utils/WiredUserAction` - the avatar actions a "user performs action"
 * trigger, condition or selector can name, with the code the server uses for each. `sign` and
 * `dance` carry an extra id (which sign, which dance) that travels as a string: the sign's number,
 * and `dance <n>`.
 *
 * The names are localization key fragments, so `67` is a name like the others.
 */
export interface WiredUserAction {
    name: string;
    code: number;
    hasExtra: boolean;
    /** `convertCodeToExtraString` - only on an action with `hasExtra`. */
    convertCodeToExtraString?: (code: number) => string;
    /** `convertExtraStringToCode` - only on an action with `hasExtra`. */
    convertExtraStringToCode?: (extra: string) => number;
}

/** ActionScript's `int(string)`: anything that is not a number is 0, fractions are cut off. */
const toInt = (text: string | undefined): number => {
    const value = Number(text);

    return Number.isNaN(value) ? 0 : (value | 0);
};

const plain = (name: string, code: number): WiredUserAction => ({ name, code, hasExtra: false });

/** `WiredUserAction.allWiredUserActions` - 9 is not an action. */
export const ALL_WIRED_USER_ACTIONS: readonly WiredUserAction[] = [
    plain('wave', 0),
    plain('blow', 1),
    plain('laugh', 2),
    plain('respect', 3),
    plain('awake', 4),
    plain('sleep', 5),
    plain('sit', 6),
    plain('stand', 7),
    plain('lay', 8),
    {
        name: 'sign',
        code: 10,
        hasExtra: true,
        convertCodeToExtraString: code => code.toString(),
        convertExtraStringToCode: extra => toInt(extra),
    },
    {
        name: 'dance',
        code: 11,
        hasExtra: true,
        convertCodeToExtraString: code => `dance ${code}`,
        convertExtraStringToCode: extra => toInt(extra.split(' ')[1]),
    },
    plain('67', 67),
];

/** The lookup every user of the list writes for itself in Flash (`getActionByCode`). */
export const getWiredUserActionByCode = (code: number): WiredUserAction | null =>
    ALL_WIRED_USER_ACTIONS.find(action => action.code === code) ?? null;
