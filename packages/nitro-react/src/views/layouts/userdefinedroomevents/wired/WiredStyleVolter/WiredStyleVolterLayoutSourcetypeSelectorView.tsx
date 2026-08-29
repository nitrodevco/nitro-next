import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterLayoutLeftPaddingItem } from './WiredStyleVolterLayoutLeftPaddingItem';
import { WiredStyleVolterLayoutRightPaddingItem } from './WiredStyleVolterLayoutRightPaddingItem';
import { WiredStyleVolterLayoutSourceOptionsBorderItem } from './WiredStyleVolterLayoutSourceOptionsBorderItem';

/** Named region `sourcetype_selector_view` of WiredStyleVolterLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    visibleSourcetypeSelectorView?: boolean;
}

export const WiredStyleVolterLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, visibleSourcetypeSelectorView }: WiredStyleVolterLayoutSourcetypeSelectorViewProps) => {
    return (
        (visibleSourcetypeSelectorView ?? false) && (
            <Region
                name="sourcetype_selector_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsSourcetypeSelectorView ?? (
                    <>
                        <WiredStyleVolterLayoutLeftPaddingItem />
                        <WiredStyleVolterLayoutSourceOptionsBorderItem />
                        <WiredStyleVolterLayoutRightPaddingItem />
                    </>
                )}
            </Region>
        )
    );
};
