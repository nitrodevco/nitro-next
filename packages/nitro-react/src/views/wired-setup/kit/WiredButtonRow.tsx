/**
 * `wired_setup.uibuilder.presets.ButtonRowPreset` - buttons side by side with the style's
 * `buttonRowSpacing` between them; scaling buttons share the row's width in equal parts.
 */
import { ReactNode } from 'react';

import { WiredSimpleList } from './WiredSimpleList';
import { useWiredStyle } from './WiredStyleContext';

export interface WiredButtonRowProps {
    children?: ReactNode;
}

export const WiredButtonRow = ({ children }: WiredButtonRowProps) => {
    const style = useWiredStyle();

    return (
        <WiredSimpleList
            vertical={false}
            spacing={style.buttonRowSpacing}
        >
            {children}
        </WiredSimpleList>
    );
};
