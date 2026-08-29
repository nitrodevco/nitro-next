import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterLayoutLeftPaddingItem2 } from './WiredStyleVolterLayoutLeftPaddingItem2';
import { WiredStyleVolterLayoutMiniButtonBgItem } from './WiredStyleVolterLayoutMiniButtonBgItem';
import { WiredStyleVolterLayoutRightPaddingItem2 } from './WiredStyleVolterLayoutRightPaddingItem2';

/** Named region `mini_button_view` of WiredStyleVolterLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
    visibleMiniButtonView?: boolean;
}

export const WiredStyleVolterLayoutMiniButtonView = ({ itemsMiniButtonView, layout, visibleMiniButtonView }: WiredStyleVolterLayoutMiniButtonViewProps) => {
    return (
        (visibleMiniButtonView ?? false) && (
            <Region
                name="mini_button_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsMiniButtonView ?? (
                    <>
                        <WiredStyleVolterLayoutLeftPaddingItem2 />
                        <WiredStyleVolterLayoutMiniButtonBgItem />
                        <WiredStyleVolterLayoutRightPaddingItem2 />
                    </>
                )}
            </Region>
        )
    );
};
