import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterBlueLayoutLeftPaddingItem } from './WiredStyleVolterBlueLayoutLeftPaddingItem';
import { WiredStyleVolterBlueLayoutRightPaddingItem } from './WiredStyleVolterBlueLayoutRightPaddingItem';
import { WiredStyleVolterBlueLayoutSourceOptionsBorderItem } from './WiredStyleVolterBlueLayoutSourceOptionsBorderItem';

/** Named region `sourcetype_selector_view` of WiredStyleVolterBlueLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterBlueLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    visibleSourcetypeSelectorView?: boolean;
}

export const WiredStyleVolterBlueLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, visibleSourcetypeSelectorView }: WiredStyleVolterBlueLayoutSourcetypeSelectorViewProps) => {
    return (
        (visibleSourcetypeSelectorView ?? false) && (
            <Region
                name="sourcetype_selector_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsSourcetypeSelectorView ?? (
                    <>
                        <WiredStyleVolterBlueLayoutLeftPaddingItem />
                        <WiredStyleVolterBlueLayoutSourceOptionsBorderItem />
                        <WiredStyleVolterBlueLayoutRightPaddingItem />
                    </>
                )}
            </Region>
        )
    );
};
