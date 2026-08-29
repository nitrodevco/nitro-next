import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterGreenLayoutLeftPaddingItem } from './WiredStyleVolterGreenLayoutLeftPaddingItem';
import { WiredStyleVolterGreenLayoutRightPaddingItem } from './WiredStyleVolterGreenLayoutRightPaddingItem';
import { WiredStyleVolterGreenLayoutSourceOptionsBorderItem } from './WiredStyleVolterGreenLayoutSourceOptionsBorderItem';

/** Named region `sourcetype_selector_view` of WiredStyleVolterGreenLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterGreenLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    visibleSourcetypeSelectorView?: boolean;
}

export const WiredStyleVolterGreenLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, visibleSourcetypeSelectorView }: WiredStyleVolterGreenLayoutSourcetypeSelectorViewProps) => {
    return (
        (visibleSourcetypeSelectorView ?? false) && (
            <Region
                name="sourcetype_selector_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsSourcetypeSelectorView ?? (
                    <>
                        <WiredStyleVolterGreenLayoutLeftPaddingItem />
                        <WiredStyleVolterGreenLayoutSourceOptionsBorderItem />
                        <WiredStyleVolterGreenLayoutRightPaddingItem />
                    </>
                )}
            </Region>
        )
    );
};
