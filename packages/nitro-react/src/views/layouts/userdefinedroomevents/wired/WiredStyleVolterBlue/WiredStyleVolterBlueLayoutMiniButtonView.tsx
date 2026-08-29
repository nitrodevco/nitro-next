import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterBlueLayoutLeftPaddingItem2 } from './WiredStyleVolterBlueLayoutLeftPaddingItem2';
import { WiredStyleVolterBlueLayoutMiniButtonBgItem } from './WiredStyleVolterBlueLayoutMiniButtonBgItem';
import { WiredStyleVolterBlueLayoutRightPaddingItem2 } from './WiredStyleVolterBlueLayoutRightPaddingItem2';

/** Named region `mini_button_view` of WiredStyleVolterBlueLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterBlueLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
    visibleMiniButtonView?: boolean;
}

export const WiredStyleVolterBlueLayoutMiniButtonView = ({ itemsMiniButtonView, layout, visibleMiniButtonView }: WiredStyleVolterBlueLayoutMiniButtonViewProps) => {
    return (
        (visibleMiniButtonView ?? false) && (
            <Region
                name="mini_button_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsMiniButtonView ?? (
                    <>
                        <WiredStyleVolterBlueLayoutLeftPaddingItem2 />
                        <WiredStyleVolterBlueLayoutMiniButtonBgItem />
                        <WiredStyleVolterBlueLayoutRightPaddingItem2 />
                    </>
                )}
            </Region>
        )
    );
};
