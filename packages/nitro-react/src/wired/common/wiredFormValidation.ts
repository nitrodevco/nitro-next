/**
 * `UserDefinedRoomEventsCtrl._formValidationSources` - the presets that can refuse a save
 * (WIN63-202610121624: every `ValueOrVariableSection`, `_-d7.validationError`). `validateForm`
 * asks each in turn and shows the first error, before the element's own `validate()`; a copy
 * to the clipboard asks the same. A source answers `null` while it is valid or not active (hidden
 * or disabled - `validationActive`).
 */
export type WiredFormValidationSource = () => string | null;

const sources = new Set<WiredFormValidationSource>();

/** A preset joins on build and leaves on dispose; the returned function removes it. */
export const registerWiredFormValidationSource = (source: WiredFormValidationSource): (() => void) => {
    sources.add(source);

    return () => {
        sources.delete(source);
    };
};

/** `validateForm`'s first loop: the first error any source reports. */
export const getWiredFormValidationError = (): string | null => {
    for (const source of sources) {
        const error = source();

        if (error !== null) return error;
    }

    return null;
};
