import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterYellowLayoutLeftPaddingItem } from './WiredStyleVolterYellowLayoutLeftPaddingItem';
import { WiredStyleVolterYellowLayoutRightPaddingItem } from './WiredStyleVolterYellowLayoutRightPaddingItem';
import { WiredStyleVolterYellowLayoutSourceOptionsBorderItem } from './WiredStyleVolterYellowLayoutSourceOptionsBorderItem';

/** Named region `sourcetype_selector_view` of WiredStyleVolterYellowLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterYellowLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    visibleSourcetypeSelectorView?: boolean;
}

export const WiredStyleVolterYellowLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, visibleSourcetypeSelectorView }: WiredStyleVolterYellowLayoutSourcetypeSelectorViewProps) => {
    return (
        (visibleSourcetypeSelectorView ?? false) && (
            <Region
                name="sourcetype_selector_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsSourcetypeSelectorView ?? (
                    <>
                        <WiredStyleVolterYellowLayoutLeftPaddingItem />
                        <WiredStyleVolterYellowLayoutSourceOptionsBorderItem />
                        <WiredStyleVolterYellowLayoutRightPaddingItem />
                    </>
                )}
            </Region>
        )
    );
};
