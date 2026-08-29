import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

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
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 51 }}
            >
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 51 }}
                >
                    <Region
                        name="itemlist"
                        layout={{ position: 'absolute', left: 0, top: 6, flexDirection: 'column', gap: 2 }}
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

/** Row template `txt_title` of TargetedOfferMinimizedLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferMinimizedLayoutTxtTitleItemProps {
    captionTxtTitle?: string;
    layout?: BoxLayout;
}

export const TargetedOfferMinimizedLayoutTxtTitleItem = ({ captionTxtTitle, layout }: TargetedOfferMinimizedLayoutTxtTitleItemProps) => {
    return (
        <Region
            name="txt_title"
            layout={{ width: 138, flexShrink: 0, maxWidth: 162, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTxtTitle ?? ''}
                textStyle="text-style-il-regular-white"
                textOptions={{ wordWrap: true, wordWrapWidth: 138 }}
            />
        </Region>
    );
};

/** Row template `txt_time_left` of TargetedOfferMinimizedLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferMinimizedLayoutTxtTimeLeftItemProps {
    captionTxtTimeLeft?: string;
    layout?: BoxLayout;
}

export const TargetedOfferMinimizedLayoutTxtTimeLeftItem = ({ captionTxtTimeLeft, layout }: TargetedOfferMinimizedLayoutTxtTimeLeftItemProps) => {
    return (
        <Region
            name="txt_time_left"
            layout={{ width: 138, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTxtTimeLeft ?? ''}
                textStyle="text-style-il-regular-white"
            />
        </Region>
    );
};
