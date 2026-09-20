/**
 * The advanced settings - `main_layout/AdvancedSettingsWrapperPreset` with what
 * `UserDefinedRoomEventsCtrl.createAdvancedSections` puts in it: a condition's quantifier radio
 * (`getQuantifierKey`: `wiredfurni.params.quantifier.<furni|users|variables>[.neg].<0|1>`) and one
 * input source section per furni selection, per user selection and per merged pair
 * (`createAdvancedInputSources`, in that order; a selection that belongs to a merged pair only
 * shows in the merged section).
 *
 * The sections sit on `advancedBackgroundColor`, `sectionSpacing` apart, under a centered
 * "expand" / "collapse" link - which an element whose `advancedAlwaysVisible()` is on does not
 * have. Whether the wrapper exists at all is the dialog's decision (`advancedMode` and something
 * to show).
 */
import { ReactNode } from 'react';

import { amountFurniSelections, amountUserSelections, getMergedSourceOptions, hasWiredQuantifier, isDualFurniPickingMode, WIRED_QUANTIFIER_FURNI, WIRED_QUANTIFIER_USERS, WIRED_QUANTIFIER_VARIABLES, WIRED_SOURCE_FURNI, WIRED_SOURCE_MERGED, WIRED_SOURCE_USER, WiredElementContext, WiredInputSourcesEdit, WiredStyle } from '#base/wired';

import { WiredAlignCenter } from './kit/WiredAlignCenter';
import { WiredRadioGroup } from './kit/WiredRadioGroup';
import { WiredSection } from './kit/WiredSection';
import { WiredSimpleList } from './kit/WiredSimpleList';
import { WiredTextualButton } from './kit/WiredTextualButton';
import { WiredSetupInputSourceSection } from './WiredSetupInputSourceSection';

export interface WiredSetupAdvancedSettingsProps {
    style: WiredStyle;
    edit: WiredInputSourcesEdit;
    ctx: WiredElementContext;
    expanded: boolean;
    activeFurniPicks: number;
    onToggleExpanded: () => void;
    onSelectQuantifier: (quantifierCode: number) => void;
    onStepInputSource: (baseSourceType: number, id: number, forward: boolean) => void;
    onSelectMergedSourceType: (id: number, sourceType: number) => void;
    onSelectFurniPicks: (picks: number) => void;
}

/** `getQuantifierKey`. */
const getQuantifierKey = (quantifierType: number, invert: boolean): string => {
    let kind = '';

    if (quantifierType === WIRED_QUANTIFIER_FURNI) kind = 'furni';
    else if (quantifierType === WIRED_QUANTIFIER_USERS) kind = 'users';
    else if (quantifierType === WIRED_QUANTIFIER_VARIABLES) kind = 'variables';

    return `wiredfurni.params.quantifier.${kind}${invert ? '.neg.' : '.'}`;
};

export const WiredSetupAdvancedSettings = ({ style, edit, ctx, expanded, activeFurniPicks, onToggleExpanded, onSelectQuantifier, onStepInputSource, onSelectMergedSourceType, onSelectFurniPicks }: WiredSetupAdvancedSettingsProps) => {
    const { triggerable, definition, form } = edit;
    const conf = triggerable.inputSourcesConf;
    const alwaysVisible = definition.advancedAlwaysVisible ?? false;
    const dualFurniPickingMode = isDualFurniPickingMode(conf);
    const mergedSelections = definition.mergedSelections ?? [];
    const mergedFurni = mergedSelections.map(([ furni ]) => furni);
    const mergedUsers = mergedSelections.map(([ , users ]) => users);
    const localize = (key: string) => ctx.localize(key);
    const quantifierKey = getQuantifierKey(triggerable.quantifierType, triggerable.conditionInvert);

    const sections: ReactNode[] = [];

    if (hasWiredQuantifier(triggerable)) {
        sections.push(
            <WiredSection
                key="quantifier"
                title="${wiredfurni.params.quantifier_selection}"
            >
                <WiredRadioGroup
                    options={[ { id: 0, label: `\${${quantifierKey}0}` }, { id: 1, label: `\${${quantifierKey}1}` } ]}
                    selected={triggerable.quantifierCode}
                    onSelect={onSelectQuantifier}
                />
            </WiredSection>,
        );
    }

    const sourceSection = (baseSourceType: number, id: number, titleKey: string, sourceOptions?: number[]) => (
        <WiredSetupInputSourceSection
            key={`${baseSourceType}-${id}`}
            style={style}
            edit={edit}
            title={`\${${titleKey}}`}
            baseSourceType={baseSourceType}
            id={id}
            sourceOptions={sourceOptions}
            dualFurniPickingMode={(baseSourceType !== WIRED_SOURCE_USER) && dualFurniPickingMode}
            activeFurniPicks={activeFurniPicks}
            localize={localize}
            onStep={forward => onStepInputSource(baseSourceType, id, forward)}
            onSelectSourceType={sourceType => onSelectMergedSourceType(id, sourceType)}
            onSelectFurniPicks={onSelectFurniPicks}
        />
    );

    for (let id = 0; id < amountFurniSelections(conf); id++) {
        if (!mergedFurni.includes(id)) sections.push(sourceSection(WIRED_SOURCE_FURNI, id, definition.furniSelectionTitle?.(id) ?? 'wiredfurni.params.sources.furni.title'));
    }

    for (let id = 0; id < amountUserSelections(conf); id++) {
        if (!mergedUsers.includes(id)) sections.push(sourceSection(WIRED_SOURCE_USER, id, definition.userSelectionTitle?.(id) ?? 'wiredfurni.params.sources.users.title'));
    }

    for (let id = 0; id < mergedSelections.length; id++) {
        const options = (definition.hasCustomTypePicker?.(id) ?? false) ? undefined : getMergedSourceOptions(definition, form, id, ctx);

        sections.push(sourceSection(WIRED_SOURCE_MERGED, id, definition.mergedSelectionTitle?.(id) ?? 'wiredfurni.params.sources.merged.title', options));
    }

    const isExpanded = alwaysVisible || expanded;

    return (
        <WiredSimpleList spacing={style.sectionSpacing}>
            {!alwaysVisible && (
                <WiredAlignCenter>
                    <WiredTextualButton
                        text={isExpanded ? '${wiredfurni.params.sources.collapse}' : '${wiredfurni.params.sources.expand}'}
                        onPress={onToggleExpanded}
                    />
                </WiredAlignCenter>
            )}
            {isExpanded && (
                <WiredSimpleList
                    spacing={style.sectionSpacing}
                    backgroundColor={style.advancedBackgroundColor}
                >
                    {sections}
                </WiredSimpleList>
            )}
        </WiredSimpleList>
    );
};
