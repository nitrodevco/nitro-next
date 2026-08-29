import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleUbuntuLayoutLeftPaddingItem } from './WiredStyleUbuntuLayoutLeftPaddingItem';
import { WiredStyleUbuntuLayoutRightPaddingItem } from './WiredStyleUbuntuLayoutRightPaddingItem';
import { WiredStyleUbuntuLayoutSourceOptionsBorderItem } from './WiredStyleUbuntuLayoutSourceOptionsBorderItem';

/** Named region `sourcetype_selector_view` of WiredStyleUbuntuLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleUbuntuLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    visibleSourcetypeSelectorView?: boolean;
}

export const WiredStyleUbuntuLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, visibleSourcetypeSelectorView }: WiredStyleUbuntuLayoutSourcetypeSelectorViewProps) => {
    return (
        (visibleSourcetypeSelectorView ?? false) && (
            <Region
                name="sourcetype_selector_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsSourcetypeSelectorView ?? (
                    <>
                        <WiredStyleUbuntuLayoutLeftPaddingItem />
                        <WiredStyleUbuntuLayoutSourceOptionsBorderItem />
                        <WiredStyleUbuntuLayoutRightPaddingItem />
                    </>
                )}
            </Region>
        )
    );
};
