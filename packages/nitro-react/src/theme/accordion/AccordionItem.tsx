import { ReactNode } from 'react';

import { AccordionItemContext } from './AccordionContext';

interface AccordionItemProps {
    value: string;
    children?: ReactNode;
}

export const AccordionItem = ({ value, children }: AccordionItemProps) => (
    <AccordionItemContext.Provider value={value}>
        {children}
    </AccordionItemContext.Provider>
);

AccordionItem.displayName = 'AccordionItem';
