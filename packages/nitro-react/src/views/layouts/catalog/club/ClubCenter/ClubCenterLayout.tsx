import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { ClubCenterLayoutSpecialContentPostit, ClubCenterLayoutSpecialContentPostitProps } from './ClubCenterLayoutSpecialContentPostit';

/** Generated from `1683_club_center_xml` (layout "hc_center", 460x597) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ClubCenterLayoutProps {
    avatar?: ReactNode;
    captionGeneralInfo?: string;
    captionGeneralInfolink?: string;
    captionGeneralTitle?: string;
    captionGiftInfo?: string;
    captionGiftTitle?: string;
    captionSpecialInfo?: string;
    captionSpecialInfolink?: string;
    captionSpecialTitle?: string;
    captionStatusInfo?: string;
    captionStatusTitle?: string;
    layout?: BoxLayout;
    onBtnBuy?: () => void;
    onBtnEarn?: () => void;
    onBtnGift?: () => void;
    onClose?: () => void;
    onGeneralInfolink?: () => void;
    onSpecialInfolink?: () => void;
    specialContentPostit?: ClubCenterLayoutSpecialContentPostitProps;
    srcCoverpic?: string;
    srcHcBadge?: string;
    srcHcCenterIllustration?: string;
    tintHcBadge?: string;
}

export const ClubCenterLayout = ({ avatar, captionGeneralInfo, captionGeneralInfolink, captionGeneralTitle, captionGiftInfo, captionGiftTitle, captionSpecialInfo, captionSpecialInfolink, captionSpecialTitle, captionStatusInfo, captionStatusTitle, layout, onBtnBuy, onBtnEarn, onBtnGift, onClose, onGeneralInfolink, onSpecialInfolink, specialContentPostit, srcCoverpic, srcHcBadge, srcHcCenterIllustration, tintHcBadge }: ClubCenterLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="hc_center"
            name="hc_center"
            caption={t('generic.hccenter')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 460, height: 597, minWidth: 460, minHeight: 597, ...layout }}
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
                <Region
                    name="basic"
                    layout={{ width: 460, height: 75, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="hc_badge_container"
                        src={srcHcBadge}
                        tint={tintHcBadge}
                        layout={{ position: 'absolute', left: 19, width: 50, top: 11, height: 50 }}
                    />
                    <Region layout={{ position: 'absolute', left: 72, width: 360, top: 7, height: 62, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <ThemeText
                            text={captionStatusTitle ?? ''}
                            textStyle="text-style-u-bold"
                            name="status_title"
                            layout={{ width: 290, height: 16, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={captionStatusInfo ?? ''}
                            textOptions={{ wordWrap: true, wordWrapWidth: 285 }}
                            name="status_info"
                            verticalAlign="top"
                            layout={{ width: 285, height: 45, flexShrink: 0 }}
                        />
                    </Region>
                </Region>
                <Region layout={{ width: 420, height: 208, flexShrink: 0, flexDirection: 'column' }}>
                    <Region
                        name="special_content"
                        layout={{ width: 420, height: 134, flexShrink: 0 }}
                    >
                        <Border
                            variant="3"
                            tintColor="#53a3cb"
                            layout={{ position: 'absolute', left: 0, width: 412, top: 0, height: 128 }}
                        >
                            <ThemeText
                                text={captionSpecialTitle ?? t('hccenter.special.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#ffffff' }}
                                name="special_title"
                                layout={{ position: 'absolute', left: 16, width: 180, top: 16, height: 22 }}
                            />
                            <ThemeText
                                text={captionSpecialInfo ?? t('hccenter.special.info')}
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 180 }}
                                name="special_info"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 16, width: 180, top: 36, height: 56 }}
                            />
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
                    <Border
                        variant="3"
                        name="gift_content"
                        tintColor="#54c32e"
                        layout={{ width: 412, height: 74, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={captionGiftTitle ?? t('hccenter.gift.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                            name="gift_title"
                            layout={{ position: 'absolute', left: 16, width: 250, top: 16, height: 22 }}
                        />
                        <ThemeText
                            text={captionGiftInfo ?? t('hccenter.gift.info')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 250 }}
                            name="gift_info"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 16, width: 250, top: 36, height: 32 }}
                        />
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
                <Region
                    name="footer"
                    layout={{ width: 460, height: 139, flexShrink: 0 }}
                >
                    <ThemeText
                        text={captionGeneralTitle ?? t('hccenter.general.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#4a8eb1' }}
                        name="general_title"
                        layout={{ position: 'absolute', left: 36, width: 190, top: 6, height: 22 }}
                    />
                    <ThemeText
                        text={captionGeneralInfo ?? t('hccenter.general.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 174 }}
                        name="general_info"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 36, width: 174, top: 28, height: 97 }}
                    />
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
            </Region>
            <WidgetSlot
                widgetType="room_previewer"
                name="avatar"
                options={{ 'room_previewer:offsety': '-30', 'room_previewer:zoom': '2' }}
                layout={{ position: 'absolute', left: 360, width: 90, top: 14, height: 130 }}
            >
                {avatar}
            </WidgetSlot>
            <ClubCenterLayoutSpecialContentPostit {...specialContentPostit} />
        </Frame>
    );
};
