import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterYellowLayoutLeftPaddingItem2 } from './WiredStyleVolterYellowLayoutLeftPaddingItem2';
import { WiredStyleVolterYellowLayoutMiniButtonBgItem } from './WiredStyleVolterYellowLayoutMiniButtonBgItem';
import { WiredStyleVolterYellowLayoutRightPaddingItem2 } from './WiredStyleVolterYellowLayoutRightPaddingItem2';

/** Named region `mini_button_view` of WiredStyleVolterYellowLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterYellowLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
    visibleMiniButtonView?: boolean;
}

export const WiredStyleVolterYellowLayoutMiniButtonView = ({ itemsMiniButtonView, layout, visibleMiniButtonView }: WiredStyleVolterYellowLayoutMiniButtonViewProps) => {
    return (
        (visibleMiniButtonView ?? false) && (
            <Region
                name="mini_button_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsMiniButtonView ?? (
                    <>
                        <WiredStyleVolterYellowLayoutLeftPaddingItem2 />
                        <WiredStyleVolterYellowLayoutMiniButtonBgItem />
                        <WiredStyleVolterYellowLayoutRightPaddingItem2 />
                    </>
                )}
            </Region>
        )
    );
};
