import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `127_SeasonalCalendar_xml` (layout "Quest", 642x465) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SeasonalCalendarLayoutProps {
    captionEntityIndicatorText?: string;
    captionPromoHeader?: string;
    captionPromoInfo?: string;
    captionTeaserHeader?: string;
    captionTeaserInfo?: string;
    captionYourBalanceTxt?: string;
    layout?: BoxLayout;
    onBuyButton?: () => void;
    onClickRegion?: () => void;
    onClickRegion2?: () => void;
    onClickRegion3?: () => void;
    onClose?: () => void;
    onEntityMouseRegion?: () => void;
    onRareTeaserCont?: () => void;
    srcBackgroundSlice?: string;
    srcButtonLeft?: string;
    srcButtonRight?: string;
    srcEntityBitmap?: string;
    srcEntityIndicatorStatus?: string;
    srcEntityMouseover?: string;
    srcFurniPic?: string;
    srcFurniPic2?: string;
    srcFurniPic3?: string;
    srcFurniPreview?: string;
    srcFurniPreviewBackground?: string;
    srcStripeMaskLeft?: string;
    srcStripeMaskRight?: string;
}

export const SeasonalCalendarLayout = ({ captionEntityIndicatorText, captionPromoHeader, captionPromoInfo, captionTeaserHeader, captionTeaserInfo, captionYourBalanceTxt, layout, onBuyButton, onClickRegion, onClickRegion2, onClickRegion3, onClose, onEntityMouseRegion, onRareTeaserCont, srcBackgroundSlice, srcButtonLeft, srcButtonRight, srcEntityBitmap, srcEntityIndicatorStatus, srcEntityMouseover, srcFurniPic, srcFurniPic2, srcFurniPic3, srcFurniPreview, srcFurniPreviewBackground, srcStripeMaskLeft, srcStripeMaskRight }: SeasonalCalendarLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption="TBD"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 642, height: 465, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="calendar_cont"
                    layout={{ position: 'absolute', left: -2, width: 640, top: -3, height: 320 }}
                >
                    <ThemeImage
                        name="background_slice"
                        params={16}
                        src={srcBackgroundSlice}
                        layout={{ position: 'absolute', left: 0, width: 640, top: 0, height: 320 }}
                    />
                    <Region
                        name="entity_template"
                        params={16}
                        layout={{ position: 'absolute', left: 29, width: 79, top: 0, height: 312 }}
                    >
                        <ThemeImage
                            name="entity_bitmap"
                            params={16}
                            src={srcEntityBitmap}
                            layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 289 }}
                        />
                        <Border
                            variant="3"
                            name="entity_indicator_edge"
                            params={16}
                            layout={{ position: 'absolute', left: 5, width: 67, top: 293, height: 18 }}
                        />
                        <Border
                            variant="3"
                            name="entity_indicator"
                            params={16}
                            tintColor="#408030"
                            layout={{ position: 'absolute', left: 6, width: 65, top: 294, height: 16 }}
                        >
                            <Region
                                name="entity_indicator_text"
                                params={16}
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
                                params={16}
                                src={srcEntityIndicatorStatus}
                                layout={{ position: 'absolute', left: 50, width: 16, top: 3, height: 14 }}
                            />
                        </Border>
                        <ThemeImage
                            name="entity_mouseover"
                            params={16}
                            src={srcEntityMouseover}
                            layout={{ position: 'absolute', left: 0, width: 79, top: 53, height: 81 }}
                        />
                        <Region
                            name="entity_mouse_region"
                            params={17}
                            onPointerTap={onEntityMouseRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 313 }}
                        />
                    </Region>
                    <ThemeImage
                        name="stripe_mask_left"
                        params={16}
                        src={srcStripeMaskLeft}
                        layout={{ position: 'absolute', left: 0, width: 43, top: 291, height: 22 }}
                    />
                    <ThemeImage
                        name="stripe_mask_right"
                        params={16}
                        src={srcStripeMaskRight}
                        layout={{ position: 'absolute', left: 597, width: 43, top: 291, height: 22 }}
                    />
                    <ThemeImage
                        name="button_right"
                        params={131089}
                        src={srcButtonRight}
                        layout={{ position: 'absolute', left: 613, width: 20, top: 287, height: 30 }}
                    />
                    <ThemeImage
                        name="button_left"
                        params={131089}
                        src={srcButtonLeft}
                        layout={{ position: 'absolute', left: 6, width: 20, top: 287, height: 30 }}
                    />
                </Region>
                <Region
                    name="footer_cont"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 636, top: 320, height: 135 }}
                >
                    <Region
                        name="catalog_promo_cont"
                        params={16}
                        layout={{ position: 'absolute', left: 5, width: 384, top: 1, height: 97 }}
                    >
                        <Region
                            name="bg"
                            params={2192}
                            backgroundColor="#04bdc8"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                        <Region
                            name="top"
                            params={2192}
                            backgroundColor="#95dfe4"
                            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                        />
                        <Region
                            name="bottom"
                            params={144}
                            backgroundColor="#70d7dd"
                            layout={{ position: 'absolute', left: 2, right: 2, top: 48, height: 47 }}
                        />
                        <Region
                            name="promo_info_cont"
                            params={16}
                            layout={{ position: 'absolute', left: 106, width: 276, top: 0, height: 97 }}
                        >
                            <Region
                                name="promo_header"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 223, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionPromoHeader ?? t('quests.seasonalcalendar.promo.header')}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Region
                                name="promo_info"
                                params={16}
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
                                params={131089}
                                onPointerTap={onBuyButton}
                                layout={{ position: 'absolute', left: 145, width: 110, top: 51, height: 23, minWidth: 110, maxWidth: 110 }}
                            >
                                {t('quests.seasonalcalendar.promo.buy')}
                            </Button>
                            <Region
                                name="currency_icon_cont"
                                params={16}
                                layout={{ position: 'absolute', left: 77, width: 30, top: 71, height: 30 }}
                            >
                                <Icon
                                    variant="27"
                                    name="currency_icon_1"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 21, top: 0, height: 20 }}
                                />
                                <Icon
                                    variant="29"
                                    name="currency_icon_2"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 18, top: 2, height: 18 }}
                                />
                                <Icon
                                    variant="27"
                                    name="currency_icon_101"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 21, top: 0, height: 20 }}
                                />
                            </Region>
                            <Region
                                name="your_balance_txt"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 223, top: 72, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionYourBalanceTxt ?? t('quests.seasonalcalendar.promo.balance')}
                                    textStyle="text-style-u-regular"
                                />
                            </Region>
                        </Region>
                        <ThemeImage
                            name="furni_preview_background"
                            params={16}
                            src={srcFurniPreviewBackground ?? '${image.library.questing.url}calendar_promobg.png'}
                            layout={{ position: 'absolute', left: 2, width: 93, top: 2, height: 93 }}
                        />
                        <ThemeImage
                            name="furni_preview"
                            src={srcFurniPreview}
                            layout={{ position: 'absolute', left: 2, width: 93, top: 2, height: 93 }}
                        />
                    </Region>
                    <Region
                        name="rare_teaser_cont"
                        params={17}
                        onPointerTap={onRareTeaserCont}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 395, width: 235, top: 1, height: 97 }}
                    >
                        <Region
                            name="bg"
                            params={2192}
                            backgroundColor="#9cb0b6"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                        <Region
                            name="top"
                            params={2192}
                            backgroundColor="#d4e4e8"
                            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                        />
                        <Region
                            name="bottom"
                            params={144}
                            backgroundColor="#c6d7dd"
                            layout={{ position: 'absolute', left: 2, right: 2, top: 48, height: 47 }}
                        />
                        <Region
                            name="rare_cont_1"
                            params={16}
                            layout={{ position: 'absolute', left: 57, width: 36, top: 28, height: 36 }}
                        >
                            <Border
                                variant="2"
                                name="locked_bg"
                                params={2192}
                                tintColor="#9cb0b6"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            />
                            <Border
                                variant="2"
                                name="open_bg"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            />
                            <Icon
                                variant="28"
                                name="locked_icon"
                                params={16}
                                layout={{ position: 'absolute', left: 8, width: 20, top: 6, height: 24 }}
                            />
                            <ThemeImage
                                name="furni_pic"
                                params={16}
                                src={srcFurniPic}
                                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                            />
                            <Region
                                name="click_region"
                                params={17}
                                onPointerTap={onClickRegion}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                            />
                        </Region>
                        <Region
                            name="rare_cont_2"
                            params={16}
                            layout={{ position: 'absolute', left: 99, width: 36, top: 28, height: 36 }}
                        >
                            <Border
                                variant="2"
                                name="locked_bg"
                                params={2192}
                                tintColor="#9cb0b6"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            />
                            <Border
                                variant="2"
                                name="open_bg"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            />
                            <Icon
                                variant="28"
                                name="locked_icon"
                                params={16}
                                layout={{ position: 'absolute', left: 8, width: 20, top: 6, height: 24 }}
                            />
                            <ThemeImage
                                name="furni_pic"
                                params={16}
                                src={srcFurniPic2}
                                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                            />
                            <Region
                                name="click_region"
                                params={17}
                                onPointerTap={onClickRegion2}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                            />
                        </Region>
                        <Region
                            name="rare_cont_3"
                            params={16}
                            layout={{ position: 'absolute', left: 141, width: 36, top: 28, height: 36 }}
                        >
                            <Border
                                variant="2"
                                name="locked_bg"
                                params={2192}
                                tintColor="#9cb0b6"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            />
                            <Border
                                variant="2"
                                name="open_bg"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            />
                            <Icon
                                variant="28"
                                name="locked_icon"
                                params={16}
                                layout={{ position: 'absolute', left: 8, width: 20, top: 6, height: 24 }}
                            />
                            <ThemeImage
                                name="furni_pic"
                                params={16}
                                src={srcFurniPic3}
                                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                            />
                            <Region
                                name="click_region"
                                params={17}
                                onPointerTap={onClickRegion3}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 36 }}
                            />
                        </Region>
                        <Region
                            name="teaser_header"
                            params={786448}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -117.5, width: 230, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionTeaserHeader ?? t('quests.seasonalcalendar.rareteaser.header')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="teaser_info"
                            params={786448}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -106.5, width: 212, top: 71, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionTeaserInfo ?? t('quests.seasonalcalendar.rareteaser.info')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
