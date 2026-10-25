/**
 * `uibuilder/presets/sections/ValueOrVariableSection` (WIN63-202610121624) - one field that takes
 * a number or a variable: `ValueOrVariableInputPreset` (the style's text input with
 * `value_or_variable_input_icons` at its right end - the target type of a variable reference when
 * the section offers more than one, and `icon_variable_reference`, which opens the popup) and
 * `ValueOrVariablePopupPreset`, a variable picker dropped from the input (`NewVariablePicker`'s
 * external popup) with a header list over its tabs:
 *
 * - "Variable source:" (`sources.merged.title.variables`, soft text colour): the merged input
 *   source the section claims (`IInputSourceClaimOwner`: its control moves here from the advanced
 *   settings) with the "furni picks" button and the target selector in the header;
 * - with `sameHolderTarget` (`param9`), "Use the same furni or user as the target variable"
 *   (`reference_value.same_holder`), enabled while the reference is on the box's own furni or user
 *   target; ticked, it locks the source and its selector (`referenceVariableOnTarget`).
 *
 * Typing a number makes the value option, a name the variable option
 * (`readValueOrVariableText`); an invalid text tints the input and shows its message above it,
 * and keeps a save from going out (`_-d7.validationError`, a form validation source). Picking a
 * variable in the popup closes it (`onVariableChanged`); a press outside closes it too.
 *
 * Controlled: `state` is the form's `WiredValueOrVariableState`; the typed text is the section's
 * own, rewritten whenever the state changes other than by typing. With `variableOnlyOrEmpty` (the
 * link dataframe rows' "Variable text") the field takes a variable or nothing: an empty field
 * selects no variable and is valid, a number is not. `title` null is `param6` null
 * with a width (`param10`): no section, the input alone, for the owner to place (Variable Age's
 * time row). `onSourceTypeSelect` is the selector's `sourceType` setter (`setMergedSourceType`).
 */
import { IWiredVariable } from '@nitrodevco/nitro-packets';
import { Container } from 'pixi.js';
import { useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { useTranslation } from '#base/context/system';
import { Box, FloatingPopup, getGlobalRect, LayoutImage, Region, ThemeImage, useLatest } from '#base/theme';
import { determineInitialVariablePickerTab, filterPickerVariables, getPickerSelectedVariable, getTypeNameForSource, getVariablePickerHistory, isValueOrVariableOnSameHolder, isValueOrVariableSameHolderEligible, readValueOrVariableText, registerWiredFormValidationSource, selectPickerVariable, subscribeVariablePickerHistory, VALUE_OR_VARIABLE_ERROR_VARIABLE_OR_EMPTY, VALUE_OR_VARIABLE_OPTION_VARIABLE, valueOrVariableEligibleVariables, valueOrVariableSelectable, valueOrVariableValidationError, VARIABLE_PICKER_TAB_SEARCH, WiredValueOrVariableState } from '#base/wired';

import { useWiredDisabled } from './useWiredDisabled';
import { WiredCheckboxGroup } from './WiredCheckboxGroup';
import { WiredFlow } from './WiredFlow';
import { WiredInputField } from './WiredInputField';
import { WiredInputSourceClaimReactContext } from './wiredKitContexts';
import { WiredPaddedContainer } from './WiredPaddedContainer';
import { WiredSection } from './WiredSection';
import { WiredSourceTypeSelector } from './WiredSourceTypeSelector';
import { WiredSplitter } from './WiredSplitter';
import { useWiredStyle } from './WiredStyleContext';
import { WiredVariablePickerExpandedView } from './WiredVariablePickerExpandedView';

/** `ICON_WIDTH` / `ICONS_WIDTH`: one icon region, both (the target type's shows only for a variable). */
const ICON_WIDTH = 19;
const ICONS_WIDTH = 40;

/** `VARIABLE_SOURCE_TITLE`. */
const VARIABLE_SOURCE_TITLE = '${wiredfurni.params.sources.merged.title.variables}';

export interface WiredValueOrVariableSectionProps {
    /** `param6` - the section title (a literal or `${key}`); null for the bare input. */
    title: string | null;
    /** `claimedSourceId` - the merged input source the section draws in its popup. */
    mergedId: number;
    /** `mergedSourceOptions(mergedId)` - the targets the popup's selector offers. */
    sourceTypeOptions: readonly number[];
    /** `param7` / `param8` - the number's range. */
    min: number;
    max: number;
    state: WiredValueOrVariableState;
    onChange: (state: WiredValueOrVariableState, variable?: IWiredVariable | null) => void;
    onSourceTypeSelect: (sourceType: number) => void;
    /** `wiredContext.roomVariablesList.variables` (`getWiredRoomVariables`). */
    variables: readonly IWiredVariable[] | null | undefined;
    roomId: number;
    /** `param9` with the box's own target (`primaryTarget`): offers "same holder". */
    sameHolderTarget?: number;
    /** `param11` - what else a referenced variable must be. */
    variableFilter?: (variable: IWiredVariable) => boolean;
    /** `param10` - the input's own width; absent or negative, it fills. */
    inputWidth?: number;
    /** `variableOnlyOrEmpty` - a variable or an empty field, never a number. */
    variableOnlyOrEmpty?: boolean;
    disabled?: boolean;
}

interface OpenPopup {
    x: number;
    y: number;
    width: number;
}

/** What the input shows for the state - `init` / `applyVariableTarget`'s `setTextSilently`. */
const textOf = (state: WiredValueOrVariableState, selected: IWiredVariable | null): string =>
    (state.option === VALUE_OR_VARIABLE_OPTION_VARIABLE) ? (selected?.variableName ?? '') : String(state.value);

export const WiredValueOrVariableSection = ({ title, mergedId, sourceTypeOptions, min, max, state, onChange, onSourceTypeSelect, variables, roomId, sameHolderTarget, variableFilter, inputWidth, variableOnlyOrEmpty = false, disabled: ownDisabled }: WiredValueOrVariableSectionProps) => {
    const t = useTranslation();
    const style = useWiredStyle();
    const disabled = useWiredDisabled(ownDisabled);
    const claims = useContext(WiredInputSourceClaimReactContext);
    const anchorRef = useRef<Container>(null);
    const selected = getPickerSelectedVariable(variables, state.picker);
    const [ text, setText ] = useState(() => textOf(state, selected));
    const [ check, setCheck ] = useState(() => ({ valid: (state.option !== VALUE_OR_VARIABLE_OPTION_VARIABLE) || (!!selected && valueOrVariableSelectable(selected, variableFilter)), ambiguous: false }));
    const [ popup, setPopup ] = useState<OpenPopup | null>(null);
    const [ query, setQuery ] = useState('');
    const [ tabId, setTabId ] = useState<number | null>(null);
    const typedRef = useRef(false);
    const history = useSyncExternalStore(subscribeVariablePickerHistory, () => getVariablePickerHistory(roomId, state.picker.target));
    const claim = claims?.claim;

    // `_-e26`: the offered targets, with the current one added when the box holds one they lack.
    const targets = sourceTypeOptions.includes(state.picker.target) ? sourceTypeOptions : [ ...sourceTypeOptions, state.picker.target ];
    const onSameHolder = (sameHolderTarget !== undefined) && isValueOrVariableOnSameHolder(state, sameHolderTarget);
    const sameHolderEligible = (sameHolderTarget !== undefined) && isValueOrVariableSameHolderEligible(state, sameHolderTarget);
    // `currentValidationError`: a variable-or-empty field is fine empty or with a variable it accepts.
    const variableOrEmptyError = () => (((text.length === 0) || (check.valid && (state.option === VALUE_OR_VARIABLE_OPTION_VARIABLE) && !!selected && valueOrVariableSelectable(selected, variableFilter))) ? null : VALUE_OR_VARIABLE_ERROR_VARIABLE_OR_EMPTY);
    const error = disabled ? null : (variableOnlyOrEmpty ? variableOrEmptyError() : valueOrVariableValidationError(state, check.valid, check.ambiguous, variables, variableFilter));
    const errorText = error ? t(error.key, error.fallback) : null;

    const errorRef = useLatest(errorText);

    // `attachInputSourceControl`: the merged source is the section's while it is built.
    useEffect(() => claim?.(mergedId), [ claim, mergedId ]);

    // `_formValidationSources`: a save asks the section for its error.
    useEffect(() => registerWiredFormValidationSource(() => errorRef.current), []);

    // The state changed from outside the input (the popup, a target change, a reset): show it.
    useEffect(() => {
        if (typedRef.current) {
            typedRef.current = false;

            return;
        }

        const current = getPickerSelectedVariable(variables, state.picker);

        setText(textOf(state, current));
        setCheck({ valid: (state.option !== VALUE_OR_VARIABLE_OPTION_VARIABLE) || (!!current && valueOrVariableSelectable(current, variableFilter)), ambiguous: false });
        // `state` itself changes identity on every form update; these are what the input shows (the
        // variable's name too: the room's list may arrive after the editor opened).
    }, [ state.option, state.value, state.picker.variableId, state.picker.target, selected?.variableName ]);

    /** `onInputTextChanged`. */
    const type = (next: string) => {
        const read = readValueOrVariableText(next, min, max, valueOrVariableEligibleVariables(variables, state, variableFilter));

        setText(next);
        setCheck({ valid: read.valid, ambiguous: read.ambiguous });

        const nextState: WiredValueOrVariableState = {
            ...state,
            option: read.option,
            value: read.value ?? state.value,
            // `onInputTextChanged`: an emptied variable-or-empty field selects no variable.
            picker: read.variable ? selectPickerVariable(state.picker, read.variable) : ((variableOnlyOrEmpty && (next.length === 0)) ? selectPickerVariable(state.picker, null) : state.picker),
        };

        if ((nextState.option === state.option) && (nextState.value === state.value) && (nextState.picker === state.picker)) return;

        typedRef.current = true;
        onChange(nextState, read.variable ?? null);
    };

    const togglePopup = () => {
        if (popup) return setPopup(null);

        const anchor = anchorRef.current;

        if (!anchor || disabled) return;

        const rect = getGlobalRect(anchor);

        setQuery(selected?.variableName ?? '');
        setTabId(current => current ?? determineInitialVariablePickerTab(selected));
        setPopup({ x: rect.x, y: rect.y + rect.height, width: rect.width });
    };

    /** `onPopupVariableChanged(variable, true)`: a pick is the variable option; a variable closes the popup. */
    const pick = (variable: IWiredVariable | null, keepOpen: boolean) => {
        setQuery(variable?.variableName ?? '');

        if (variable && !keepOpen) setPopup(null);

        onChange({ ...state, option: VALUE_OR_VARIABLE_OPTION_VARIABLE, picker: selectPickerVariable(state.picker, variable) }, variable);
    };

    const pickerVariables = filterPickerVariables(variables, state.picker.target, state.picker.initialVariableId);
    const showsTarget = (state.option === VALUE_OR_VARIABLE_OPTION_VARIABLE) && (targets.length > 1);
    const targetName = getTypeNameForSource(state.picker.target);
    const claimed = claims?.render(mergedId) ?? null;
    const targetSelector = (targets.length > 1) && (
        <WiredSourceTypeSelector
            options={targets}
            selected={state.picker.target}
            onSelect={sourceType => !onSameHolder && onSourceTypeSelect(sourceType)}
            disabled={onSameHolder}
        />
    );

    const header = (
        // `resizeHeader`: the header list is as wide as the input (`_-v1X.width = _-Ib.width`).
        <Box layout={{ width: popup?.width ?? 0, flexDirection: 'column', alignItems: 'stretch', gap: style.genericVerticalSpacing }}>
            {claimed
                ? (
                        <>
                            <WiredPaddedContainer
                                left={style.genericHorizontalSpacing}
                                top={style.genericVerticalSpacing}
                                right={style.genericHorizontalSpacing}
                                bottom={0}
                            >
                                <WiredSection
                                    title={VARIABLE_SOURCE_TITLE}
                                    titleColor={style.softTextColor}
                                    splitterVisible={false}
                                    disabled={onSameHolder || claimed.disabled}
                                    headerOptions={(
                                        <>
                                            {claimed.headerOptions}
                                            {targetSelector}
                                        </>
                                    )}
                                >
                                    <Box layout={{ minHeight: style.inputSourceListMinHeight + (2 * style.LRContainerTopBottomPadding), flexDirection: 'column', justifyContent: 'center' }}>
                                        {claimed.control}
                                    </Box>
                                </WiredSection>
                            </WiredPaddedContainer>
                            <WiredSplitter />
                        </>
                    )
                : targetSelector && (
                    <WiredSection
                        title="${wiredfurni.params.variables.reference_value.target}"
                        splitterVisible={false}
                    >
                        {targetSelector}
                    </WiredSection>
                )}
            {(sameHolderTarget !== undefined) && (
                <>
                    <WiredPaddedContainer
                        left={style.genericHorizontalSpacing}
                        top={0}
                        right={style.genericHorizontalSpacing}
                        bottom={0}
                    >
                        <WiredCheckboxGroup
                            options={[ { label: '${wiredfurni.params.variables.reference_value.same_holder}', selected: !!state.sameHolder } ]}
                            onToggle={(_id, sameHolder) => onChange({ ...state, sameHolder, option: sameHolder ? VALUE_OR_VARIABLE_OPTION_VARIABLE : state.option })}
                            disabled={!sameHolderEligible}
                        />
                    </WiredPaddedContainer>
                    <WiredSplitter />
                </>
            )}
        </Box>
    );

    const icons = (
        <>
            {showsTarget && (
                <Region
                    tooltip={t(`wiredfurni.params.sourcetype.${targetName}`, `wiredfurni.params.sourcetype.${targetName}`)}
                    layout={{ width: ICON_WIDTH, height: '100%', justifyContent: 'center', alignItems: 'center' }}
                >
                    <ThemeImage
                        src={LayoutImage(`habbo-user-defined-room-events-com/icon_source_${targetName}.png`)}
                        bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                    />
                </Region>
            )}
            <Region
                tooltip={t('wiredfurni.params.variables.reference_value.popup', 'wiredfurni.params.variables.reference_value.popup')}
                cursor={disabled ? 'default' : 'pointer'}
                onPointerTap={togglePopup}
                layout={{ width: ICON_WIDTH, height: '100%', justifyContent: 'center', alignItems: 'center' }}
            >
                <ThemeImage
                    src={LayoutImage('habbo-user-defined-room-events-com/icon_variable_reference.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                />
            </Region>
        </>
    );

    const input = (
        <Box
            ref={anchorRef}
            layout={{ flexDirection: 'column', alignItems: 'stretch', flexGrow: ((inputWidth ?? -1) < 0) ? 1 : 0, flexShrink: 1, minWidth: 0 }}
        >
            {/* The input sits in this column, whatever the section's own container is: a row would give it a zero flex basis along the column. */}
            <WiredFlow direction="column">
                <WiredInputField
                    value={text}
                    onChange={type}
                    fieldWidth={inputWidth}
                    warning={errorText}
                    disabled={disabled}
                    trailing={icons}
                    trailingWidth={showsTarget ? ICONS_WIDTH : ICON_WIDTH}
                />
            </WiredFlow>
            {popup && (
                <FloatingPopup
                    x={popup.x}
                    y={popup.y}
                    onOutsideClick={() => setPopup(null)}
                >
                    <WiredVariablePickerExpandedView
                        x={popup.x}
                        y={popup.y}
                        width={popup.width}
                        borderVariant={(style.name === 'illumina') ? '105' : '12'}
                        pickerVariables={pickerVariables}
                        history={history}
                        filter={variable => valueOrVariableSelectable(variable, variableFilter)}
                        query={query}
                        tabId={tabId ?? determineInitialVariablePickerTab(selected)}
                        onQueryChange={(value) => {
                            setQuery(value);
                            setTabId(VARIABLE_PICKER_TAB_SEARCH);
                        }}
                        onTabChange={setTabId}
                        onSelect={pick}
                        onEscape={() => setPopup(null)}
                        header={header}
                    />
                </FloatingPopup>
            )}
        </Box>
    );

    if (title === null) return input;

    return (
        <WiredSection title={title}>
            {input}
        </WiredSection>
    );
};
