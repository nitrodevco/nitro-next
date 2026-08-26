import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `60_habbo_way_promo_xml` (layout "landing_view", 500x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWayPromoLayoutProps {
    layout?: BoxLayout;
    onGoButton?: () => void;
}

export const HabboWayPromoLayout = ({ layout, onGoButton }: HabboWayPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 245, ...layout }}>
            <Region
                params={147472}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 245 }}
            >
                <Region
                    name="col1"
                    params={16}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 245 }}
                >
                    <ThemeImage
                        name="teaser_image"
                        params={16}
                        src="${image.library.url}reception/reception_widget_habboway.png"
                        layout={{ position: 'absolute', left: 0, width: 198, top: 0, height: 158 }}
                    />
                    <ThemeImage
                        name="counter_bg"
                        params={16}
                        src="${image.library.url}reception/reception_counter_bg.png"
                        layout={{ position: 'absolute', left: 35, width: 137, top: 178, height: 23 }}
                    />
                    <Region
                        name="counter_info_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 6, width: 201, top: 210, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('landing.view.habbowaypromo.counterinfo')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 201, align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="counter_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 38, width: 140, top: 180, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="00000000"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 230, width: 270, top: 0, height: 190, flexDirection: 'column' }}
                >
                    <Region
                        name="caption_txt"
                        params={16}
                        layout={{ width: 307, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.habbowaypromo.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <Region
                        name="spacing"
                        params={16}
                        backgroundColor="#000000"
                        layout={{ width: 250, height: 6, flexShrink: 0 }}
                    />
                    <Region
                        name="info_txt"
                        params={16}
                        layout={{ width: 270, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.habbowaypromo.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="go_button"
                        params={131089}
                        onPointerTap={onGoButton}
                        layout={{ width: 220, height: 50, flexShrink: 0 }}
                    >
                        {t('landing.view.habbowaypromo.doit')}
                    </Button>
                    <Region
                        name="ps_title_txt"
                        params={16}
                        layout={{ width: 270, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.habbowaypromo.ps.title')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Border
                        variant="100"
                        params={16}
                        layout={{ width: 270, height: 79, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="counter_bg"
                            params={16}
                            src="${image.library.url}album1584/ACH_HabboWayGraduate1.png"
                            layout={{ position: 'absolute', left: 16, width: 38, top: 17, height: 38 }}
                        />
                        <Region
                            name="info_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 63, width: 201, top: 15, height: 60, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('landing.view.habbowaypromo.ps.info')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 201 }}
                            />
                        </Region>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};
