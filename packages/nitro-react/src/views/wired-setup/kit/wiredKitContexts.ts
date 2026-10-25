/**
 * The React contexts of the wired kit. They live apart from the components that provide them so
 * that a component file exports components only.
 *
 * - the style (`WiredStyleProvider` / `useWiredStyle`) - Flash's `PresetManager.wiredStyle`;
 * - the flow direction of the enclosing list (`WiredFlow` / `useWiredFillLayout`) - what decides
 *   how a preset "resizes to width": stretched across a column, or sharing a row;
 * - whether an ancestor is disabled (`WiredDisabled` / `useWiredDisabled`) - Flash walks the
 *   window tree in `Util.disableSection`; here the state travels down a context;
 * - the frame's element list (`WiredFrameList` / `WiredFrameListItem`) - present only for the
 *   parts that stand directly in it, the top-level presets `WiredUIBuilder.addElements` took;
 * - the input source claims (`IInputSourceClaimOwner`, WIN63-202610121624) - a preset that draws
 *   a merged input source's control itself, in its own popup, instead of the advanced settings.
 */
import { createContext, ReactNode } from 'react';

import { ILLUMINA_WIRED_STYLE, WiredStyle } from '#base/wired';

import { WiredFrameListValue } from './WiredFrameListRegistry';

export type WiredFlowDirection = 'row' | 'column';

export const WiredStyleReactContext = createContext<WiredStyle>(ILLUMINA_WIRED_STYLE);
export const WiredFlowReactContext = createContext<WiredFlowDirection>('column');
export const WiredDisabledReactContext = createContext<boolean>(false);
export const WiredFrameListReactContext = createContext<WiredFrameListValue | null>(null);

/** A claimed merged input source as its owner draws it (`attachInputSourceControl`). */
export interface WiredClaimedInputSource {
    /** `dualPickHeaderOptions` - the "furni picks" button for the section header. */
    headerOptions: ReactNode;
    /** The `InputSourceControlPreset`: the source's name between its two arrows. */
    control: ReactNode;
    /** `isInputSourceDisabled` for the source. */
    disabled: boolean;
}

/**
 * `UserDefinedRoomEventsCtrl._inputSourceClaimOwners` / `createAdvancedInputSources`: a claimed
 * merged source gets no section in the advanced settings; its control goes to the owner.
 */
export interface WiredInputSourceClaims {
    /** Registers the owner of merged source `id`; returns the release. */
    claim: (id: number) => () => void;
    render: (id: number) => WiredClaimedInputSource;
}

export const WiredInputSourceClaimReactContext = createContext<WiredInputSourceClaims | null>(null);
