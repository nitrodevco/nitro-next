import { createContext, useContext } from 'react';

export type AccordionType = 'single' | 'multiple';

export interface AccordionContextValue {
    openValues: string[];
    alwaysOpen: boolean;
    isOpen: (value: string) => boolean;
    toggle: (value: string) => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export const useAccordion = () => {
    const context = useContext(AccordionContext);

    if (!context) throw new Error('useAccordion must be used within an Accordion');

    return context;
}

export const AccordionItemContext = createContext<string | null>(null);

export const useAccordionItem = () => {
    const { isOpen, toggle } = useAccordion();
    const value = useContext(AccordionItemContext);

    if (value === null) throw new Error('useAccordionItem must be used within an AccordionItem');

    return { value, isOpen: isOpen(value), toggle: () => toggle(value) };
}
