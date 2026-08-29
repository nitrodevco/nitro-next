import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1662_special_items_display_xml` (layout "special_items_display", 420x495) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpecialItemsDisplayLayoutProps {
    backgroundContainer?: SpecialItemsDisplayLayoutBackgroundContainerProps;
    bottom?: SpecialItemsDisplayLayoutBottomProps;
    captionClaimTxt?: string;
    center?: SpecialItemsDisplayLayoutCenterProps;
    claimSpacer?: SpecialItemsDisplayLayoutClaimSpacerProps;
    header?: SpecialItemsDisplayLayoutHeaderProps;
    layout?: BoxLayout;
    onClaimBtn?: () => void;
    onClose?: () => void;
    visibleClaimContainer?: boolean;
}

export const SpecialItemsDisplayLayout = ({ backgroundContainer, bottom, captionClaimTxt, center, claimSpacer, header, layout, onClaimBtn, onClose, visibleClaimContainer }: SpecialItemsDisplayLayoutProps) => {
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
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <SpecialItemsDisplayLayoutBackgroundContainer {...backgroundContainer} />
                <SpecialItemsDisplayLayoutHeader {...header} />
                <SpecialItemsDisplayLayoutCenter {...center} />
                <SpecialItemsDisplayLayoutClaimSpacer {...claimSpacer} />
                <Region
                    visible={visibleClaimContainer ?? false}
                    layout={{ position: 'absolute', width: 310, top: 115, height: 40 }}
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
                <SpecialItemsDisplayLayoutBottom {...bottom} />
            </Region>
        </Frame>
    );
};

/** Named region `bg1` of SpecialItemsDisplayLayout - configured through the parent's `bg1` prop. */
export interface SpecialItemsDisplayLayoutBg1Props {
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutBg1 = ({ layout }: SpecialItemsDisplayLayoutBg1Props) => {
    return (
        <Region
            name="bg1"
            params={2192}
            backgroundColor="#bfbfbf"
            layout={{ position: 'absolute', left: 3, right: 3, top: 0, bottom: 7, ...layout }}
        />
    );
};

/** Named region `bg2` of SpecialItemsDisplayLayout - configured through the parent's `bg2` prop. */
export interface SpecialItemsDisplayLayoutBg2Props {
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutBg2 = ({ layout }: SpecialItemsDisplayLayoutBg2Props) => {
    return (
        <Region
            name="bg2"
            params={1168}
            backgroundColor="#bfbfbf"
            layout={{ position: 'absolute', left: 4, right: 4, bottom: 5, height: 2, ...layout }}
        />
    );
};

/** Named region `bg3` of SpecialItemsDisplayLayout - configured through the parent's `bg3` prop. */
export interface SpecialItemsDisplayLayoutBg3Props {
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutBg3 = ({ layout }: SpecialItemsDisplayLayoutBg3Props) => {
    return (
        <Region
            name="bg3"
            params={1168}
            backgroundColor="#bfbfbf"
            layout={{ position: 'absolute', left: 6, right: 6, bottom: 4, height: 1, ...layout }}
        />
    );
};

/** Named region `background_container` of SpecialItemsDisplayLayout - configured through the parent's `backgroundContainer` prop. */
export interface SpecialItemsDisplayLayoutBackgroundContainerProps {
    bg1?: SpecialItemsDisplayLayoutBg1Props;
    bg2?: SpecialItemsDisplayLayoutBg2Props;
    bg3?: SpecialItemsDisplayLayoutBg3Props;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutBackgroundContainer = ({ bg1, bg2, bg3, layout }: SpecialItemsDisplayLayoutBackgroundContainerProps) => {
    return (
        <Region
            name="background_container"
            params={2192}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 33, ...layout }}
        >
            <SpecialItemsDisplayLayoutBg1 {...bg1} />
            <SpecialItemsDisplayLayoutBg2 {...bg2} />
            <SpecialItemsDisplayLayoutBg3 {...bg3} />
        </Region>
    );
};

/** Named region `header` of SpecialItemsDisplayLayout - configured through the parent's `header` prop. */
export interface SpecialItemsDisplayLayoutHeaderProps {
    captionSetDesc?: string;
    captionSetTitle?: string;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutHeader = ({ captionSetDesc, captionSetTitle, layout }: SpecialItemsDisplayLayoutHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            params={144}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 107, ...layout }}
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
    );
};

/** Named region `item_rotation` of SpecialItemsDisplayLayout - configured through the parent's `itemRotation` prop. */
export interface SpecialItemsDisplayLayoutItemRotationProps {
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutItemRotation = ({ layout }: SpecialItemsDisplayLayoutItemRotationProps) => {
    return (
        <Region
            name="item_rotation"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 197, ...layout }}
        >
            <WidgetSlot
                widgetType="product_image"
                name="product_display_template"
                params={272}
                options={{ pivot_point: 'bottom center' }}
                layout={{ position: 'absolute', left: 70, width: 200, top: -36, height: 200 }}
            />
        </Region>
    );
};

/** Named region `item_viewer` of SpecialItemsDisplayLayout - configured through the parent's `itemViewer` prop. */
export interface SpecialItemsDisplayLayoutItemViewerProps {
    itemRotation?: SpecialItemsDisplayLayoutItemRotationProps;
    layout?: BoxLayout;
    srcPlatformImg?: string;
    srcSpotlightBaseImg?: string;
    srcSpotlightImg?: string;
}

export const SpecialItemsDisplayLayoutItemViewer = ({ itemRotation, layout, srcPlatformImg, srcSpotlightBaseImg, srcSpotlightImg }: SpecialItemsDisplayLayoutItemViewerProps) => {
    return (
        <Region
            name="item_viewer"
            params={16}
            layout={{ position: 'absolute', left: 40, width: 340, top: 0, height: 197, ...layout }}
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
            <SpecialItemsDisplayLayoutItemRotation {...itemRotation} />
            <ThemeImage
                name="spotlight_img"
                tags={[ 'BLEND_ADD' ]}
                params={16}
                src={srcSpotlightImg ?? layoutImage('special_items_spotlight1.png')}
                layout={{ position: 'absolute', left: 124, width: 91, top: -100, height: 271 }}
            />
        </Region>
    );
};

/** Named region `previous_button` of SpecialItemsDisplayLayout - configured through the parent's `previousButton` prop. */
export interface SpecialItemsDisplayLayoutPreviousButtonProps {
    layout?: BoxLayout;
    onPreviousButton?: () => void;
}

export const SpecialItemsDisplayLayoutPreviousButton = ({ layout, onPreviousButton }: SpecialItemsDisplayLayoutPreviousButtonProps) => {
    return (
        <Region
            name="previous_button"
            params={1}
            dynamicStyle="brightness_and_shadow_under_gentle"
            onPointerTap={onPreviousButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 8, width: 33, top: 97, height: 38, ...layout }}
        >
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('icons_back.png')}
                layout={{ position: 'absolute', left: 0, width: 33, top: 4, height: 34 }}
            />
        </Region>
    );
};

/** Named region `next_button` of SpecialItemsDisplayLayout - configured through the parent's `nextButton` prop. */
export interface SpecialItemsDisplayLayoutNextButtonProps {
    layout?: BoxLayout;
    onNextButton?: () => void;
}

export const SpecialItemsDisplayLayoutNextButton = ({ layout, onNextButton }: SpecialItemsDisplayLayoutNextButtonProps) => {
    return (
        <Region
            name="next_button"
            params={1}
            dynamicStyle="brightness_and_shadow_under_gentle"
            onPointerTap={onNextButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 379, width: 33, top: 97, height: 38, ...layout }}
        >
            <ThemeImage
                tags={[ '#icon' ]}
                params={16}
                src={layoutImage('icons_forward.png')}
                layout={{ position: 'absolute', left: 0, width: 33, top: 4, height: 34 }}
            />
        </Region>
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

/** Named region `page_list` of SpecialItemsDisplayLayout - configured through the parent's `pageList` prop. */
export interface SpecialItemsDisplayLayoutPageListProps {
    itemsPageList?: ReactNode;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutPageList = ({ itemsPageList, layout }: SpecialItemsDisplayLayoutPageListProps) => {
    return (
        <Region
            name="page_list"
            params={934096}
            layout={{ position: 'absolute', top: 0, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsPageList ?? (
                <>
                    <SpecialItemsDisplayLayoutPageTemplateItem />
                    <SpecialItemsDisplayLayoutPageTemplateItem2 />
                    <SpecialItemsDisplayLayoutPageTemplateItem3 />
                </>
            )}
        </Region>
    );
};

/** Named region `page_container` of SpecialItemsDisplayLayout - configured through the parent's `pageContainer` prop. */
export interface SpecialItemsDisplayLayoutPageContainerProps {
    layout?: BoxLayout;
    pageList?: SpecialItemsDisplayLayoutPageListProps;
}

export const SpecialItemsDisplayLayoutPageContainer = ({ layout, pageList }: SpecialItemsDisplayLayoutPageContainerProps) => {
    return (
        <Region
            name="page_container"
            params={16}
            layout={{ position: 'absolute', left: 39, width: 342, top: 207, height: 11, justifyContent: 'center', ...layout }}
        >
            <SpecialItemsDisplayLayoutPageList {...pageList} />
        </Region>
    );
};

/** Named region `center` of SpecialItemsDisplayLayout - configured through the parent's `center` prop. */
export interface SpecialItemsDisplayLayoutCenterProps {
    itemViewer?: SpecialItemsDisplayLayoutItemViewerProps;
    layout?: BoxLayout;
    nextButton?: SpecialItemsDisplayLayoutNextButtonProps;
    pageContainer?: SpecialItemsDisplayLayoutPageContainerProps;
    previousButton?: SpecialItemsDisplayLayoutPreviousButtonProps;
}

export const SpecialItemsDisplayLayoutCenter = ({ itemViewer, layout, nextButton, pageContainer, previousButton }: SpecialItemsDisplayLayoutCenterProps) => {
    return (
        <Region
            name="center"
            params={1168}
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 168, height: 220, ...layout }}
        >
            <SpecialItemsDisplayLayoutItemViewer {...itemViewer} />
            <SpecialItemsDisplayLayoutPreviousButton {...previousButton} />
            <SpecialItemsDisplayLayoutNextButton {...nextButton} />
            <SpecialItemsDisplayLayoutPageContainer {...pageContainer} />
        </Region>
    );
};

/** Named region `claim_spacer` of SpecialItemsDisplayLayout - configured through the parent's `claimSpacer` prop. */
export interface SpecialItemsDisplayLayoutClaimSpacerProps {
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutClaimSpacer = ({ layout }: SpecialItemsDisplayLayoutClaimSpacerProps) => {
    return (
        <Region
            name="claim_spacer"
            params={8388624}
            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 0, ...layout }}
        />
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

/** Named region `item_scroll_area` of SpecialItemsDisplayLayout - configured through the parent's `itemScrollArea` prop. */
export interface SpecialItemsDisplayLayoutItemScrollAreaProps {
    itemsItemScrollArea?: ReactNode;
    layout?: BoxLayout;
}

export const SpecialItemsDisplayLayoutItemScrollArea = ({ itemsItemScrollArea, layout }: SpecialItemsDisplayLayoutItemScrollAreaProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 10, width: 374, top: 7, height: 97, ...layout }}
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
    );
};

/** Named region `bottom` of SpecialItemsDisplayLayout - configured through the parent's `bottom` prop. */
export interface SpecialItemsDisplayLayoutBottomProps {
    itemScrollArea?: SpecialItemsDisplayLayoutItemScrollAreaProps;
    layout?: BoxLayout;
    srcTemp?: string;
    visibleBottomborder2?: boolean;
}

export const SpecialItemsDisplayLayoutBottom = ({ itemScrollArea, layout, srcTemp, visibleBottomborder2 }: SpecialItemsDisplayLayoutBottomProps) => {
    return (
        <Region
            name="bottom"
            params={1168}
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 33, height: 135, ...layout }}
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
                <SpecialItemsDisplayLayoutItemScrollArea {...itemScrollArea} />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', right: 24, width: 40, top: 9, height: 40 }}
                >
                    <ThemeImage
                        name="temp"
                        params={262160}
                        src={srcTemp ?? layoutImage('bottom_bar_wired_menu.png')}
                        layout={{ position: 'absolute', right: 24, width: 40, top: 9, height: 40 }}
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
    );
};
