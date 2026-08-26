import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `39_bonus_rare_promo_xml` (layout "bonus_rare_promo", 602x75) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BonusRarePromoLayoutProps {
    layout?: BoxLayout;
    onBuyButton?: () => void;
}

export const BonusRarePromoLayout = ({ layout, onBuyButton }: BonusRarePromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 602, height: 75, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 602, top: 0, height: 75 }}
            >
                <Border
                    variant="105"
                    params={4194320}
                    blend={0.2}
                    layout={{ position: 'absolute', left: 1, width: 600, top: 5, height: 63 }}
                >
                    <Region
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, width: 600, top: 0, height: 63, flexDirection: 'row' }}
                    >
                        <Region
                            name="teaser_image_container"
                            params={16}
                            layout={{ width: 96, height: 63, flexShrink: 0 }}
                        >
                            <Region
                                visible={false}
                                layout={{ position: 'absolute', left: 27, width: 44, top: 12, height: 38 }}
                            >
                                <ThemeImage
                                    name="preview"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 27, width: 44, top: 12, height: 38 }}
                                />
                            </Region>
                            <ThemeImage
                                name="promo_image"
                                src={undefined}
                                layout={{ position: 'absolute', left: 8, width: 80, top: -9, height: 80 }}
                            />
                        </Region>
                        <Region
                            name="mid_container"
                            params={147472}
                            layout={{ width: 304, height: 53, flexShrink: 0 }}
                        >
                            <Region
                                name="header"
                                tags={[ 'COLORABLE' ]}
                                params={786640}
                                layout={{ position: 'absolute', left: 29, width: 246, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('landing.view.bonus.rare.header')}
                                    textStyle="text-style-u-headline-medium"
                                />
                            </Region>
                            <Region
                                name="progress_bar_cont"
                                params={786512}
                                layout={{ position: 'absolute', left: 2, width: 302, top: 30, height: 23 }}
                            >
                                <ThemeImage
                                    name="bar_l"
                                    params={16}
                                    src={layoutImage('achievement_ach_progressbar1.png')}
                                    layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 23 }}
                                />
                                <ThemeImage
                                    name="bar_c"
                                    params={144}
                                    src={layoutImage('achievement_ach_progressbar2.png')}
                                    layout={{ position: 'absolute', left: 4, width: 291, top: 0, height: 23 }}
                                />
                                <ThemeImage
                                    name="bar_r"
                                    params={262224}
                                    src={layoutImage('achievement_ach_progressbar3.png')}
                                    layout={{ position: 'absolute', left: 295, width: 4, top: 0, height: 23 }}
                                />
                                <Region
                                    name="bar_a_bkg"
                                    params={144}
                                    visible={false}
                                    backgroundColor="#ffff00"
                                    layout={{ position: 'absolute', left: 4, width: 292, top: 3, height: 17 }}
                                />
                                <ThemeImage
                                    name="bar_a_c"
                                    params={16}
                                    src={layoutImage('achievement_ach_progressbar4.png')}
                                    layout={{ position: 'absolute', left: 4, width: 142, top: 3, height: 17 }}
                                />
                                <ThemeImage
                                    name="bar_a_r"
                                    params={16}
                                    src={layoutImage('achievement_ach_progressbar5.png')}
                                    layout={{ position: 'absolute', left: 145, width: 2, top: 3, height: 17 }}
                                />
                                <Region
                                    name="status"
                                    params={786513}
                                    layout={{ position: 'absolute', left: 56, width: 178, top: 3, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={t('landing.view.bonus.rare.status')}
                                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 178 }}
                                    />
                                </Region>
                            </Region>
                        </Region>
                        <Region
                            name="button_container"
                            params={147472}
                            layout={{ width: 200, height: 56, flexShrink: 0 }}
                        >
                            <Button
                                variant="100"
                                name="buy_button"
                                params={131153}
                                onPointerTap={onBuyButton}
                                layout={{ position: 'absolute', left: 0, width: 200, top: 5, height: 51, maxWidth: 200 }}
                            >
                                {t('landing.view.bonus.rare.open.credits.page')}
                            </Button>
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
