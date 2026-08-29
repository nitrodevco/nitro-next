import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1662_special_items_display_xml` (layout "special_items_display", 420x495) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpecialItemsDisplayLayoutProps {
    bottom?: SpecialItemsDisplayLayoutBottomProps;
    captionClaimTxt?: string;
    captionSetDesc?: string;
    captionSetTitle?: string;
    center?: SpecialItemsDisplayLayoutCenterProps;
    layout?: BoxLayout;
    onClaimBtn?: () => void;
    onClose?: () => void;
    visibleClaimContainer?: boolean;
}

export const SpecialItemsDisplayLayout = ({ bottom, captionClaimTxt, captionSetDesc, captionSetTitle, center, layout, onClaimBtn, onClose, visibleClaimContainer }: SpecialItemsDisplayLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="main"
            name="main"
            caption={t('special_items.title')}
            tintColor="#2a2a2a"
            onClose={onClose}
            layout={{ width: 420, height: 495, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    name="background_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 33 }}
                >
                    <Region
                        name="bg1"
                        backgroundColor="#bfbfbf"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 0, bottom: 7 }}
                    />
                    <Region
                        name="bg2"
                        backgroundColor="#bfbfbf"
                        layout={{ position: 'absolute', left: 4, right: 4, bottom: 5, height: 2 }}
                    />
                    <Region
                        name="bg3"
                        backgroundColor="#bfbfbf"
                        layout={{ position: 'absolute', left: 6, right: 6, bottom: 4, height: 1 }}
                    />
                </Region>
                <Region
                    name="header"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 107 }}
                >
                    <Border
                        variant="2"
                        tintColor="#d9d9d9"
                        layout={{ position: 'absolute', left: 13, width: 394, top: 13, height: 94 }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 7, width: 380, top: 7, height: 80 }}
                        >
                            <Region layout={{ flexDirection: 'column', width: '100%' }}>
                                <Region
                                    name="set_title"
                                    layout={{ width: 365, height: 17, flexShrink: 0, maxWidth: 365, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={captionSetTitle ?? t('special_items.wf15.header.title')}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 365, align: 'center' }}
                                    />
                                </Region>
                                <Region
                                    name="set_desc"
                                    layout={{ width: 365, height: 57, flexShrink: 0, maxWidth: 365, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={captionSetDesc ?? t('special_items.wf15.header.desc')}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 365, align: 'center' }}
                                    />
                                </Region>
                            </Region>
                        </ScrollArea>
                    </Border>
                </Region>
                <SpecialItemsDisplayLayoutCenter {...center} />
                <Region
                    name="claim_spacer"
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 0 }}
                />
                {(visibleClaimContainer ?? false) && (
                    <Border
                        variant="2"
                        name="claim_container"
                        blend={0.8}
                        layout={{ position: 'absolute', width: 310, top: 115, height: 40 }}
                    >
                        <Region layout={{ position: 'absolute', left: 16, width: 277, top: 5, height: 30, flexDirection: 'row', gap: 10 }}>
                            <Region
                                name="claim_txt"
                                layout={{ width: 212, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionClaimTxt ?? t('special_items.claim_info')} />
                            </Region>
                            <Button
                                variant="4"
                                name="claim_btn"
                                onPointerTap={onClaimBtn}
                                layout={{ width: 55, height: 30, flexShrink: 0 }}
                            >
                                {t('special_items.claim')}
                            </Button>
                        </Region>
                    </Border>
                )}
                <SpecialItemsDisplayLayoutBottom {...bottom} />
            </Region>
        </Frame>
    );
};

/** Row template `page_template` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutPageTemplateItemProps {
    layout?: BoxLayout;
    onPageTemplate?: () => void;
    srcPageImage?: string;
}

export const SpecialItemsDisplayLayoutPageTemplateItem = ({ layout, onPageTemplate, srcPageImage }: SpecialItemsDisplayLayoutPageTemplateItemProps) => {
    return (
        <Region
            name="page_template"
            onPointerTap={onPageTemplate}
            cursor="pointer"
            layout={{ width: 10, height: 11, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="page_image"
                src={srcPageImage ?? layoutImage('progress_disk_etched_on.png')}
                layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 11 }}
            />
        </Region>
    );
};

/** Row template `page_template` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutPageTemplateItem2Props {
    layout?: BoxLayout;
    onPageTemplate?: () => void;
    srcPageImage?: string;
}

export const SpecialItemsDisplayLayoutPageTemplateItem2 = ({ layout, onPageTemplate, srcPageImage }: SpecialItemsDisplayLayoutPageTemplateItem2Props) => {
    return (
        <Region
            name="page_template"
            onPointerTap={onPageTemplate}
            cursor="pointer"
            layout={{ width: 10, height: 11, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="page_image"
                src={srcPageImage ?? layoutImage('progress_disk_etched_off.png')}
                layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 11 }}
            />
        </Region>
    );
};

/** Row template `page_template` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutPageTemplateItem3Props {
    layout?: BoxLayout;
    onPageTemplate?: () => void;
    srcPageImage?: string;
}

export const SpecialItemsDisplayLayoutPageTemplateItem3 = ({ layout, onPageTemplate, srcPageImage }: SpecialItemsDisplayLayoutPageTemplateItem3Props) => {
    return (
        <Region
            name="page_template"
            onPointerTap={onPageTemplate}
            cursor="pointer"
            layout={{ width: 10, height: 11, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="page_image"
                src={srcPageImage ?? layoutImage('progress_disk_etched_off.png')}
                layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 11 }}
            />
        </Region>
    );
};

/** Named region `page_container` of SpecialItemsDisplayLayout - configured through the parent's `pageContainer` prop. */
export interface SpecialItemsDisplayLayoutPageContainerProps {
    itemsPageList?: ReactNode;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutPageContainer = ({ itemsPageList, layout }: SpecialItemsDisplayLayoutPageContainerProps) => {
    return (
        <Region
            name="page_container"
            layout={{ position: 'absolute', left: 39, width: 342, top: 207, height: 11, justifyContent: 'center', ...layout }}
        >
            <Region
                name="page_list"
                layout={{ position: 'absolute', top: 0, flexDirection: 'row', gap: 7 }}
            >
                {itemsPageList ?? (
                    <>
                        <SpecialItemsDisplayLayoutPageTemplateItem />
                        <SpecialItemsDisplayLayoutPageTemplateItem2 />
                        <SpecialItemsDisplayLayoutPageTemplateItem3 />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Named region `center` of SpecialItemsDisplayLayout - configured through the parent's `center` prop. */
export interface SpecialItemsDisplayLayoutCenterProps {
    layout?: BoxLayout;
    onNextButton?: () => void;
    onPreviousButton?: () => void;
    pageContainer?: SpecialItemsDisplayLayoutPageContainerProps;
    srcPlatformImg?: string;
    srcSpotlightBaseImg?: string;
    srcSpotlightImg?: string;
}

export const SpecialItemsDisplayLayoutCenter = ({ layout, onNextButton, onPreviousButton, pageContainer, srcPlatformImg, srcSpotlightBaseImg, srcSpotlightImg }: SpecialItemsDisplayLayoutCenterProps) => {
    return (
        <Region
            name="center"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 168, height: 220, ...layout }}
        >
            <Region
                name="item_viewer"
                layout={{ position: 'absolute', left: 40, width: 340, top: 0, height: 197 }}
            >
                <ThemeImage
                    name="platform_img"
                    src={srcPlatformImg ?? layoutImage('special_items_item_platform.png')}
                    layout={{ position: 'absolute', left: 8, width: 323, top: 41, height: 155 }}
                />
                <ThemeImage
                    name="spotlight_base_img"
                    src={srcSpotlightBaseImg ?? layoutImage('special_items_spotlight2.png')}
                    layout={{ position: 'absolute', left: 124, width: 91, top: 118, height: 51 }}
                />
                <Region
                    name="item_rotation"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 197 }}
                >
                    <WidgetSlot
                        widgetType="product_image"
                        name="product_display_template"
                        options={{ pivot_point: 'bottom center' }}
                        layout={{ position: 'absolute', left: 70, width: 200, top: -36, height: 200 }}
                    />
                </Region>
                <ThemeImage
                    name="spotlight_img"
                    src={srcSpotlightImg ?? layoutImage('special_items_spotlight1.png')}
                    blendMode="add"
                    layout={{ position: 'absolute', left: 124, width: 91, top: -100, height: 271 }}
                />
            </Region>
            <Region
                name="previous_button"
                dynamicStyle="brightness_and_shadow_under_gentle"
                onPointerTap={onPreviousButton}
                cursor="pointer"
                layout={{ position: 'absolute', left: 8, width: 33, top: 97, height: 38 }}
            >
                <ThemeImage
                    src={layoutImage('icons_back.png')}
                    layout={{ position: 'absolute', left: 0, width: 33, top: 4, height: 34 }}
                />
            </Region>
            <Region
                name="next_button"
                dynamicStyle="brightness_and_shadow_under_gentle"
                onPointerTap={onNextButton}
                cursor="pointer"
                layout={{ position: 'absolute', left: 379, width: 33, top: 97, height: 38 }}
            >
                <ThemeImage
                    src={layoutImage('icons_forward.png')}
                    layout={{ position: 'absolute', left: 0, width: 33, top: 4, height: 34 }}
                />
            </Region>
            <SpecialItemsDisplayLayoutPageContainer {...pageContainer} />
        </Region>
    );
};

/** Row template `item_title` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutItemTitleItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutItemTitleItem = ({ captionItemTitle, layout }: SpecialItemsDisplayLayoutItemTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="item_title"
            layout={{ width: 300, height: 17, flexShrink: 0, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionItemTitle ?? t('special_items.wf15.body.wf15_act.title')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};

/** Row template `item_desc` of SpecialItemsDisplayLayout - pass real rows through its `items…` slot. */
export interface SpecialItemsDisplayLayoutItemDescItemProps {
    captionItemDesc?: string;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutItemDescItem = ({ captionItemDesc, layout }: SpecialItemsDisplayLayoutItemDescItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="item_desc"
            layout={{ width: 300, height: 57, flexShrink: 0, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionItemDesc ?? t('special_items.wf15.body.wf15_act.desc')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};

/** Named region `bottom` of SpecialItemsDisplayLayout - configured through the parent's `bottom` prop. */
export interface SpecialItemsDisplayLayoutBottomProps {
    itemsItemScrollArea?: ReactNode;
    layout?: BoxLayout;
    srcTemp?: string;
    visibleBottomborder2?: boolean;
    visibleTemp?: boolean;
}

export const SpecialItemsDisplayLayoutBottom = ({ itemsItemScrollArea, layout, srcTemp, visibleBottomborder2, visibleTemp }: SpecialItemsDisplayLayoutBottomProps) => {
    return (
        <Region
            name="bottom"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 33, height: 135, ...layout }}
        >
            <Border
                variant="2"
                name="bottomborder_1"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 13, width: 394, top: 16, height: 110 }}
            />
            {(visibleBottomborder2 ?? false) && (
                <Border
                    variant="2"
                    name="bottomborder_2"
                    tintColor="#141414"
                    layout={{ position: 'absolute', left: 13, width: 394, top: 15, height: 110 }}
                />
            )}
            <Border
                variant="2"
                name="bottomborder_3"
                tintColor="#5a5a5a"
                layout={{ position: 'absolute', left: 13, width: 394, top: 10, height: 110 }}
            />
            <Border
                variant="2"
                tintColor="#262626"
                layout={{ position: 'absolute', left: 13, width: 394, top: 9, height: 110 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 10, width: 374, top: 7, height: 97 }}
                >
                    <Region
                        name="item_scroll_area"
                        layout={{ flexDirection: 'column', gap: 10, width: '100%' }}
                    >
                        {itemsItemScrollArea ?? (
                            <>
                                <SpecialItemsDisplayLayoutItemTitleItem />
                                <SpecialItemsDisplayLayoutItemDescItem />
                            </>
                        )}
                    </Region>
                </ScrollArea>
                {(visibleTemp ?? false) && (
                    <ThemeImage
                        name="temp"
                        src={srcTemp ?? layoutImage('bottom_bar_wired_menu.png')}
                        layout={{ position: 'absolute', right: 24, width: 40, top: 9, height: 40 }}
                    />
                )}
                <WidgetSlot
                    widgetType="product_icon"
                    name="product_icon"
                    layout={{ position: 'absolute', left: 330, width: 40, top: 9, height: 40 }}
                />
            </Border>
        </Region>
    );
};
