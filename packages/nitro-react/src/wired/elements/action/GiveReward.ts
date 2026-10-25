/**
 * `actiontypes/GiveReward` (`wf_act_give_reward`) - gives the selected users a badge or a product
 * from the box's reward list, each with a chance, or each once when the rewards are unique.
 *
 * Int params: `[ interval, unique, limit, n ]` - how often a user can be rewarded (0 once, 1 once
 * every n days, 2 every n hours, 3 every n minutes), the unique flag, the reward limit (0 when
 * the limit box is not ticked) and n (at least 1). String param: the rewards, `;` separated, each
 * `<0 badge / 1 product>,<code>,<probability>`.
 *
 * Its texts are Flash's English literals ("Reward limit", "Once", ...): the client has no
 * localization for them either. `validate` returns Flash's literal messages too.
 */
import { createWiredRewardRows, EMPTY_WIRED_REWARD_ROW, type WiredRewardRowData } from '../../common/WiredRewardRow';
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `GiveReward.MAX_REWARDS`. */
export const GIVE_REWARD_MAX_REWARDS = 20;
/** `GiveReward.DEFAULT_REWARDS` - the rows shown on a box with fewer rewards. */
export const GIVE_REWARD_DEFAULT_REWARDS = 5;
/** `NumberInputParam(1, 1, 1000, 60)` - the reward limit input. */
export const GIVE_REWARD_LIMIT_MAX = 1000;
/** `validateReward`'s longest code. */
export const GIVE_REWARD_CODE_MAX_LENGTH = 100;
/** `TextInputParam("1", 4, null, 60, "0-9")` - the "n =" input. */
export const GIVE_REWARD_INTERVAL_MAX_CHARACTERS = 4;
export const GIVE_REWARD_INTERVAL_RESTRICT = '0-9';

export interface GiveRewardActionForm {
    /** The interval radio: 0 once, 1 days, 2 hours, 3 minutes. */
    interval: number;
    /** The "n =" field's text. */
    intervalText: string;
    unique: boolean;
    limitEnabled: boolean;
    limit: number;
    /** All `GIVE_REWARD_MAX_REWARDS` rows. */
    rows: WiredRewardRowData[];
    displayedRewards: number;
}

/** Flash's `int(String)`: the leading integer of the text, 0 when there is none. */
const flashInt = (text: string): number => {
    const value = parseInt(text, 10);

    return Number.isNaN(value) ? 0 : value;
};

/** `isNaN(Number(text))` - Flash's `Number("")` is 0, not `NaN`. */
const isFlashNaN = (text: string): boolean => Number.isNaN(Number(text));

/** `setRewardData`. */
const parseRewardRow = (data: string): WiredRewardRowData => {
    const parts = data.split(',');

    return {
        code: parts[1] ? parts[1] : '',
        probabilityText: parts[2] ? parts[2] : '',
        isBadge: parts[0] === '0',
    };
};

/** `getRewardData` - `null` for a row without a code. */
const rewardRowData = (row: WiredRewardRowData): string | null => {
    const code = row.code.split(';').join('').split(',').join('');

    if (code === '') return null;

    const probability = isFlashNaN(row.probabilityText) ? 0 : flashInt(row.probabilityText);

    return `${row.isBadge ? '0' : '1'},${code},${probability}`;
};

/** `validateReward`. */
const validateRewardRow = (row: WiredRewardRowData, unique: boolean): string | null => {
    const { code, probabilityText } = row;

    if ((code === '') && (probabilityText === '')) return null;
    if (code.indexOf(',') > 0) return 'Product/badge codes must not contain \',\' characters.';
    if (code.indexOf(';') > 0) return 'Product/badge codes must not contain \';\' characters.';
    if (code.length > GIVE_REWARD_CODE_MAX_LENGTH) return `Product/badge codes cannot contain more than ${GIVE_REWARD_CODE_MAX_LENGTH} characters.`;
    if (code === '') return 'Remember to define product/badge codes for all rewards (fill all fields or leave all fields empty).';

    if (!unique) {
        if (probabilityText === '') return 'Remember to define probabilities for all rewards (fill all fields or leave all fields empty).';
        if (isFlashNaN(probabilityText)) return 'Make sure are probabilities are numbers.';

        const probability = flashInt(probabilityText);

        if ((probability < 1) || (probability > 100)) return 'Make sure all probabilities are numbers between 1 and 100.';
    }

    return null;
};

export const giveRewardAction: WiredElementDefinition<GiveRewardActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.GIVE_REWARD,
    createForm: (triggerable) => {
        const interval = getWiredInt(triggerable, 0);
        const limit = getWiredInt(triggerable, 2);
        const data = (triggerable.stringParam === '') ? [] : triggerable.stringParam.split(';');
        const rows = createWiredRewardRows(GIVE_REWARD_MAX_REWARDS);

        let displayedRewards = GIVE_REWARD_DEFAULT_REWARDS;

        for (let index = 0; index < GIVE_REWARD_MAX_REWARDS; index++) {
            if (data[index]) {
                rows[index] = parseRewardRow(data[index]);
                displayedRewards = Math.max(displayedRewards, index + 1);
            } else {
                rows[index] = EMPTY_WIRED_REWARD_ROW;
            }
        }

        return {
            interval,
            intervalText: ((interval > 0) && (triggerable.intParams.length === 4)) ? String(triggerable.intParams[3]) : '1',
            unique: getWiredInt(triggerable, 1) === 1,
            limitEnabled: limit > 0,
            // The input keeps its `initialValue` of 1 when the box has no limit.
            limit: (limit > 0) ? limit : 1,
            rows,
            displayedRewards,
        };
    },
    readIntParams: (form) => {
        const n = flashInt(form.intervalText);

        return [ form.interval, form.unique ? 1 : 0, form.limitEnabled ? form.limit : 0, (n >= 1) ? n : 1 ];
    },
    readStringParam: form => form.rows
        .slice(0, form.displayedRewards)
        .map(rewardRowData)
        .filter(data => data !== null)
        .join(';'),
    validate: (form) => {
        let total = 0;

        for (const row of form.rows.slice(0, form.displayedRewards)) {
            const error = validateRewardRow(row, form.unique);

            if (error !== null) return error;

            if (!form.unique && (row.probabilityText !== '')) total += flashInt(row.probabilityText);
        }

        if (total > 100) return `The sum of probabilities cannot exceed 100. You now have ${total}.`;

        return null;
    },
};
