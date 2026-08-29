import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleUbuntuLayoutLeftPadItem } from './WiredStyleUbuntuLayoutLeftPadItem';
import { WiredStyleUbuntuLayoutRightPadItem } from './WiredStyleUbuntuLayoutRightPadItem';
import { WiredStyleUbuntuLayoutTypeIconBitmapItem } from './WiredStyleUbuntuLayoutTypeIconBitmapItem';

/** Row template `source_btn` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutSourceBtnItemProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
    onSourceBtn?: () => void;
    visibleSourceElements?: boolean;
}

export const WiredStyleUbuntuLayoutSourceBtnItem = ({ itemsSourceElements, layout, onSourceBtn, visibleSourceElements }: WiredStyleUbuntuLayoutSourceBtnItemProps) => {
    return (
        <Region
            name="source_btn"
            backgroundColor="#ffffff"
            onPointerTap={onSourceBtn}
            cursor="pointer"
            layout={{ width: 13, height: 15, flexShrink: 0, minHeight: 15, maxHeight: 15, ...layout }}
        >
            {(visibleSourceElements ?? true) && (
                <Region
                    name="source_elements"
                    backgroundColor="#333333"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row' }}
                >
                    {itemsSourceElements ?? (
                        <>
                            <WiredStyleUbuntuLayoutLeftPadItem />
                            <WiredStyleUbuntuLayoutTypeIconBitmapItem />
                            <WiredStyleUbuntuLayoutRightPadItem />
                        </>
                    )}
                </Region>
            )}
        </Region>
    );
};
