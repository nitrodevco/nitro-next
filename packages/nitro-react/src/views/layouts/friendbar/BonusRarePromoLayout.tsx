import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `39_bonus_rare_promo_xml` (layout "bonus_rare_promo", 602x75) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BonusRarePromoLayoutProps {
    layout?: BoxLayout;
    midContainer?: BonusRarePromoLayoutMidContainerProps;
    onBuyButton?: () => void;
    srcPreview?: string;
    srcPromoImage?: string;
    visiblePreview?: boolean;
}

export const BonusRarePromoLayout = ({ layout, midContainer, onBuyButton, srcPreview, srcPromoImage, visiblePreview }: BonusRarePromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 602, height: 75, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 602, top: 0, height: 75 }}>
                <Border
                    variant="105"
                    blend={0.2}
                    layout={{ position: 'absolute', left: 1, width: 600, top: 5, height: 63 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 600, top: 0, height: 63, flexDirection: 'row' }}>
                        <Region
                            name="teaser_image_container"
                            layout={{ width: 96, height: 63, flexShrink: 0 }}
                        >
                            {(visiblePreview ?? false) && (
                                <ThemeImage
                                    name="preview"
                                    src={srcPreview}
                                    layout={{ position: 'absolute', left: 27, width: 44, top: 12, height: 38 }}
                                />
                            )}
                            <ThemeImage
                                name="promo_image"
                                src={srcPromoImage}
                                layout={{ position: 'absolute', left: 8, width: 80, top: -9, height: 80 }}
                            />
                        </Region>
                        <BonusRarePromoLayoutMidContainer {...midContainer} />
                        <Region
                            name="button_container"
                            layout={{ width: 200, height: 56, flexShrink: 0 }}
                        >
                            <Button
                                variant="100"
                                name="buy_button"
                                onPointerTap={onBuyButton}
                                layout={{ position: 'absolute', right: 0, width: 200, top: 5, height: 51, maxWidth: 200 }}
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

/** Named region `progress_bar_cont` of BonusRarePromoLayout - configured through the parent's `progressBarCont` prop. */
export interface BonusRarePromoLayoutProgressBarContProps {
    captionStatus?: string;
    layout?: BoxLayout;
    srcBarAC?: string;
    srcBarAR?: string;
    srcBarC?: string;
    srcBarL?: string;
    srcBarR?: string;
    visibleBarABkg?: boolean;
}

export const BonusRarePromoLayoutProgressBarCont = ({ captionStatus, layout, srcBarAC, srcBarAR, srcBarC, srcBarL, srcBarR, visibleBarABkg }: BonusRarePromoLayoutProgressBarContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_bar_cont"
            layout={{ position: 'absolute', right: 0, width: 302, top: 30, height: 23, ...layout }}
        >
            <ThemeImage
                name="bar_l"
                src={srcBarL ?? layoutImage('achievement_ach_progressbar1.png')}
                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 23 }}
            />
            <ThemeImage
                name="bar_c"
                src={srcBarC ?? layoutImage('achievement_ach_progressbar2.png')}
                layout={{ position: 'absolute', left: 4, right: 7, top: 0, height: 23 }}
            />
            <ThemeImage
                name="bar_r"
                src={srcBarR ?? layoutImage('achievement_ach_progressbar3.png')}
                layout={{ position: 'absolute', right: 3, width: 4, top: 0, height: 23 }}
            />
            {(visibleBarABkg ?? false) && (
                <Region
                    name="bar_a_bkg"
                    backgroundColor="#ffff00"
                    layout={{ position: 'absolute', left: 4, right: 6, top: 3, height: 17 }}
                />
            )}
            <ThemeImage
                name="bar_a_c"
                src={srcBarAC ?? layoutImage('achievement_ach_progressbar4.png')}
                layout={{ position: 'absolute', left: 4, width: 142, top: 3, height: 17 }}
            />
            <ThemeImage
                name="bar_a_r"
                src={srcBarAR ?? layoutImage('achievement_ach_progressbar5.png')}
                layout={{ position: 'absolute', left: 145, width: 2, top: 3, height: 17 }}
            />
            <Region
                name="status"
                layout={{ position: 'absolute', right: 68, width: 178, top: 3, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionStatus ?? t('landing.view.bonus.rare.status')}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 178 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `mid_container` of BonusRarePromoLayout - configured through the parent's `midContainer` prop. */
export interface BonusRarePromoLayoutMidContainerProps {
    captionHeader?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    progressBarCont?: BonusRarePromoLayoutProgressBarContProps;
}

export const BonusRarePromoLayoutMidContainer = ({ captionHeader, colorableTextColor, layout, progressBarCont }: BonusRarePromoLayoutMidContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mid_container"
            layout={{ width: 304, height: 53, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="header"
                layout={{ position: 'absolute', width: 246, top: 5, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeader ?? t('landing.view.bonus.rare.header')}
                    textStyle="text-style-u-headline-medium"
                    textOptions={{ fill: colorableTextColor }}
                />
            </Region>
            <BonusRarePromoLayoutProgressBarCont {...progressBarCont} />
        </Region>
    );
};
