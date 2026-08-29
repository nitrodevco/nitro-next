import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1660_layout_frontpage_featured_xml` (layout "layout_frontpage_featured", 552x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutFrontpageFeaturedLayoutProps {
    ctlgFrontpage5?: LayoutFrontpageFeaturedLayoutCtlgFrontpage5Props;
    layout?: BoxLayout;
}

export const LayoutFrontpageFeaturedLayout = ({ ctlgFrontpage5, layout }: LayoutFrontpageFeaturedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 552, height: 460, ...layout }}>
            <LayoutFrontpageFeaturedLayoutCtlgFrontpage5 {...ctlgFrontpage5} />
        </Region>
    );
};

/** Named region `event_catcher_region` of LayoutFrontpageFeaturedLayout - configured through the parent's `eventCatcherRegion` prop. */
export interface LayoutFrontpageFeaturedLayoutEventCatcherRegionProps {
    layout?: BoxLayout;
    onEventCatcherRegion?: () => void;
}

export const LayoutFrontpageFeaturedLayoutEventCatcherRegion = ({ layout, onEventCatcherRegion }: LayoutFrontpageFeaturedLayoutEventCatcherRegionProps) => {
    return (
        <Region
            name="event_catcher_region"
            params={17}
            onPointerTap={onEventCatcherRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 126, ...layout }}
        />
    );
};

/** Row template `featured_item_template` of LayoutFrontpageFeaturedLayout - pass real rows through its `items…` slot. */
export interface LayoutFrontpageFeaturedLayoutFeaturedItemTemplateItemProps {
    captionItemTitle?: string;
    eventCatcherRegion?: LayoutFrontpageFeaturedLayoutEventCatcherRegionProps;
    layout?: BoxLayout;
    srcItemImage?: string;
}

export const LayoutFrontpageFeaturedLayoutFeaturedItemTemplateItem = ({ captionItemTitle, eventCatcherRegion, layout, srcItemImage }: LayoutFrontpageFeaturedLayoutFeaturedItemTemplateItemProps) => {
    return (
        <Region
            name="featured_item_template"
            params={16}
            layout={{ width: 360, height: 126, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="item_image"
                params={18}
                src={srcItemImage}
                layout={{ position: 'absolute', left: 0, width: 356, top: 0, height: 126 }}
            />
            <Border
                variant="3"
                name="text_container"
                params={1198099}
                tintColor="#333333"
                blend={0.5}
                layout={{ position: 'absolute', left: 5, width: 346, top: 93, bottom: 3 }}
            >
                <Region
                    name="item_title"
                    params={8388627}
                    layout={{ position: 'absolute', left: 5, width: 340, top: 5, maxWidth: 340, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemTitle ?? ''}
                        textStyle="text-style-ubuntu-condensed-title"
                        textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
                    />
                </Region>
            </Border>
            <LayoutFrontpageFeaturedLayoutEventCatcherRegion {...eventCatcherRegion} />
        </Region>
    );
};

/** Named region `itemlist_featured` of LayoutFrontpageFeaturedLayout - configured through the parent's `itemlistFeatured` prop. */
export interface LayoutFrontpageFeaturedLayoutItemlistFeaturedProps {
    itemsItemlistFeatured?: ReactNode;
    layout?: BoxLayout;
}

export const LayoutFrontpageFeaturedLayoutItemlistFeatured = ({ itemsItemlistFeatured, layout }: LayoutFrontpageFeaturedLayoutItemlistFeaturedProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 192, width: 360, top: 0, height: 392, ...layout }}
        >
            <Region
                name="itemlist_featured"
                params={16}
                layout={{ flexDirection: 'column', gap: 7, width: '100%' }}
            >
                {itemsItemlistFeatured ?? (
                    <LayoutFrontpageFeaturedLayoutFeaturedItemTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `event_catcher_region` of LayoutFrontpageFeaturedLayout - configured through the parent's `eventCatcherRegion` prop. */
export interface LayoutFrontpageFeaturedLayoutEventCatcherRegion2Props {
    layout?: BoxLayout;
    onEventCatcherRegion?: () => void;
}

export const LayoutFrontpageFeaturedLayoutEventCatcherRegion2 = ({ layout, onEventCatcherRegion }: LayoutFrontpageFeaturedLayoutEventCatcherRegion2Props) => {
    return (
        <Region
            name="event_catcher_region"
            params={17}
            onPointerTap={onEventCatcherRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 422, ...layout }}
        />
    );
};

/** Named region `firstitem` of LayoutFrontpageFeaturedLayout - configured through the parent's `firstitem` prop. */
export interface LayoutFrontpageFeaturedLayoutFirstitemProps {
    captionItemTitle?: string;
    eventCatcherRegion?: LayoutFrontpageFeaturedLayoutEventCatcherRegion2Props;
    layout?: BoxLayout;
    onFirstitem?: () => void;
    srcItemImage?: string;
}

export const LayoutFrontpageFeaturedLayoutFirstitem = ({ captionItemTitle, eventCatcherRegion, layout, onFirstitem, srcItemImage }: LayoutFrontpageFeaturedLayoutFirstitemProps) => {
    return (
        <Region
            name="firstitem"
            params={17}
            onPointerTap={onFirstitem}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460, ...layout }}
        >
            <ThemeImage
                name="item_image"
                params={1073741843}
                src={srcItemImage}
                layout={{ position: 'absolute', left: 0, width: 184, top: 0, height: 460, overflow: 'hidden' }}
            />
            <Border
                variant="3"
                name="text_container"
                params={1198099}
                tintColor="#333333"
                blend={0.5}
                layout={{ position: 'absolute', left: 5, width: 174, top: 428, bottom: 3, maxWidth: 174 }}
            >
                <Region
                    name="item_title"
                    params={8388627}
                    layout={{ position: 'absolute', left: 5, width: 174, top: 0, maxWidth: 174, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionItemTitle ?? ''}
                        textStyle="text-style-ubuntu-condensed-title"
                        textOptions={{ wordWrap: true, wordWrapWidth: 174 }}
                    />
                </Region>
            </Border>
            <LayoutFrontpageFeaturedLayoutEventCatcherRegion2 {...eventCatcherRegion} />
        </Region>
    );
};

/** Named region `featuredItemsWidget` of LayoutFrontpageFeaturedLayout - configured through the parent's `featuredItemsWidget` prop. */
export interface LayoutFrontpageFeaturedLayoutFeaturedItemsWidgetProps {
    firstitem?: LayoutFrontpageFeaturedLayoutFirstitemProps;
    itemlistFeatured?: LayoutFrontpageFeaturedLayoutItemlistFeaturedProps;
    layout?: BoxLayout;
}

export const LayoutFrontpageFeaturedLayoutFeaturedItemsWidget = ({ firstitem, itemlistFeatured, layout }: LayoutFrontpageFeaturedLayoutFeaturedItemsWidgetProps) => {
    return (
        <Region
            name="featuredItemsWidget"
            tags={[ 'EMBEDDED' ]}
            params={16400}
            layout={{ position: 'absolute', left: 0, width: 552, top: 0, height: 460, ...layout }}
        >
            <LayoutFrontpageFeaturedLayoutItemlistFeatured {...itemlistFeatured} />
            <LayoutFrontpageFeaturedLayoutFirstitem {...firstitem} />
        </Region>
    );
};

/** Named region `redeemItemCodeWidget` of LayoutFrontpageFeaturedLayout - configured through the parent's `redeemItemCodeWidget` prop. */
export interface LayoutFrontpageFeaturedLayoutRedeemItemCodeWidgetProps {
    layout?: BoxLayout;
    onRedeem?: () => void;
}

export const LayoutFrontpageFeaturedLayoutRedeemItemCodeWidget = ({ layout, onRedeem }: LayoutFrontpageFeaturedLayoutRedeemItemCodeWidgetProps) => {
    const t = useTranslation();
    const [ voucherCodeValue, setVoucherCodeValue ] = useState('');

    return (
        <Region
            name="redeemItemCodeWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 345, top: 20, height: 34, ...layout }}
        >
            <Border
                variant="0"
                params={16}
                layout={{ position: 'absolute', left: 10, width: 216, top: 5, height: 25 }}
            >
                <TextInput
                    value={voucherCodeValue}
                    onChange={setVoucherCodeValue}
                    multiline
                    layout={{ position: 'absolute', left: 4, width: 206, top: 4, height: 15 }}
                />
            </Border>
            <Button
                variant="3"
                name="redeem"
                params={393361}
                onPointerTap={onRedeem}
                layout={{ position: 'absolute', left: 274, right: 9, top: 5, height: 22, maxWidth: 100 }}
            >
                {t('redeem')}
            </Button>
        </Region>
    );
};

/** Named region `ctlg_frontpage5` of LayoutFrontpageFeaturedLayout - configured through the parent's `ctlgFrontpage5` prop. */
export interface LayoutFrontpageFeaturedLayoutCtlgFrontpage5Props {
    captionCtlgTxt2?: string;
    featuredItemsWidget?: LayoutFrontpageFeaturedLayoutFeaturedItemsWidgetProps;
    layout?: BoxLayout;
    redeemItemCodeWidget?: LayoutFrontpageFeaturedLayoutRedeemItemCodeWidgetProps;
}

export const LayoutFrontpageFeaturedLayoutCtlgFrontpage5 = ({ captionCtlgTxt2, featuredItemsWidget, layout, redeemItemCodeWidget }: LayoutFrontpageFeaturedLayoutCtlgFrontpage5Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_frontpage5"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 552, top: 0, height: 460, ...layout }}
        >
            <LayoutFrontpageFeaturedLayoutFeaturedItemsWidget {...featuredItemsWidget} />
            <Border
                variant="2"
                name="bgBorder"
                params={1040}
                tintColor="#51bbee"
                layout={{ position: 'absolute', left: 200, width: 345, bottom: 0, height: 61 }}
            >
                <Region
                    name="ctlg_txt2"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 272, top: 6, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgTxt2 ?? t('lorem.title')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 272 }}
                    />
                </Region>
                <LayoutFrontpageFeaturedLayoutRedeemItemCodeWidget {...redeemItemCodeWidget} />
            </Border>
        </Region>
    );
};
