import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterLayoutLeftPadItem } from './WiredStyleVolterLayoutLeftPadItem';
import { WiredStyleVolterLayoutRightPadItem } from './WiredStyleVolterLayoutRightPadItem';
import { WiredStyleVolterLayoutTypeIconBitmapItem } from './WiredStyleVolterLayoutTypeIconBitmapItem';

/** Row template `source_btn` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutSourceBtnItemProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
    onSourceBtn?: () => void;
    visibleSourceElements?: boolean;
}

export const WiredStyleVolterLayoutSourceBtnItem = ({ itemsSourceElements, layout, onSourceBtn, visibleSourceElements }: WiredStyleVolterLayoutSourceBtnItemProps) => {
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
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row' }}
                >
                    {itemsSourceElements ?? (
                        <>
                            <WiredStyleVolterLayoutLeftPadItem />
                            <WiredStyleVolterLayoutTypeIconBitmapItem />
                            <WiredStyleVolterLayoutRightPadItem />
                        </>
                    )}
                </Region>
            )}
        </Region>
    );
};
