/**
 * `conditions/§_-02a§` - the base of `TimeMatches` and `DateMatches`: the time zone the box's
 * time is read in, as its string param.
 *
 * The time zones come from the `wired.timezones` client property (comma separated, `UTC` when
 * unset), with the box's own zone moved to the top; the dropdown always opens on that first
 * entry, and its section (`time.timezone_selection`) is only shown when there is a choice. A box
 * without a zone opens on the zone this element last saved (`§_-V1A§`, which Flash keeps on the
 * element for the session and sets in `readStringParamFromForm`) - the element's memory, written
 * by `rememberTimezoneConditionRead` when the core reads the form and read back through
 * `ctx.elementMemory`.
 */
import type { WiredElementContext, WiredElementMemory } from '../../WiredElement';
import type { WiredTriggerable } from '../../WiredTriggerable';

export interface TimezoneConditionForm {
    /** `_timezoneValues` - the dropdown's zones; an option's id is its index. */
    timezones: string[];
    /** The dropdown's `selectedId`. */
    timezoneId: number;
}

/** `getTimezones(first)`. */
const getTimezones = (first: string, ctx: WiredElementContext): string[] => {
    const property = ctx.configString('wired.timezones');
    const configured = (property === '') ? [ 'UTC' ] : property.split(',');
    const timezones = (first !== '') ? [ first ] : [];

    for (const timezone of configured) {
        if (timezone !== first) timezones.push(timezone);
    }

    return timezones;
};

/** `onEditStart` -> `updateTimezoneOptions`. */
export const createTimezoneConditionForm = (code: number, triggerable: WiredTriggerable, ctx: WiredElementContext): TimezoneConditionForm => {
    const remembered = ctx.elementMemory('condition', code).timezone;
    const timezones = getTimezones((triggerable.stringParam === '') ? ((typeof remembered === 'string') ? remembered : '') : triggerable.stringParam, ctx);

    return { timezones, timezoneId: (timezones.length > 0) ? 0 : -1 };
};

/** `§_-11q§.visible` - the section only shows with more than one zone to choose from. */
export const isTimezoneSectionVisible = (form: TimezoneConditionForm): boolean => (form.timezones.length > 1);

/** `readStringParamFromForm` - the selected zone, or `''`. */
export const readTimezoneConditionString = (form: TimezoneConditionForm): string => {
    if ((form.timezoneId < 0) || (form.timezoneId >= form.timezones.length)) return '';

    return form.timezones[form.timezoneId];
};

/** `readStringParamFromForm`'s side effect: a selected zone becomes the element's `§_-V1A§`. */
export const rememberTimezoneConditionRead = (form: TimezoneConditionForm): WiredElementMemory | null => {
    const timezone = readTimezoneConditionString(form);

    return (timezone === '') ? null : { timezone };
};
