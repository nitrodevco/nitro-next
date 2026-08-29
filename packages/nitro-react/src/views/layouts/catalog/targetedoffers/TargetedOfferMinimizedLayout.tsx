import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1564_targeted_offer_minimized_xml` (layout "targetedoffers_minimized", 192x51) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TargetedOfferMinimizedLayoutProps {
    layout?: BoxLayout;
    targetedoffersMinimized?: TargetedOfferMinimizedLayoutTargetedoffersMinimizedProps;
}

export const TargetedOfferMinimizedLayout = ({ layout, targetedoffersMinimized }: TargetedOfferMinimizedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 51, ...layout }}>
            <TargetedOfferMinimizedLayoutTargetedoffersMinimized {...targetedoffersMinimized} />
        </Region>
    );
};

/** Row template `txt_title` of TargetedOfferMinimizedLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferMinimizedLayoutTxtTitleItemProps {
    captionTxtTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const TargetedOfferMinimizedLayoutTxtTitleItem = ({ captionTxtTitle, layout, tags }: TargetedOfferMinimizedLayoutTxtTitleItemProps) => {
    return (
        <Region
            name="txt_title"
            tags={tags}
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
    tags?: string[];
}

export const TargetedOfferMinimizedLayoutTxtTimeLeftItem = ({ captionTxtTimeLeft, layout, tags }: TargetedOfferMinimizedLayoutTxtTimeLeftItemProps) => {
    return (
        <Region
            name="txt_time_left"
            tags={tags}
            layout={{ width: 138, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTxtTimeLeft ?? ''}
                textStyle="text-style-il-regular-white"
            />
        </Region>
    );
};

/** Named region `itemlist` of TargetedOfferMinimizedLayout - configured through the parent's `itemlist` prop. */
export interface TargetedOfferMinimizedLayoutItemlistProps {
    itemsItemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const TargetedOfferMinimizedLayoutItemlist = ({ itemsItemlist, layout, tags }: TargetedOfferMinimizedLayoutItemlistProps) => {
    return (
        <Region
            name="itemlist"
            tags={tags}
            layout={{ position: 'absolute', left: 0, top: 6, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsItemlist ?? (
                <>
                    <TargetedOfferMinimizedLayoutTxtTitleItem />
                    <TargetedOfferMinimizedLayoutTxtTimeLeftItem />
                </>
            )}
        </Region>
    );
};

/** Named region `targetedoffers_minimized` of TargetedOfferMinimizedLayout - configured through the parent's `targetedoffersMinimized` prop. */
export interface TargetedOfferMinimizedLayoutTargetedoffersMinimizedProps {
    itemlist?: TargetedOfferMinimizedLayoutItemlistProps;
    layout?: BoxLayout;
    onTargetedoffersMinimized?: () => void;
    srcBmpIcon?: string;
    tags?: string[];
}

export const TargetedOfferMinimizedLayoutTargetedoffersMinimized = ({ itemlist, layout, onTargetedoffersMinimized, srcBmpIcon, tags }: TargetedOfferMinimizedLayoutTargetedoffersMinimizedProps) => {
    return (
        <Region
            name="targetedoffers_minimized"
            tags={tags}
            onPointerTap={onTargetedoffersMinimized}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 51, ...layout }}
        >
            <Border
                variant="9"
                tags={[ 'BGCOLOR' ]}
                tintColor="#686661"
                layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 51 }}
            >
                <TargetedOfferMinimizedLayoutItemlist {...itemlist} />
                <ThemeImage
                    name="bmp_icon"
                    src={srcBmpIcon}
                    layout={{ position: 'absolute', left: 6, width: 40, top: 6, height: 40 }}
                />
            </Border>
        </Region>
    );
};
