import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `127_SeasonalCalendar_xml` (layout "Quest", 642x465) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SeasonalCalendarLayoutProps {
    calendarCont?: SeasonalCalendarLayoutCalendarContProps;
    footerCont?: SeasonalCalendarLayoutFooterContProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const SeasonalCalendarLayout = ({ calendarCont, footerCont, layout, onClose }: SeasonalCalendarLayoutProps) => {
    return (
        <Frame
            variant="3"
            caption="TBD"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 642, height: 465, ...layout }}
        >
            <SeasonalCalendarLayoutCalendarCont {...calendarCont} />
            <SeasonalCalendarLayoutFooterCont {...footerCont} />
        </Frame>
    );
};

/** Named region `entity_mouse_region` of SeasonalCalendarLayout - configured through the parent's `entityMouseRegion` prop. */
export interface SeasonalCalendarLayoutEntityMouseRegionProps {
    layout?: BoxLayout;
    onEntityMouseRegion?: () => void;
}

export const SeasonalCalendarLayoutEntityMouseRegion = ({ layout, onEntityMouseRegion }: SeasonalCalendarLayoutEntityMouseRegionProps) => {
    return (
        <Region
            name="entity_mouse_region"
            onPointerTap={onEntityMouseRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 313, ...layout }}
        />
    );
};

/** Named region `entity_template` of SeasonalCalendarLayout - configured through the parent's `entityTemplate` prop. */
export interface SeasonalCalendarLayoutEntityTemplateProps {
    captionEntityIndicatorText?: string;
    entityMouseRegion?: SeasonalCalendarLayoutEntityMouseRegionProps;
    layout?: BoxLayout;
    srcEntityBitmap?: string;
    srcEntityIndicatorStatus?: string;
    srcEntityMouseover?: string;
}

export const SeasonalCalendarLayoutEntityTemplate = ({ captionEntityIndicatorText, entityMouseRegion, layout, srcEntityBitmap, srcEntityIndicatorStatus, srcEntityMouseover }: SeasonalCalendarLayoutEntityTemplateProps) => {
    return (
        <Region
            name="entity_template"
            layout={{ position: 'absolute', left: 29, width: 79, top: 0, height: 312, ...layout }}
        >
            <ThemeImage
                name="entity_bitmap"
                src={srcEntityBitmap}
                layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 289 }}
            />
            <Border
                variant="3"
                name="entity_indicator_edge"
                layout={{ position: 'absolute', left: 5, width: 67, top: 293, height: 18 }}
            />
            <Border
                variant="3"
                name="entity_indicator"
                tintColor="#408030"
                layout={{ position: 'absolute', left: 6, width: 65, top: 294, height: 16 }}
            >
                <Region
                    name="entity_indicator_text"
                    layout={{ position: 'absolute', left: 0, width: 66, top: -2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionEntityIndicatorText ?? 'date'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="entity_indicator_status"
                    src={srcEntityIndicatorStatus}
                    layout={{ position: 'absolute', left: 50, width: 16, top: 3, height: 14 }}
                />
            </Border>
            <ThemeImage
                name="entity_mouseover"
                src={srcEntityMouseover}
                layout={{ position: 'absolute', left: 0, width: 79, top: 53, height: 81 }}
            />
            <SeasonalCalendarLayoutEntityMouseRegion {...entityMouseRegion} />
        </Region>
    );
};

/** Named region `calendar_cont` of SeasonalCalendarLayout - configured through the parent's `calendarCont` prop. */
export interface SeasonalCalendarLayoutCalendarContProps {
    entityTemplate?: SeasonalCalendarLayoutEntityTemplateProps;
    layout?: BoxLayout;
    srcBackgroundSlice?: string;
    srcButtonLeft?: string;
    srcButtonRight?: string;
    srcStripeMaskLeft?: string;
    srcStripeMaskRight?: string;
}

export const SeasonalCalendarLayoutCalendarCont = ({ entityTemplate, layout, srcBackgroundSlice, srcButtonLeft, srcButtonRight, srcStripeMaskLeft, srcStripeMaskRight }: SeasonalCalendarLayoutCalendarContProps) => {
    return (
        <Region
            name="calendar_cont"
            layout={{ position: 'absolute', left: -2, width: 640, top: -3, height: 320, ...layout }}
        >
            <ThemeImage
                name="background_slice"
                src={srcBackgroundSlice}
                layout={{ position: 'absolute', left: 0, width: 640, top: 0, height: 320 }}
            />
            <SeasonalCalendarLayoutEntityTemplate {...entityTemplate} />
            <ThemeImage
                name="stripe_mask_left"
                src={srcStripeMaskLeft}
                layout={{ position: 'absolute', left: 0, width: 43, top: 291, height: 22 }}
            />
            <ThemeImage
                name="stripe_mask_right"
                src={srcStripeMaskRight}
                layout={{ position: 'absolute', left: 597, width: 43, top: 291, height: 22 }}
            />
            <ThemeImage
                name="button_right"
                src={srcButtonRight}
                layout={{ position: 'absolute', left: 613, width: 20, top: 287, height: 30 }}
            />
            <ThemeImage
                name="button_left"
                src={srcButtonLeft}
                layout={{ position: 'absolute', left: 6, width: 20, top: 287, height: 30 }}
            />
        </Region>
    );
};

/** Named region `bg` of SeasonalCalendarLayout - configured through the parent's `bg` prop. */
export interface SeasonalCalendarLayoutBgProps {
    layout?: BoxLayout;
}

export const SeasonalCalendarLayoutBg = ({ layout }: SeasonalCalendarLayoutBgProps) => {
    return (
        <Region
            name="bg"
            backgroundColor="#04bdc8"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `top` of SeasonalCalendarLayout - configured through the parent's `top` prop. */
export interface SeasonalCalendarLayoutTopProps {
    layout?: BoxLayout;
}

export const SeasonalCalendarLayoutTop = ({ layout }: SeasonalCalendarLayoutTopProps) => {
    return (
        <Region
            name="top"
            backgroundColor="#95dfe4"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, ...layout }}
        />
    );
};

/** Named region `bottom` of SeasonalCalendarLayout - configured through the parent's `bottom` prop. */
export interface SeasonalCalendarLayoutBottomProps {
    layout?: BoxLayout;
}

export const SeasonalCalendarLayoutBottom = ({ layout }: SeasonalCalendarLayoutBottomProps) => {
    return (
        <Region
            name="bottom"
            backgroundColor="#70d7dd"
            layout={{ position: 'absolute', left: 2, right: 2, top: 48, height: 47, ...layout }}
        />
    );
};

/** Named region `currency_icon_cont` of SeasonalCalendarLayout - configured through the parent's `currencyIconCont` prop. */
export interface SeasonalCalendarLayoutCurrencyIconContProps {
    layout?: BoxLayout;
}

export const SeasonalCalendarLayoutCurrencyIconCont = ({ layout }: SeasonalCalendarLayoutCurrencyIconContProps) => {
    return (
        <Region
            name="currency_icon_cont"
            layout={{ position: 'absolute', left: 77, width: 30, top: 71, height: 30, ...layout }}
        >
            <Icon
                variant="27"
                name="currency_icon_1"
                layout={{ position: 'absolute', left: 0, width: 21, top: 0, height: 20 }}
            />
            <Icon
                variant="29"
                name="currency_icon_2"
                layout={{ position: 'absolute', left: 0, width: 18, top: 2, height: 18 }}
            />
            <Icon
                variant="27"
                name="currency_icon_101"
                layout={{ position: 'absolute', left: 0, width: 21, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `promo_info_cont` of SeasonalCalendarLayout - configured through the parent's `promoInfoCont` prop. */
export interface SeasonalCalendarLayoutPromoInfoContProps {
    captionPromoHeader?: string;
    captionPromoInfo?: string;
    captionYourBalanceTxt?: string;
    currencyIconCont?: SeasonalCalendarLayoutCurrencyIconContProps;
    layout?: BoxLayout;
    onBuyButton?: () => void;
}

export const SeasonalCalendarLayoutPromoInfoCont = ({ captionPromoHeader, captionPromoInfo, captionYourBalanceTxt, currencyIconCont, layout, onBuyButton }: SeasonalCalendarLayoutPromoInfoContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="promo_info_cont"
            layout={{ position: 'absolute', left: 106, width: 276, top: 0, height: 97, ...layout }}
        >
            <Region
                name="promo_header"
                layout={{ position: 'absolute', left: 0, width: 223, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPromoHeader ?? t('quests.seasonalcalendar.promo.header')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="promo_info"
                layout={{ position: 'absolute', left: 0, width: 4, top: 27, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPromoInfo ?? ''}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Button
                variant="3"
                name="buy_button"
                onPointerTap={onBuyButton}
                layout={{ position: 'absolute', left: 145, width: 110, top: 51, height: 23, minWidth: 110, maxWidth: 110 }}
            >
                {t('quests.seasonalcalendar.promo.buy')}
            </Button>
            <SeasonalCalendarLayoutCurrencyIconCont {...currencyIconCont} />
            <Region
                name="your_balance_txt"
                layout={{ position: 'absolute', left: 0, width: 223, top: 72, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionYourBalanceTxt ?? t('quests.seasonalcalendar.promo.balance')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `catalog_promo_cont` of SeasonalCalendarLayout - configured through the parent's `catalogPromoCont` prop. */
export interface SeasonalCalendarLayoutCatalogPromoContProps {
    bg?: SeasonalCalendarLayoutBgProps;
    bottom?: SeasonalCalendarLayoutBottomProps;
    layout?: BoxLayout;
    promoInfoCont?: SeasonalCalendarLayoutPromoInfoContProps;
    srcFurniPreview?: string;
    srcFurniPreviewBackground?: string;
    top?: SeasonalCalendarLayoutTopProps;
}

export const SeasonalCalendarLayoutCatalogPromoCont = ({ bg, bottom, layout, promoInfoCont, srcFurniPreview, srcFurniPreviewBackground, top }: SeasonalCalendarLayoutCatalogPromoContProps) => {
    return (
        <Region
            name="catalog_promo_cont"
            layout={{ position: 'absolute', left: 5, width: 384, top: 1, height: 97, ...layout }}
        >
            <SeasonalCalendarLayoutBg {...bg} />
            <SeasonalCalendarLayoutTop {...top} />
            <SeasonalCalendarLayoutBottom {...bottom} />
            <SeasonalCalendarLayoutPromoInfoCont {...promoInfoCont} />
            <ThemeImage
                name="furni_preview_background"
                src={srcFurniPreviewBackground ?? '${image.library.questing.url}calendar_promobg.png'}
                layout={{ position: 'absolute', left: 2, width: 93, top: 2, height: 93 }}
            />
            <ThemeImage
                name="furni_preview"
                src={srcFurniPreview}
                layout={{ position: 'absolute', left: 2, width: 93, top: 2, height: 93 }}
            />
        </Region>
    );
};

/** Named region `bg` of SeasonalCalendarLayout - configured through the parent's `bg` prop. */
export interface SeasonalCalendarLayoutBg2Props {
    layout?: BoxLayout;
}

export const SeasonalCalendarLayoutBg2 = ({ layout }: SeasonalCalendarLayoutBg2Props) => {
    return (
        <Region
            name="bg"
            backgroundColor="#9cb0b6"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `top` of SeasonalCalendarLayout - configured through the parent's `top` prop. */
export interface SeasonalCalendarLayoutTop2Props {
    layout?: BoxLayout;
}

export const SeasonalCalendarLayoutTop2 = ({ layout }: SeasonalCalendarLayoutTop2Props) => {
    return (
        <Region
            name="top"
            backgroundColor="#d4e4e8"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, ...layout }}
        />
    );
};

/** Named region `bottom` of SeasonalCalendarLayout - configured through the parent's `bottom` prop. */
export interface SeasonalCalendarLayoutBottom2Props {
    layout?: BoxLayout;
}

export const SeasonalCalendarLayoutBottom2 = ({ layout }: SeasonalCalendarLayoutBottom2Props) => {
    return (
        <Region
            name="bottom"
            backgroundColor="#c6d7dd"
            layout={{ position: 'absolute', left: 2, right: 2, top: 48, height: 47, ...layout }}
        />
    );
};

/** Named region `click_region` of SeasonalCalendarLayout - configured through the parent's `clickRegion` prop. */
export interface SeasonalCalendarLayoutClickRegionProps {
    layout?: BoxLayout;
    onClickRegion?: () => void;
}

export const SeasonalCalendarLayoutClickRegion = ({ layout, onClickRegion }: SeasonalCalendarLayoutClickRegionProps) => {
    return (
        <Region
            name="click_region"
            onPointerTap={onClickRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36, ...layout }}
        />
    );
};

/** Named region `rare_cont_1` of SeasonalCalendarLayout - configured through the parent's `rareCont1` prop. */
export interface SeasonalCalendarLayoutRareCont1Props {
    clickRegion?: SeasonalCalendarLayoutClickRegionProps;
    layout?: BoxLayout;
    srcFurniPic?: string;
}

export const SeasonalCalendarLayoutRareCont1 = ({ clickRegion, layout, srcFurniPic }: SeasonalCalendarLayoutRareCont1Props) => {
    return (
        <Region
            name="rare_cont_1"
            layout={{ position: 'absolute', left: 57, width: 36, top: 28, height: 36, ...layout }}
        >
            <Border
                variant="2"
                name="locked_bg"
                tintColor="#9cb0b6"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Border
                variant="2"
                name="open_bg"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Icon
                variant="28"
                name="locked_icon"
                layout={{ position: 'absolute', left: 8, width: 20, top: 6, height: 24 }}
            />
            <ThemeImage
                name="furni_pic"
                src={srcFurniPic}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
            />
            <SeasonalCalendarLayoutClickRegion {...clickRegion} />
        </Region>
    );
};

/** Named region `click_region` of SeasonalCalendarLayout - configured through the parent's `clickRegion` prop. */
export interface SeasonalCalendarLayoutClickRegion2Props {
    layout?: BoxLayout;
    onClickRegion?: () => void;
}

export const SeasonalCalendarLayoutClickRegion2 = ({ layout, onClickRegion }: SeasonalCalendarLayoutClickRegion2Props) => {
    return (
        <Region
            name="click_region"
            onPointerTap={onClickRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36, ...layout }}
        />
    );
};

/** Named region `rare_cont_2` of SeasonalCalendarLayout - configured through the parent's `rareCont2` prop. */
export interface SeasonalCalendarLayoutRareCont2Props {
    clickRegion?: SeasonalCalendarLayoutClickRegion2Props;
    layout?: BoxLayout;
    srcFurniPic?: string;
}

export const SeasonalCalendarLayoutRareCont2 = ({ clickRegion, layout, srcFurniPic }: SeasonalCalendarLayoutRareCont2Props) => {
    return (
        <Region
            name="rare_cont_2"
            layout={{ position: 'absolute', left: 99, width: 36, top: 28, height: 36, ...layout }}
        >
            <Border
                variant="2"
                name="locked_bg"
                tintColor="#9cb0b6"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Border
                variant="2"
                name="open_bg"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Icon
                variant="28"
                name="locked_icon"
                layout={{ position: 'absolute', left: 8, width: 20, top: 6, height: 24 }}
            />
            <ThemeImage
                name="furni_pic"
                src={srcFurniPic}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
            />
            <SeasonalCalendarLayoutClickRegion2 {...clickRegion} />
        </Region>
    );
};

/** Named region `click_region` of SeasonalCalendarLayout - configured through the parent's `clickRegion` prop. */
export interface SeasonalCalendarLayoutClickRegion3Props {
    layout?: BoxLayout;
    onClickRegion?: () => void;
}

export const SeasonalCalendarLayoutClickRegion3 = ({ layout, onClickRegion }: SeasonalCalendarLayoutClickRegion3Props) => {
    return (
        <Region
            name="click_region"
            onPointerTap={onClickRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36, ...layout }}
        />
    );
};

/** Named region `rare_cont_3` of SeasonalCalendarLayout - configured through the parent's `rareCont3` prop. */
export interface SeasonalCalendarLayoutRareCont3Props {
    clickRegion?: SeasonalCalendarLayoutClickRegion3Props;
    layout?: BoxLayout;
    srcFurniPic?: string;
}

export const SeasonalCalendarLayoutRareCont3 = ({ clickRegion, layout, srcFurniPic }: SeasonalCalendarLayoutRareCont3Props) => {
    return (
        <Region
            name="rare_cont_3"
            layout={{ position: 'absolute', left: 141, width: 36, top: 28, height: 36, ...layout }}
        >
            <Border
                variant="2"
                name="locked_bg"
                tintColor="#9cb0b6"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Border
                variant="2"
                name="open_bg"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Icon
                variant="28"
                name="locked_icon"
                layout={{ position: 'absolute', left: 8, width: 20, top: 6, height: 24 }}
            />
            <ThemeImage
                name="furni_pic"
                src={srcFurniPic}
                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
            />
            <SeasonalCalendarLayoutClickRegion3 {...clickRegion} />
        </Region>
    );
};

/** Named region `rare_teaser_cont` of SeasonalCalendarLayout - configured through the parent's `rareTeaserCont` prop. */
export interface SeasonalCalendarLayoutRareTeaserContProps {
    bg?: SeasonalCalendarLayoutBg2Props;
    bottom?: SeasonalCalendarLayoutBottom2Props;
    captionTeaserHeader?: string;
    captionTeaserInfo?: string;
    layout?: BoxLayout;
    onRareTeaserCont?: () => void;
    rareCont1?: SeasonalCalendarLayoutRareCont1Props;
    rareCont2?: SeasonalCalendarLayoutRareCont2Props;
    rareCont3?: SeasonalCalendarLayoutRareCont3Props;
    top?: SeasonalCalendarLayoutTop2Props;
}

export const SeasonalCalendarLayoutRareTeaserCont = ({ bg, bottom, captionTeaserHeader, captionTeaserInfo, layout, onRareTeaserCont, rareCont1, rareCont2, rareCont3, top }: SeasonalCalendarLayoutRareTeaserContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rare_teaser_cont"
            onPointerTap={onRareTeaserCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 395, width: 235, top: 1, height: 97, justifyContent: 'center', ...layout }}
        >
            <SeasonalCalendarLayoutBg2 {...bg} />
            <SeasonalCalendarLayoutTop2 {...top} />
            <SeasonalCalendarLayoutBottom2 {...bottom} />
            <SeasonalCalendarLayoutRareCont1 {...rareCont1} />
            <SeasonalCalendarLayoutRareCont2 {...rareCont2} />
            <SeasonalCalendarLayoutRareCont3 {...rareCont3} />
            <Region
                name="teaser_header"
                layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 230, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTeaserHeader ?? t('quests.seasonalcalendar.rareteaser.header')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="teaser_info"
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 212, top: 71, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTeaserInfo ?? t('quests.seasonalcalendar.rareteaser.info')}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};

/** Named region `footer_cont` of SeasonalCalendarLayout - configured through the parent's `footerCont` prop. */
export interface SeasonalCalendarLayoutFooterContProps {
    catalogPromoCont?: SeasonalCalendarLayoutCatalogPromoContProps;
    layout?: BoxLayout;
    rareTeaserCont?: SeasonalCalendarLayoutRareTeaserContProps;
}

export const SeasonalCalendarLayoutFooterCont = ({ catalogPromoCont, layout, rareTeaserCont }: SeasonalCalendarLayoutFooterContProps) => {
    return (
        <Region
            name="footer_cont"
            layout={{ position: 'absolute', left: 0, width: 636, top: 320, height: 135, ...layout }}
        >
            <SeasonalCalendarLayoutCatalogPromoCont {...catalogPromoCont} />
            <SeasonalCalendarLayoutRareTeaserCont {...rareTeaserCont} />
        </Region>
    );
};
