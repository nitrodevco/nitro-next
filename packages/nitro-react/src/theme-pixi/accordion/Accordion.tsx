import {  ReactNode, useState } from 'react';

import { Box, BoxLayout } from '../Box';
import { AccordionContext, AccordionType } from './AccordionContext';

type AccordionBaseProps = {
    layout?: BoxLayout;
    unwrapped?: boolean;
    alwaysOpen?: boolean;
    children?: ReactNode;
};

type AccordionSingleProps = AccordionBaseProps & {
    type?: 'single';
    collapsible?: boolean;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
};

type AccordionMultipleProps = AccordionBaseProps & {
    type: 'multiple';
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
};

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

type AccordionResolvedProps = AccordionBaseProps & {
    type?: AccordionType;
    collapsible?: boolean;
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
};

const toValues = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) return value;
    if (!value) return [];

    return [ value ];
};

/**
 * Pixi port of theme/Accordion.tsx. The open/close state machine below (single vs multiple,
 * controlled vs uncontrolled, collapsible, alwaysOpen) is copied verbatim from DOM rather than
 * imported from anywhere, because in DOM it's inlined in the very component body that also
 * renders the wrapping `<div className=.../>` - there is no seam to import "just the state" -
 * so the whole component is forked, with the div/className/cn() half replaced by Box/layout.
 * AccordionContext itself has no such rendering seam (it's pure Context, no JSX of its own)
 * and so is reused verbatim - see ./AccordionContext.tsx.
 */
export const Accordion = (props: AccordionProps) => {
    const { layout, unwrapped, alwaysOpen = false, type, collapsible, value, defaultValue, onValueChange, children } = props as AccordionResolvedProps;

    const isSingle = (type ?? 'single') === 'single';
    const isControlled = value !== undefined;

    const [ internalValues, setInternalValues ] = useState<string[]>(() => toValues(defaultValue));

    const openValues = isControlled ? toValues(value) : internalValues;

    const setValues = (values: string[]) => {
        if (!isControlled) setInternalValues(values);

        onValueChange?.(isSingle ? values[0] ?? '' : values);
    };

    const isOpen = (item: string) => alwaysOpen || openValues.includes(item);

    const toggle = (item: string) => {
        if (alwaysOpen) return;

        if (isSingle) {
            if (!isOpen(item)) return setValues([ item ]);
            if (collapsible) return setValues([]);

            return;
        }

        setValues(isOpen(item) ? openValues.filter(x => x !== item) : [ ...openValues, item ]);
    };

    const context = { openValues, alwaysOpen, isOpen, toggle };

    if (unwrapped) {
        return (
            <AccordionContext.Provider value={context}>
                {children}
            </AccordionContext.Provider>
        );
    }

    return (
        <Box layout={{ flexDirection: 'column', ...layout }}>
            <AccordionContext.Provider value={context}>
                {children}
            </AccordionContext.Provider>
        </Box>
    );
};

Accordion.displayName = 'Accordion';
