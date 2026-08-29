import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleVolterGreenLayoutLeftPaddingItem2 } from './WiredStyleVolterGreenLayoutLeftPaddingItem2';
import { WiredStyleVolterGreenLayoutMiniButtonBgItem } from './WiredStyleVolterGreenLayoutMiniButtonBgItem';
import { WiredStyleVolterGreenLayoutRightPaddingItem2 } from './WiredStyleVolterGreenLayoutRightPaddingItem2';

/** Named region `mini_button_view` of WiredStyleVolterGreenLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterGreenLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
    visibleMiniButtonView?: boolean;
}

export const WiredStyleVolterGreenLayoutMiniButtonView = ({ itemsMiniButtonView, layout, visibleMiniButtonView }: WiredStyleVolterGreenLayoutMiniButtonViewProps) => {
    return (
        (visibleMiniButtonView ?? false) && (
            <Region
                name="mini_button_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsMiniButtonView ?? (
                    <>
                        <WiredStyleVolterGreenLayoutLeftPaddingItem2 />
                        <WiredStyleVolterGreenLayoutMiniButtonBgItem />
                        <WiredStyleVolterGreenLayoutRightPaddingItem2 />
                    </>
                )}
            </Region>
        )
    );
};
