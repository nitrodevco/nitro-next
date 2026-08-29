import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

import { TargetedOfferMinimizedLayoutTxtTimeLeftItem } from './TargetedOfferMinimizedLayoutTxtTimeLeftItem';
import { TargetedOfferMinimizedLayoutTxtTitleItem } from './TargetedOfferMinimizedLayoutTxtTitleItem';

/** Generated from `1564_targeted_offer_minimized_xml` (layout "targetedoffers_minimized", 192x51) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferMinimizedLayoutProps {
    itemsItemlist?: ReactNode;
    layout?: BoxLayout;
    onTargetedoffersMinimized?: () => void;
    srcBmpIcon?: string;
}

export const TargetedOfferMinimizedLayout = ({ itemsItemlist, layout, onTargetedoffersMinimized, srcBmpIcon }: TargetedOfferMinimizedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 51, ...layout }}>
            <Region
                name="targetedoffers_minimized"
                onPointerTap={onTargetedoffersMinimized}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Region
                        name="itemlist"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 6, flexDirection: 'column', gap: 2 }}
                    >
                        {itemsItemlist ?? (
                            <>
                                <TargetedOfferMinimizedLayoutTxtTitleItem />
                                <TargetedOfferMinimizedLayoutTxtTimeLeftItem />
                            </>
                        )}
                    </Region>
                    <ThemeImage
                        name="bmp_icon"
                        src={srcBmpIcon}
                        layout={{ position: 'absolute', left: 6, width: 40, top: 6, height: 40 }}
                    />
                </Border>
            </Region>
        </Region>
    );
};
