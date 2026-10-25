/**
 * The wired UI style the kit draws with - `PresetManager.wiredStyle`
 * (`UserDefinedRoomEventsCtrl.wiredStyle`). Mount the provider around a dialog's content with a
 * `WiredStyle` from `#base/wired` (`getWiredStyleByName`); every kit component underneath reads
 * its metrics, colours, theme variants and text styles from it. Without a provider the kit
 * renders in `WIRED_STYLE_DEFAULT` (illumina).
 *
 * The provider is written with `createElement` so that the module the whole kit and the dialog
 * import the pair from stays a plain `.ts` file.
 */
import { createElement, ReactNode, useContext } from 'react';

import { WiredStyle } from '#base/wired';

import { WiredStyleReactContext } from './wiredKitContexts';

export interface WiredStyleProviderProps {
    style: WiredStyle;
    children?: ReactNode;
}

export const WiredStyleProvider = ({ style, children }: WiredStyleProviderProps) =>
    createElement(WiredStyleReactContext.Provider, { value: style }, children);

/** The style of the enclosing `WiredStyleProvider`. */
export const useWiredStyle = (): WiredStyle => useContext(WiredStyleReactContext);
