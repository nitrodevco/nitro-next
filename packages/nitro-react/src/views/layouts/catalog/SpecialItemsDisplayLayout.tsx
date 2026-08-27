import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1662_special_items_display_xml` (layout "special_items_display", 420x495) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpecialItemsDisplayLayoutProps {
    captionClaimTxt?: string;
    captionSetDesc?: string;
    captionSetTitle?: string;
    itemsItemScrollArea?: ReactNode;
    itemsPageList?: ReactNode;
    layout?: BoxLayout;
    onClaimBtn?: () => void;
    onClose?: () => void;
    onNextButton?: () => void;
    onPreviousButton?: () => void;
    srcPlatformImg?: string;
    srcSpotlightBaseImg?: string;
    srcSpotlightImg?: string;
    srcTemp?: string;
    visibleBottomborder2?: boolean;
    visibleClaimContainer?: boolean;
}

export const SpecialItemsDisplayLayout = ({ captionClaimTxt, captionSetDesc, captionSetTitle, itemsItemScrollArea, itemsPageList, layout, onClaimBtn, onClose, onNextButton, onPreviousButton, srcPlatformImg, srcSpotlightBaseImg, srcSpotlightImg, srcTemp, visibleBottomborder2, visibleClaimContainer }: SpecialItemsDisplayLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="main"
            name="main"
            params={32769}
            caption={t('special_items.title')}
            tintColor="#2a2a2a"
            onClose={onClose}
            layout={{ width: 420, height: 495, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="background_container"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 462 }}
                >
                    <Region
                        name="bg1"
                        params={2192}
                        backgroundColor="#bfbfbf"
                        layout={{ position: 'absolute', left: 3, width: 414, top: 0, height: 455 }}
                    />
                    <Region
                        name="bg2"
                        params={1168}
                        backgroundColor="#bfbfbf"
                        layout={{ position: 'absolute', left: 4, width: 412, top: 455, height: 2 }}
                    />
                    <Region
                        name="bg3"
                        params={1168}
                        backgroundColor="#bfbfbf"
                        layout={{ position: 'absolute', left: 6, width: 408, top: 457, height: 1 }}
                    />
                </Region>
                <Region
                    name="header"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 107 }}
                >
                    <Border
                        variant="2"
                        params={16}
                        tintColor="#d9d9d9"
                        layout={{ position: 'absolute', left: 13, width: 394, top: 13, height: 94 }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 7, width: 380, top: 7, height: 80 }}
                        >
                            <Region
                                params={16}
                                layout={{ flexDirection: 'column', width: '100%' }}
                            >
                                <Region
                                    name="set_title"
                                    params={16}
                                    layout={{ width: 365, height: 17, flexShrink: 0, maxWidth: 365, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={captionSetTitle ?? t('special_items.wf15.header.title')}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 365, align: 'center' }}
                                    />
                                </Region>
                                <Region
                                    name="set_desc"
                                    params={16}
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
                <Region
                    name="center"
                    params={1168}
                    layout={{ position: 'absolute', left: 0, width: 420, top: 107, height: 220 }}
                >
                    <Region
                        name="item_viewer"
                        params={16}
                        layout={{ position: 'absolute', left: 40, width: 340, top: 0, height: 197 }}
                    >
                        <ThemeImage
                            name="platform_img"
                            params={16}
                            src={srcPlatformImg ?? layoutImage('special_items_item_platform.png')}
                            layout={{ position: 'absolute', left: 8, width: 323, top: 41, height: 155 }}
                        />
                        <ThemeImage
                            name="spotlight_base_img"
                            params={16}
                            src={srcSpotlightBaseImg ?? layoutImage('special_items_spotlight2.png')}
                            layout={{ position: 'absolute', left: 124, width: 91, top: 118, height: 51 }}
                        />
                        <Region
                            name="item_rotation"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 197 }}
                        >
                            <WidgetSlot
                                widgetType="product_image"
                                name="product_display_template"
                                params={272}
                                options={{ pivot_point: 'bottom center' }}
                                layout={{ position: 'absolute', left: 70, width: 200, top: -36, height: 200 }}
                            />
                        </Region>
                        <ThemeImage
                            name="spotlight_img"
                            tags={[ 'BLEND_ADD' ]}
                            params={16}
                            src={srcSpotlightImg ?? layoutImage('special_items_spotlight1.png')}
                            layout={{ position: 'absolute', left: 124, width: 91, top: -100, height: 271 }}
                        />
                    </Region>
                    <Region
                        name="previous_button"
                        params={1}
                        dynamicStyle="brightness_and_shadow_under_gentle"
                        onPointerTap={onPreviousButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 8, width: 33, top: 97, height: 38 }}
                    >
                        <ThemeImage
                            tags={[ '#icon' ]}
                            params={16}
                            src={layoutImage('icons_back.png')}
                            layout={{ position: 'absolute', left: 0, width: 33, top: 4, height: 34 }}
                        />
                    </Region>
                    <Region
                        name="next_button"
                        params={1}
                        dynamicStyle="brightness_and_shadow_under_gentle"
                        onPointerTap={onNextButton}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 379, width: 33, top: 97, height: 38 }}
                    >
                        <ThemeImage
                            tags={[ '#icon' ]}
                            params={16}
                            src={layoutImage('icons_forward.png')}
                            layout={{ position: 'absolute', left: 0, width: 33, top: 4, height: 34 }}
                        />
                    </Region>
                    <Region
                        name="page_container"
                        params={16}
                        layout={{ position: 'absolute', left: 39, width: 342, top: 207, height: 11 }}
                    >
                        <Region
                            name="page_list"
                            params={934096}
                            layout={{ position: 'absolute', left: 149, width: 44, top: 0, height: 11, flexDirection: 'row', gap: 7 }}
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
                </Region>
                <Region
                    name="claim_spacer"
                    params={8388624}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 0 }}
                />
                <Region
                    visible={visibleClaimContainer ?? false}
                    layout={{ position: 'absolute', left: 55, width: 310, top: 115, height: 40 }}
                >
                    <Border
                        variant="2"
                        name="claim_container"
                        params={786640}
                        blend={0.8}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            params={4194320}
                            layout={{ position: 'absolute', left: 16, width: 277, top: 5, height: 30, flexDirection: 'row', gap: 10 }}
                        >
                            <Region
                                name="claim_txt"
                                params={16}
                                layout={{ width: 212, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={captionClaimTxt ?? t('special_items.claim_info')} />
                            </Region>
                            <Button
                                variant="4"
                                name="claim_btn"
                                params={131089}
                                onPointerTap={onClaimBtn}
                                layout={{ width: 55, height: 30, flexShrink: 0 }}
                            >
                                {t('special_items.claim')}
                            </Button>
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="bottom"
                    params={1168}
                    layout={{ position: 'absolute', left: 0, width: 420, top: 327, height: 135 }}
                >
                    <Border
                        variant="2"
                        name="bottomborder_1"
                        params={16}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 13, width: 394, top: 16, height: 110 }}
                    />
                    <Region
                        visible={visibleBottomborder2 ?? false}
                        layout={{ position: 'absolute', left: 13, width: 394, top: 15, height: 110 }}
                    >
                        <Border
                            variant="2"
                            name="bottomborder_2"
                            params={16}
                            tintColor="#141414"
                            layout={{ width: '100%', height: '100%' }}
                        />
                    </Region>
                    <Border
                        variant="2"
                        name="bottomborder_3"
                        params={16}
                        tintColor="#5a5a5a"
                        layout={{ position: 'absolute', left: 13, width: 394, top: 10, height: 110 }}
                    />
                    <Border
                        variant="2"
                        params={16}
                        tintColor="#262626"
                        layout={{ position: 'absolute', left: 13, width: 394, top: 9, height: 110 }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 10, width: 374, top: 7, height: 97 }}
                        >
                            <Region
                                name="item_scroll_area"
                                params={16}
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
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 330, width: 40, top: 9, height: 40 }}
                        >
                            <ThemeImage
                                name="temp"
                                params={262160}
                                src={srcTemp ?? layoutImage('bottom_bar_wired_menu.png')}
                                layout={{ position: 'absolute', left: 330, width: 40, top: 9, height: 40 }}
                            />
                        </Region>
                        <WidgetSlot
                            widgetType="product_icon"
                            name="product_icon"
                            params={48}
                            layout={{ position: 'absolute', left: 330, width: 40, top: 9, height: 40 }}
                        />
                    </Border>
                </Region>
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
            params={17}
            onPointerTap={onPageTemplate}
            cursor="pointer"
            layout={{ width: 10, height: 11, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="page_image"
                params={16}
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
            params={17}
            onPointerTap={onPageTemplate}
            cursor="pointer"
            layout={{ width: 10, height: 11, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="page_image"
                params={16}
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
            params={17}
            onPointerTap={onPageTemplate}
            cursor="pointer"
            layout={{ width: 10, height: 11, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="page_image"
                params={16}
                src={srcPageImage ?? layoutImage('progress_disk_etched_off.png')}
                layout={{ position: 'absolute', left: 0, width: 10, top: 0, height: 11 }}
            />
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
            params={16}
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
            params={16}
            layout={{ width: 300, height: 57, flexShrink: 0, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionItemDesc ?? t('special_items.wf15.body.wf15_act.desc')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};
