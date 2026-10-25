/**
 * One input source section of the advanced settings - `main_layout/InputSourceSection` around a
 * `inputsources/WiredInputSourcePicker`: the source's name between a left and a right arrow,
 * which step through the sources the box allows (`onChangeInputSource`).
 *
 * - A merged section (furni or users) gets a source type selector in its header, unless the
 *   element draws that picker itself (`hasCustomTypePicker`); on a custom source type
 *   (`context`, `global`) the arrows are disabled.
 * - In dual furni picking mode the header also carries the two "furni picks" buttons; the one
 *   matching the section's current source shows, selected while room clicks go to its list.
 * - The whole section is disabled when the element says so (`isInputSourceDisabled`).
 *
 * What the picker computes (`refreshContainer`) is `getInputSourceState`; the arrows and the
 * type selector go through `stepWiredInputSource` / `setWiredMergedSourceType`.
 */
import { getInputSourceState, WIRED_SOURCE_MERGED, WIRED_STUFF_PICKING_MODE_1, WIRED_STUFF_PICKING_MODE_2, WiredInputSourcesEdit, WiredStyle } from '#base/wired';

import { WiredIconButton } from './kit/WiredIconButton';
import { WiredMiniAssetIconButton } from './kit/WiredMiniAssetIconButton';
import { WiredPaddedContainer } from './kit/WiredPaddedContainer';
import { WiredSection } from './kit/WiredSection';
import { WiredSimpleList } from './kit/WiredSimpleList';
import { WiredText } from './kit/WiredText';

export interface WiredSetupInputSourceSectionProps {
    style: WiredStyle;
    edit: WiredInputSourcesEdit;
    /** The section's title, a `${key}` caption. */
    title: string;
    /** `WIRED_SOURCE_FURNI`, `WIRED_SOURCE_USER` or `WIRED_SOURCE_MERGED`. */
    baseSourceType: number;
    id: number;
    /** A merged section's type selector options, `mergedSourceOptions(id)`; absent when there is no selector. */
    sourceOptions?: number[];
    dualFurniPickingMode: boolean;
    activeFurniPicks: number;
    localize: (key: string) => string;
    onStep: (forward: boolean) => void;
    onSelectSourceType: (sourceType: number) => void;
    onSelectFurniPicks: (picks: number) => void;
}

/** `InputSourceControlPreset.dualPickHeaderOptions` - the "furni picks" button matching the source, in dual picking mode. */
export const WiredSetupInputSourcePicks = ({ stuffPickingSpecialMode, activeFurniPicks, onSelectFurniPicks }: { stuffPickingSpecialMode: number; activeFurniPicks: number; onSelectFurniPicks: (picks: number) => void }) => (
    <>
        {(stuffPickingSpecialMode === WIRED_STUFF_PICKING_MODE_1) && (
            <WiredMiniAssetIconButton
                asset="furni_picks_1"
                tooltip="${wiredfurni.params.furni_picking.tooltip}"
                selected={activeFurniPicks === 1}
                onPress={() => onSelectFurniPicks(1)}
            />
        )}
        {(stuffPickingSpecialMode === WIRED_STUFF_PICKING_MODE_2) && (
            <WiredMiniAssetIconButton
                asset="furni_picks_2"
                tooltip="${wiredfurni.params.furni_picking.tooltip}"
                selected={activeFurniPicks === 2}
                onPress={() => onSelectFurniPicks(2)}
            />
        )}
    </>
);

/** `InputSourceControlPreset` - the source's name between its two arrows (`WiredInputSourcePicker`). */
export const WiredSetupInputSourceControl = ({ style, text, buttonsDisabled, onStep }: { style: WiredStyle; text: string; buttonsDisabled: boolean; onStep: (forward: boolean) => void }) => (
    <WiredPaddedContainer
        left={style.LRContainerMargin}
        top={style.LRContainerTopBottomPadding}
        right={style.LRContainerMargin}
        bottom={style.LRContainerTopBottomPadding}
    >
        <WiredSimpleList
            vertical={false}
            centerVertically
            spacing={style.LRContainerSpacing}
            minHeight={style.inputSourceListMinHeight}
        >
            <WiredIconButton
                icon="left"
                disabled={buttonsDisabled}
                onPress={() => onStep(false)}
            />
            <WiredText
                text={text}
                align="center"
            />
            <WiredIconButton
                icon="right"
                disabled={buttonsDisabled}
                onPress={() => onStep(true)}
            />
        </WiredSimpleList>
    </WiredPaddedContainer>
);

export const WiredSetupInputSourceSection = ({ style, edit, title, baseSourceType, id, sourceOptions, dualFurniPickingMode, activeFurniPicks, localize, onStep, onSelectSourceType, onSelectFurniPicks }: WiredSetupInputSourceSectionProps) => {
    const state = getInputSourceState(edit, baseSourceType, id, localize);
    const mergedType = edit.definition.getMergedType?.(edit.form, id) ?? 0;

    return (
        <WiredSection
            title={title}
            disabled={state.disabled}
            sourceTypeSelector={((baseSourceType === WIRED_SOURCE_MERGED) && sourceOptions) ? { options: sourceOptions, selected: mergedType, onSelect: onSelectSourceType } : undefined}
            headerOptions={dualFurniPickingMode
                ? (
                        <WiredSetupInputSourcePicks
                            stuffPickingSpecialMode={state.stuffPickingSpecialMode}
                            activeFurniPicks={activeFurniPicks}
                            onSelectFurniPicks={onSelectFurniPicks}
                        />
                    )
                : undefined}
        >
            <WiredSetupInputSourceControl
                style={style}
                text={state.text}
                buttonsDisabled={state.buttonsDisabled}
                onStep={onStep}
            />
        </WiredSection>
    );
};
