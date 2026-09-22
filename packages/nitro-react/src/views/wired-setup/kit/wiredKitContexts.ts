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
 *   parts that stand directly in it, the top-level presets `WiredUIBuilder.addElements` took.
 */
import { createContext } from 'react';

import { ILLUMINA_WIRED_STYLE, WiredStyle } from '#base/wired';

import { WiredFrameListValue } from './WiredFrameListRegistry';

export type WiredFlowDirection = 'row' | 'column';

export const WiredStyleReactContext = createContext<WiredStyle>(ILLUMINA_WIRED_STYLE);
export const WiredFlowReactContext = createContext<WiredFlowDirection>('column');
export const WiredDisabledReactContext = createContext<boolean>(false);
export const WiredFrameListReactContext = createContext<WiredFrameListValue | null>(null);
