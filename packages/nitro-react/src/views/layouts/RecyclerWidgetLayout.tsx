import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1583_recyclerWidget_xml` (layout "recyclerWidget", 360x208) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RecyclerWidgetLayoutProps {
    layout?: BoxLayout;
    onPatFrankBtn?: () => void;
    onRecyclerRecycle?: () => void;
}

export const RecyclerWidgetLayout = ({ layout, onPatFrankBtn, onRecyclerRecycle }: RecyclerWidgetLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 208 }}
                >
                    <Region
                        params={786448}
                        layout={{ position: 'absolute', left: 19, width: 42, top: 7, height: 30, flexDirection: 'row' }}
                    >
                        <Region
                            name="ducket_cost"
                            params={16}
                            layout={{ width: 17, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="50" />
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
                            visible={false}
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
                        layout={{ position: 'absolute', left: 16, width: 185, top: 85, height: 156 }}
                    >
                        <Region
                            name="layout"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 115 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('recycler_furnimatic_container_left.png')}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 115 }}
                            />
                            <ThemeImage
                                params={144}
                                src={layoutImage('recycler_furnimatic_container_slice.png')}
                                layout={{ position: 'absolute', left: 15, width: 158, top: 0, height: 115 }}
                            />
                            <ThemeImage
                                params={80}
                                src={layoutImage('recycler_furnimatic_container_right.png')}
                                layout={{ position: 'absolute', left: 172, width: 13, top: 0, height: 115 }}
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
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_2"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_3"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_4"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_1"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_2"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_3"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_4"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 0, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_5"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_6"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_7"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_8"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_5"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_6"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_7"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_8"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 44, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_9"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_10"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_11"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_bg_12"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_9"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 0, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_10"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 37, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_11"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 74, width: 34, top: 90, height: 34 }}
                            />
                            <ThemeImage
                                name="slot_img_12"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 111, width: 34, top: 90, height: 34 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="indicator_wrapper"
                        params={1168}
                        layout={{ position: 'absolute', left: 214, width: 123, top: 85, height: 115, minWidth: 123, maxWidth: 123, minHeight: 115, maxHeight: 115 }}
                    >
                        <Region
                            name="layout"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 123, top: 0, height: 115 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('recycler_furnimatic_container_left.png')}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 115 }}
                            />
                            <ThemeImage
                                params={144}
                                src={layoutImage('recycler_furnimatic_container_slice.png')}
                                layout={{ position: 'absolute', left: 15, width: 96, top: 0, height: 115 }}
                            />
                            <ThemeImage
                                params={80}
                                src={layoutImage('recycler_furnimatic_container_right.png')}
                                layout={{ position: 'absolute', left: 110, width: 13, top: 0, height: 115 }}
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
                                src={layoutImage('recycler_furnimatic_indicator.png')}
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
                                    src={layoutImage('recycler_furnimatic_indicator_pointer_arrow.png')}
                                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                />
                                <ThemeImage
                                    name="pointer_base"
                                    params={16}
                                    src={layoutImage('recycler_furnimatic_indicator_pointer_base.png')}
                                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                />
                            </Region>
                            <Region
                                name="abort_region"
                                params={934097}
                                visible={false}
                                layout={{ position: 'absolute', left: 29, width: 65, top: 91, height: 17, minHeight: 17, maxHeight: 17 }}
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
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 208 }}
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
                            layout={{ position: 'absolute', left: 235, width: 118, top: 99, height: 176 }}
                        />
                        <Bubble
                            variant="7"
                            params={1025}
                            pointer="right"
                            layout={{ position: 'absolute', left: 107, width: 155, top: 98, height: 81 }}
                        >
                            <Region
                                params={8388624}
                                layout={{ position: 'absolute', left: 4, width: 107, top: 4, height: 57, minWidth: 107, maxWidth: 107, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('recycler.broken')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 107 }}
                                />
                            </Region>
                            <ThemeImage
                                name="emoji_1"
                                params={16}
                                src={layoutImage('franks_emotions_sad.png')}
                                layout={{ position: 'absolute', left: 115, width: 20, top: 5, height: 20 }}
                            />
                        </Bubble>
                        <Button
                            variant="3"
                            name="pat_frank_btn"
                            params={393233}
                            onPointerTap={onPatFrankBtn}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', left: 235, width: 115, top: 11, height: 30 }}
                        >
                            {t('recycler.pat_frank')}
                        </Button>
                        <ThemeImage
                            name="emoji_2_template"
                            params={1040}
                            src={layoutImage('franks_emotions_heart.png')}
                            layout={{ position: 'absolute', left: 32, width: 40, top: 210, height: 40 }}
                        />
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};
