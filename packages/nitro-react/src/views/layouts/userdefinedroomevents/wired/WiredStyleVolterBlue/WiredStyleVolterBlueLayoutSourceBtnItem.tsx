import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterBlueLayoutLeftPadItem } from './WiredStyleVolterBlueLayoutLeftPadItem';
import { WiredStyleVolterBlueLayoutRightPadItem } from './WiredStyleVolterBlueLayoutRightPadItem';
import { WiredStyleVolterBlueLayoutTypeIconBitmapItem } from './WiredStyleVolterBlueLayoutTypeIconBitmapItem';

/** Row template `source_btn` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutSourceBtnItemProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
    onSourceBtn?: () => void;
    visibleSourceElements?: boolean;
}

export const WiredStyleVolterBlueLayoutSourceBtnItem = ({ itemsSourceElements, layout, onSourceBtn, visibleSourceElements }: WiredStyleVolterBlueLayoutSourceBtnItemProps) => {
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
                    backgroundColor="#ffeda5"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row' }}
                >
                    {itemsSourceElements ?? (
                        <>
                            <WiredStyleVolterBlueLayoutLeftPadItem />
                            <WiredStyleVolterBlueLayoutTypeIconBitmapItem />
                            <WiredStyleVolterBlueLayoutRightPadItem />
                        </>
                    )}
                </Region>
            )}
        </Region>
    );
};
