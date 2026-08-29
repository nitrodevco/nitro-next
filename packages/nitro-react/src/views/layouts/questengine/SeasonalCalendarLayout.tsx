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

/** Named region `entity_template` of SeasonalCalendarLayout - configured through the parent's `entityTemplate` prop. */
export interface SeasonalCalendarLayoutEntityTemplateProps {
    captionEntityIndicatorText?: string;
    layout?: BoxLayout;
    onEntityMouseRegion?: () => void;
    srcEntityBitmap?: string;
    srcEntityIndicatorStatus?: string;
    srcEntityMouseover?: string;
}

export const SeasonalCalendarLayoutEntityTemplate = ({ captionEntityIndicatorText, layout, onEntityMouseRegion, srcEntityBitmap, srcEntityIndicatorStatus, srcEntityMouseover }: SeasonalCalendarLayoutEntityTemplateProps) => {
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
            <Region
                name="entity_mouse_region"
                onPointerTap={onEntityMouseRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 313 }}
            />
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

/** Named region `promo_info_cont` of SeasonalCalendarLayout - configured through the parent's `promoInfoCont` prop. */
export interface SeasonalCalendarLayoutPromoInfoContProps {
    captionPromoHeader?: string;
    captionPromoInfo?: string;
    captionYourBalanceTxt?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
}

export const SeasonalCalendarLayoutPromoInfoCont = ({ captionPromoHeader, captionPromoInfo, captionYourBalanceTxt, layout, onBuyButton }: SeasonalCalendarLayoutPromoInfoContProps) => {
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
            <Region
                name="currency_icon_cont"
                layout={{ position: 'absolute', left: 77, width: 30, top: 71, height: 30 }}
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
    layout?: BoxLayout;
    promoInfoCont?: SeasonalCalendarLayoutPromoInfoContProps;
    srcFurniPreview?: string;
    srcFurniPreviewBackground?: string;
}

export const SeasonalCalendarLayoutCatalogPromoCont = ({ layout, promoInfoCont, srcFurniPreview, srcFurniPreviewBackground }: SeasonalCalendarLayoutCatalogPromoContProps) => {
    return (
        <Region
            name="catalog_promo_cont"
            layout={{ position: 'absolute', left: 5, width: 384, top: 1, height: 97, ...layout }}
        >
            <Region
                name="bg"
                backgroundColor="#04bdc8"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Region
                name="top"
                backgroundColor="#95dfe4"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
            />
            <Region
                name="bottom"
                backgroundColor="#70d7dd"
                layout={{ position: 'absolute', left: 2, right: 2, top: 48, height: 47 }}
            />
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

/** Named region `rare_teaser_cont` of SeasonalCalendarLayout - configured through the parent's `rareTeaserCont` prop. */
export interface SeasonalCalendarLayoutRareTeaserContProps {
    captionTeaserHeader?: string;
    captionTeaserInfo?: string;
    layout?: BoxLayout;
    onClickRegion?: () => void;
    onClickRegion2?: () => void;
    onClickRegion3?: () => void;
    onRareTeaserCont?: () => void;
    srcFurniPic?: string;
    srcFurniPic2?: string;
    srcFurniPic3?: string;
}

export const SeasonalCalendarLayoutRareTeaserCont = ({ captionTeaserHeader, captionTeaserInfo, layout, onClickRegion, onClickRegion2, onClickRegion3, onRareTeaserCont, srcFurniPic, srcFurniPic2, srcFurniPic3 }: SeasonalCalendarLayoutRareTeaserContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rare_teaser_cont"
            onPointerTap={onRareTeaserCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 395, width: 235, top: 1, height: 97, justifyContent: 'center', ...layout }}
        >
            <Region
                name="bg"
                backgroundColor="#9cb0b6"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Region
                name="top"
                backgroundColor="#d4e4e8"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
            />
            <Region
                name="bottom"
                backgroundColor="#c6d7dd"
                layout={{ position: 'absolute', left: 2, right: 2, top: 48, height: 47 }}
            />
            <Region
                name="rare_cont_1"
                layout={{ position: 'absolute', left: 57, width: 36, top: 28, height: 36 }}
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
                <Region
                    name="click_region"
                    onPointerTap={onClickRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
            </Region>
            <Region
                name="rare_cont_2"
                layout={{ position: 'absolute', left: 99, width: 36, top: 28, height: 36 }}
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
                    src={srcFurniPic2}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
                <Region
                    name="click_region"
                    onPointerTap={onClickRegion2}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
            </Region>
            <Region
                name="rare_cont_3"
                layout={{ position: 'absolute', left: 141, width: 36, top: 28, height: 36 }}
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
                    src={srcFurniPic3}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
                <Region
                    name="click_region"
                    onPointerTap={onClickRegion3}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                />
            </Region>
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
