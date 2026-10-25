/**
 * The Flash text format of one of the style's text templates with `TextParam`'s overrides
 * applied, memoised so that a label only rasterises again when something about it changed.
 */
import { useMemo } from 'react';

import { FlashTextFormat } from '#base/theme';
import { WiredStyleTextTemplate } from '#base/wired';

import { wiredTextFormat } from './wiredTextFormat';

export const useWiredTextFormat = (template: WiredStyleTextTemplate, color?: string | null, fontSize?: number, underline?: boolean): FlashTextFormat =>
    useMemo(() => wiredTextFormat(template, { color, fontSize, underline }), [ template, color, fontSize, underline ]);
