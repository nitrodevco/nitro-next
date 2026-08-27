import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1583_recyclerWidget_xml` (layout "recyclerWidget", 360x208) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RecyclerWidgetLayoutProps {
    captionDucketCost?: string;
    layout?: BoxLayout;
    onAbortRegion?: () => void;
    onPatFrankBtn?: () => void;
    onRecyclerRecycle?: () => void;
    srcEmoji1?: string;
    srcEmoji2Template?: string;
    srcIndicator?: string;
    srcPointerArrow?: string;
    srcPointerBase?: string;
    srcSlotBg1?: string;
    srcSlotBg10?: string;
    srcSlotBg11?: string;
    srcSlotBg12?: string;
    srcSlotBg2?: string;
    srcSlotBg3?: string;
    srcSlotBg4?: string;
    srcSlotBg5?: string;
    srcSlotBg6?: string;
    srcSlotBg7?: string;
    srcSlotBg8?: string;
    srcSlotBg9?: string;
    srcSlotImg1?: string;
    srcSlotImg10?: string;
    srcSlotImg11?: string;
    srcSlotImg12?: string;
    srcSlotImg2?: string;
    srcSlotImg3?: string;
    srcSlotImg4?: string;
    srcSlotImg5?: string;
    srcSlotImg6?: string;
    srcSlotImg7?: string;
    srcSlotImg8?: string;
    srcSlotImg9?: string;
    visibleAbortRegion?: boolean;
    visibleDisabledBorder?: boolean;
    visibleSpacer?: boolean;
}

export const RecyclerWidgetLayout = ({ captionDucketCost, layout, onAbortRegion, onPatFrankBtn, onRecyclerRecycle, srcEmoji1, srcEmoji2Template, srcIndicator, srcPointerArrow, srcPointerBase, srcSlotBg1, srcSlotBg10, srcSlotBg11, srcSlotBg12, srcSlotBg2, srcSlotBg3, srcSlotBg4, srcSlotBg5, srcSlotBg6, srcSlotBg7, srcSlotBg8, srcSlotBg9, srcSlotImg1, srcSlotImg10, srcSlotImg11, srcSlotImg12, srcSlotImg2, srcSlotImg3, srcSlotImg4, srcSlotImg5, srcSlotImg6, srcSlotImg7, srcSlotImg8, srcSlotImg9, visibleAbortRegion, visibleDisabledBorder, visibleSpacer }: RecyclerWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 208, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 208 }}
            >
                <Region
                    name="normal"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Region
                        params={786448}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -161, width: 42, top: 7, height: 30, flexDirection: 'row' }}
                    >
                        <Region
                            name="ducket_cost"
                            params={16}
                            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionDucketCost ?? '50'} />
                        </Region>
                        <Region
                            name="spacer"
                            params={16}
                            layout={{ width: 2, height: 30, flexShrink: 0 }}
                        />
                        <Icon
                            variant="32"
                            name="ducket_icon"
                            params={16}
                            layout={{ width: 23, height: 21, flexShrink: 0 }}
                        />
                        <Region
                            name="spacer"
                            params={16}
                            visible={visibleSpacer ?? false}
                            layout={{ width: 10, height: 30, flexShrink: 0 }}
                        />
                    </Region>
                    <Button
                        variant="6"
                        name="recycler_recycle"
                        params={131089}
                        tintColor="#00aa00"
                        onPointerTap={onRecyclerRecycle}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 19, width: 194, top: 41, height: 30 }}
                    >
                        {t('catalog.recycler.button.recycle')}
                    </Button>
                    <Region
                        name="slots_wrapper"
                        params={1168}
                        layout={{ position: 'absolute', left: 16, right: 159, bottom: -33, height: 156 }}
                    >
                        <Region
                            name="layout"
                            params={144}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 115 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('recycler_furnimatic_container_left.png')}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 115 }}
                            />
                            <ThemeImage
                                params={144}
                                src={layoutImage('recycler_furnimatic_container_slice.png')}
                                layout={{ position: 'absolute', left: 15, right: 12, top: 0, height: 115 }}
                            />
                            <ThemeImage
                                params={80}
                                src={layoutImage('recycler_furnimatic_container_right.png')}
                                layout={{ position: 'absolute', right: 0, width: 13, top: 0, height: 115 }}
                            />
                        </Region>
                        <Region
                            name="slots"
                            params={16}
                            layout={{ position: 'absolute', left: 21, width: 145, top: 16, height: 124 }}
                        >
                            <ThemeImage
                                name="slot_bg_1"
                                params={17}
                                src={srcSlotBg1}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_2"
                                params={17}
                                src={srcSlotBg2}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_3"
                                params={17}
                                src={srcSlotBg3}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_4"
                                params={17}
                                src={srcSlotBg4}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_1"
                                params={17}
                                src={srcSlotImg1}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_2"
                                params={17}
                                src={srcSlotImg2}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_3"
                                params={17}
                                src={srcSlotImg3}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_4"
                                params={17}
                                src={srcSlotImg4}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_5"
                                params={17}
                                src={srcSlotBg5}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_6"
                                params={17}
                                src={srcSlotBg6}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_7"
                                params={17}
                                src={srcSlotBg7}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_8"
                                params={17}
                                src={srcSlotBg8}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_5"
                                params={17}
                                src={srcSlotImg5}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_6"
                                params={17}
                                src={srcSlotImg6}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_7"
                                params={17}
                                src={srcSlotImg7}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_8"
                                params={17}
                                src={srcSlotImg8}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_9"
                                params={17}
                                src={srcSlotBg9}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_10"
                                params={17}
                                src={srcSlotBg10}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_11"
                                params={17}
                                src={srcSlotBg11}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_12"
                                params={17}
                                src={srcSlotBg12}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_9"
                                params={17}
                                src={srcSlotImg9}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_10"
                                params={17}
                                src={srcSlotImg10}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_11"
                                params={17}
                                src={srcSlotImg11}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_12"
                                params={17}
                                src={srcSlotImg12}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 90, height: 34 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="indicator_wrapper"
                        params={1168}
                        layout={{ position: 'absolute', left: 214, right: 23, bottom: 8, height: 115, minWidth: 123, maxWidth: 123, minHeight: 115, maxHeight: 115 }}
                    >
                        <Region
                            name="layout"
                            params={144}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 115 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('recycler_furnimatic_container_left.png')}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 115 }}
                            />
                            <ThemeImage
                                params={144}
                                src={layoutImage('recycler_furnimatic_container_slice.png')}
                                layout={{ position: 'absolute', left: 15, right: 12, top: 0, height: 115 }}
                            />
                            <ThemeImage
                                params={80}
                                src={layoutImage('recycler_furnimatic_container_right.png')}
                                layout={{ position: 'absolute', right: 0, width: 13, top: 0, height: 115 }}
                            />
                        </Region>
                        <Region
                            name="indicator"
                            params={16}
                            layout={{ position: 'absolute', left: 1, width: 123, top: 0, height: 115 }}
                        >
                            <ThemeImage
                                name="indicator"
                                params={16}
                                src={srcIndicator ?? layoutImage('recycler_furnimatic_indicator.png')}
                                layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 115 }}
                            />
                            <Region
                                name="indicator_pointer"
                                params={16}
                                layout={{ position: 'absolute', left: 37, width: 50, top: 43, height: 50 }}
                            >
                                <ThemeImage
                                    name="pointer_arrow"
                                    params={16}
                                    src={srcPointerArrow ?? layoutImage('recycler_furnimatic_indicator_pointer_arrow.png')}
                                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                />
                                <ThemeImage
                                    name="pointer_base"
                                    params={16}
                                    src={srcPointerBase ?? layoutImage('recycler_furnimatic_indicator_pointer_base.png')}
                                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                />
                            </Region>
                            <Region
                                name="abort_region"
                                params={934097}
                                visible={visibleAbortRegion ?? false}
                                onPointerTap={onAbortRegion}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: '50%', marginLeft: -32.5, width: 65, top: 91, height: 17, minHeight: 17, maxHeight: 17 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 65, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('catalog.recycler.button.abort')} />
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                </Region>
                <Region
                    visible={visibleDisabledBorder ?? false}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Border
                        variant="3"
                        name="disabled_border"
                        params={2192}
                        tintColor="#888888"
                        blend={0.7}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <ThemeImage
                            params={1040}
                            src={layoutImage('image_frank_dont_know.png')}
                            layout={{ position: 'absolute', left: 235, width: 118, bottom: -67, height: 176 }}
                        />
                        <Bubble
                            variant="7"
                            params={1025}
                            pointer="right"
                            layout={{ position: 'absolute', left: 107, width: 155, bottom: 29, height: 81 }}
                        >
                            <Region
                                params={8388624}
                                layout={{ position: 'absolute', left: 4, width: 107, top: 4, minWidth: 107, maxWidth: 107, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('recycler.broken')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 107 }}
                                />
                            </Region>
                            <ThemeImage
                                name="emoji_1"
                                params={16}
                                src={srcEmoji1 ?? layoutImage('franks_emotions_sad.png')}
                                layout={{ position: 'absolute', left: 115, width: 20, top: 5, height: 20 }}
                            />
                        </Bubble>
                        <Button
                            variant="3"
                            name="pat_frank_btn"
                            params={393233}
                            onPointerTap={onPatFrankBtn}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', right: 10, width: 115, top: 11, height: 30 }}
                        >
                            {t('recycler.pat_frank')}
                        </Button>
                        <ThemeImage
                            name="emoji_2_template"
                            params={1040}
                            src={srcEmoji2Template ?? layoutImage('franks_emotions_heart.png')}
                            layout={{ position: 'absolute', left: 32, width: 40, bottom: -42, height: 40 }}
                        />
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};
