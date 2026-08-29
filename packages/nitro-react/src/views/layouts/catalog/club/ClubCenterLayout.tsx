import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1683_club_center_xml` (layout "hc_center", 460x597) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubCenterLayoutProps {
    basic?: ClubCenterLayoutBasicProps;
    captionGiftInfo?: string;
    captionGiftTitle?: string;
    footer?: ClubCenterLayoutFooterProps;
    layout?: BoxLayout;
    onBtnBuy?: () => void;
    onBtnEarn?: () => void;
    onBtnGift?: () => void;
    onClose?: () => void;
    specialContent?: ClubCenterLayoutSpecialContentProps;
    specialContentPostit?: ClubCenterLayoutSpecialContentPostitProps;
    srcCoverpic?: string;
}

export const ClubCenterLayout = ({ basic, captionGiftInfo, captionGiftTitle, footer, layout, onBtnBuy, onBtnEarn, onBtnGift, onClose, specialContent, specialContentPostit, srcCoverpic }: ClubCenterLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="hc_center"
            name="hc_center"
            caption={t('generic.hccenter')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 460, height: 597, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 460, top: 0, height: 559, flexDirection: 'column' }}>
                <Region layout={{ width: 459, height: 137, flexShrink: 0 }}>
                    <ThemeImage
                        name="coverpic"
                        src={srcCoverpic ?? layoutImage('hc_center_hc_center_cover.png')}
                        layout={{ position: 'absolute', left: 0, width: 459, top: 1, height: 137 }}
                    />
                    <Region layout={{ position: 'absolute', left: 21, width: 261, top: 85, height: 33, flexDirection: 'row', gap: 14 }}>
                        <ButtonThick
                            variant="6"
                            name="btn_buy"
                            tintColor="#54c32e"
                            onPointerTap={onBtnBuy}
                            textStyle="text-style-button-shiny-bold"
                            layout={{ width: 121, height: 33, flexShrink: 0 }}
                        >
                            {t('hccenter.btn.buy')}
                        </ButtonThick>
                        <ButtonThick
                            variant="5"
                            name="btn_earn"
                            tintColor="#3399cc"
                            onPointerTap={onBtnEarn}
                            textStyle="text-style-button-shiny-bold"
                            layout={{ width: 126, height: 33, flexShrink: 0 }}
                        >
                            {t('hccenter.btn.earn')}
                        </ButtonThick>
                    </Region>
                </Region>
                <ClubCenterLayoutBasic {...basic} />
                <Region layout={{ width: 420, height: 208, flexShrink: 0, flexDirection: 'column' }}>
                    <ClubCenterLayoutSpecialContent {...specialContent} />
                    <Border
                        variant="3"
                        name="gift_content"
                        tintColor="#54c32e"
                        layout={{ width: 412, height: 74, flexShrink: 0 }}
                    >
                        <Region
                            name="gift_title"
                            layout={{ position: 'absolute', left: 16, width: 250, top: 16, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionGiftTitle ?? t('hccenter.gift.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                        <Region
                            name="gift_info"
                            layout={{ position: 'absolute', left: 16, width: 250, top: 36, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionGiftInfo ?? t('hccenter.gift.info')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 250 }}
                            />
                        </Region>
                        <ButtonThick
                            variant="5"
                            name="btn_gift"
                            tintColor="#3399cc"
                            onPointerTap={onBtnGift}
                            textStyle="text-style-button-shiny-bold"
                            layout={{ position: 'absolute', right: 25, width: 154, alignSelf: 'center', marginTop: 1.5, marginBottom: -1.5, height: 33 }}
                        >
                            {t('hccenter.btn.gifts.view')}
                        </ButtonThick>
                    </Border>
                </Region>
                <ClubCenterLayoutFooter {...footer} />
            </Region>
            <WidgetSlot
                widgetType="room_previewer"
                name="avatar"
                options={{ 'room_previewer:offsety': '-30', 'room_previewer:zoom': '2' }}
                layout={{ position: 'absolute', left: 360, width: 90, top: 14, height: 130 }}
            />
            <ClubCenterLayoutSpecialContentPostit {...specialContentPostit} />
        </Frame>
    );
};

/** Named region `hc_badge_container` of ClubCenterLayout - configured through the parent's `hcBadgeContainer` prop. */
export interface ClubCenterLayoutHcBadgeContainerProps {
    layout?: BoxLayout;
    srcHcBadge?: string;
}

export const ClubCenterLayoutHcBadgeContainer = ({ layout, srcHcBadge }: ClubCenterLayoutHcBadgeContainerProps) => {
    return (
        <Region
            name="hc_badge_container"
            layout={{ position: 'absolute', left: 19, width: 50, top: 11, height: 50, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="hc_badge"
                src={srcHcBadge}
                layout={{ position: 'absolute', width: 50, alignSelf: 'center', height: 50 }}
            />
        </Region>
    );
};

/** Named region `basic` of ClubCenterLayout - configured through the parent's `basic` prop. */
export interface ClubCenterLayoutBasicProps {
    captionStatusInfo?: string;
    captionStatusTitle?: string;
    hcBadgeContainer?: ClubCenterLayoutHcBadgeContainerProps;
    layout?: BoxLayout;
}

export const ClubCenterLayoutBasic = ({ captionStatusInfo, captionStatusTitle, hcBadgeContainer, layout }: ClubCenterLayoutBasicProps) => {
    return (
        <Region
            name="basic"
            layout={{ width: 460, height: 75, flexShrink: 0, ...layout }}
        >
            <ClubCenterLayoutHcBadgeContainer {...hcBadgeContainer} />
            <Region layout={{ position: 'absolute', left: 72, width: 360, top: 7, height: 62, flexDirection: 'row', flexWrap: 'wrap' }}>
                <Region
                    name="status_title"
                    layout={{ width: 290, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusTitle ?? ''}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="status_info"
                    layout={{ width: 285, height: 45, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusInfo ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `special_content` of ClubCenterLayout - configured through the parent's `specialContent` prop. */
export interface ClubCenterLayoutSpecialContentProps {
    captionSpecialInfo?: string;
    captionSpecialInfolink?: string;
    captionSpecialTitle?: string;
    layout?: BoxLayout;
    onSpecialInfolink?: () => void;
}

export const ClubCenterLayoutSpecialContent = ({ captionSpecialInfo, captionSpecialInfolink, captionSpecialTitle, layout, onSpecialInfolink }: ClubCenterLayoutSpecialContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="special_content"
            layout={{ width: 420, height: 134, flexShrink: 0, ...layout }}
        >
            <Border
                variant="3"
                tintColor="#53a3cb"
                layout={{ position: 'absolute', left: 0, width: 412, top: 0, height: 128 }}
            >
                <Region
                    name="special_title"
                    layout={{ position: 'absolute', left: 16, width: 180, top: 16, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSpecialTitle ?? t('hccenter.special.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="special_info"
                    layout={{ position: 'absolute', left: 16, width: 180, top: 36, height: 56, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSpecialInfo ?? t('hccenter.special.info')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 180 }}
                    />
                </Region>
                <Region
                    name="special_infolink"
                    layout={{ position: 'absolute', left: 16, width: 190, top: 100, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    onPointerTap={onSpecialInfolink}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionSpecialInfolink ?? t('hccenter.special.infolink')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 190 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `footer` of ClubCenterLayout - configured through the parent's `footer` prop. */
export interface ClubCenterLayoutFooterProps {
    captionGeneralInfo?: string;
    captionGeneralInfolink?: string;
    captionGeneralTitle?: string;
    layout?: BoxLayout;
    onGeneralInfolink?: () => void;
    srcHcCenterIllustration?: string;
}

export const ClubCenterLayoutFooter = ({ captionGeneralInfo, captionGeneralInfolink, captionGeneralTitle, layout, onGeneralInfolink, srcHcCenterIllustration }: ClubCenterLayoutFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="footer"
            layout={{ width: 460, height: 139, flexShrink: 0, ...layout }}
        >
            <Region
                name="general_title"
                layout={{ position: 'absolute', left: 36, width: 190, top: 6, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGeneralTitle ?? t('hccenter.general.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#4a8eb1' }}
                />
            </Region>
            <Region
                name="general_info"
                layout={{ position: 'absolute', left: 36, width: 174, top: 28, height: 97, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGeneralInfo ?? t('hccenter.general.info')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 174 }}
                />
            </Region>
            <Region
                name="general_infolink"
                layout={{ position: 'absolute', left: 36, width: 174, top: 118, height: 26, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                onPointerTap={onGeneralInfolink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionGeneralInfolink ?? t('hccenter.general.infolink')}
                    textOptions={{ fill: '#4a8eb1', wordWrap: true, wordWrapWidth: 174 }}
                />
            </Region>
            <ThemeImage
                name="hc_center_illustration"
                src={srcHcCenterIllustration ?? layoutImage('hc_center_hc_center_illustration.png')}
                layout={{ position: 'absolute', left: 256, width: 200, top: 10, height: 130 }}
            />
        </Region>
    );
};

/** Named region `special_content_postit` of ClubCenterLayout - configured through the parent's `specialContentPostit` prop. */
export interface ClubCenterLayoutSpecialContentPostitProps {
    captionSpecialAmountContent?: string;
    captionSpecialAmountTitle?: string;
    captionSpecialBreakdownLink?: string;
    captionSpecialTimeContent?: string;
    captionSpecialTimeTitle?: string;
    layout?: BoxLayout;
    onSpecialBreakdownLink?: () => void;
    srcHcPostitBg?: string;
    srcSpecialAmountIcon?: string;
    srcSpecialTimeIcon?: string;
}

export const ClubCenterLayoutSpecialContentPostit = ({ captionSpecialAmountContent, captionSpecialAmountTitle, captionSpecialBreakdownLink, captionSpecialTimeContent, captionSpecialTimeTitle, layout, onSpecialBreakdownLink, srcHcPostitBg, srcSpecialAmountIcon, srcSpecialTimeIcon }: ClubCenterLayoutSpecialContentPostitProps) => {
    const t = useTranslation();

    return (
        <Region
            name="special_content_postit"
            layout={{ position: 'absolute', left: 218, width: 222, top: 204, height: 150, ...layout }}
        >
            <ThemeImage
                name="hc_postit_bg"
                src={srcHcPostitBg ?? layoutImage('hc_center_hc_postit_bg.png')}
                layout={{ position: 'absolute', left: 0, width: 222, top: 0, height: 150 }}
            />
            <Region
                name="special_time_title"
                layout={{ position: 'absolute', left: 13, width: 190, top: 16, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSpecialTimeTitle ?? t('hccenter.special.time.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#683203' }}
                />
            </Region>
            <Region
                name="special_time_content"
                layout={{ position: 'absolute', left: 47, width: 153, top: 41, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSpecialTimeContent ?? ''}
                    textOptions={{ fill: '#683203' }}
                />
            </Region>
            <Region
                name="special_amount_title"
                layout={{ position: 'absolute', left: 13, width: 190, top: 68, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSpecialAmountTitle ?? t('hccenter.special.amount.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#683203' }}
                />
            </Region>
            <Region
                name="special_amount_content"
                layout={{ position: 'absolute', left: 47, width: 153, top: 95, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSpecialAmountContent ?? ''}
                    textOptions={{ fill: '#683203' }}
                />
            </Region>
            <Region
                name="special_breakdown_link"
                layout={{ position: 'absolute', right: 15, width: 190, top: 120, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}
                onPointerTap={onSpecialBreakdownLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionSpecialBreakdownLink ?? t('hccenter.breakdown.infolink')}
                    textOptions={{ fill: '#4a8eb1', wordWrap: true, wordWrapWidth: 190, align: 'right' }}
                />
            </Region>
            <ThemeImage
                name="special_time_icon"
                src={srcSpecialTimeIcon ?? layoutImage('hc_center_hc_center_timer.png')}
                layout={{ position: 'absolute', left: 7, width: 24, top: 41, height: 24 }}
            />
            <ThemeImage
                name="special_amount_icon"
                src={srcSpecialAmountIcon ?? layoutImage('hc_center_icon_credits.png')}
                layout={{ position: 'absolute', left: 17, width: 24, top: 94, height: 24 }}
            />
        </Region>
    );
};
