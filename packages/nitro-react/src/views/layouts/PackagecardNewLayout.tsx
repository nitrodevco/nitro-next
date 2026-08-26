import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `959_packagecard_new_xml` (layout "packagecard_new", 334x355) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardNewLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onGiveGiftButton?: () => void;
    onMessageFrom?: () => void;
    onOpenGiftButton?: () => void;
}

export const PackagecardNewLayout = ({ layout, onClose, onGiveGiftButton, onMessageFrom, onOpenGiftButton }: PackagecardNewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={164097}
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 334, height: 355, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={935952}
                    layout={{ position: 'absolute', left: 0, width: 326, top: 0, height: 312, minWidth: 326, maxWidth: 380, maxHeight: 345 }}
                >
                    <Region
                        name="element_list"
                        params={12730385}
                        layout={{ position: 'absolute', left: 10, width: 306, top: 10, height: 302, minWidth: 306, maxWidth: 306, flexDirection: 'column', gap: 10 }}
                    >
                        <Region
                            name="warning"
                            params={8273936}
                            layout={{ width: 306, height: 56, flexShrink: 0 }}
                        >
                            <Border
                                variant="3"
                                name="warning_background_border"
                                params={4063248}
                                tintColor="#000000"
                                layout={{ position: 'absolute', left: 0, width: 306, top: 0, height: 56 }}
                            >
                                <Region
                                    params={150736}
                                    layout={{ position: 'absolute', left: 3, width: 300, top: 0, height: 56, flexDirection: 'column' }}
                                >
                                    <Region
                                        name="top-spacer"
                                        params={16}
                                        layout={{ width: 300, height: 3, flexShrink: 0 }}
                                    />
                                    <Border
                                        variant="3"
                                        name="warning_foreground_border"
                                        params={4079632}
                                        tintColor="#186e09"
                                        layout={{ width: 300, height: 50, flexShrink: 0 }}
                                    >
                                        <Region
                                            name="warning_text"
                                            params={3296272}
                                            layout={{ position: 'absolute', left: 65, width: 235, top: 10, height: 30, minWidth: 235, maxWidth: 235, minHeight: 30, maxHeight: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text={t('gift.trusted.banner.text')}
                                                textStyle="text-style-id-regular"
                                                textOptions={{ wordWrap: true, wordWrapWidth: 235 }}
                                            />
                                        </Region>
                                        <Region
                                            name="warning_icon_container"
                                            params={3148816}
                                            layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 50, maxWidth: 70 }}
                                        >
                                            <ThemeImage
                                                name="warning_icon"
                                                params={3932176}
                                                src={layoutImage('catalogue_ui2_checkmark_m.png')}
                                                layout={{ position: 'absolute', left: 20, width: 30, top: 13, height: 24 }}
                                            />
                                        </Region>
                                    </Border>
                                    <Region
                                        name="bottom-spacer"
                                        params={16}
                                        layout={{ width: 300, height: 3, flexShrink: 0 }}
                                    />
                                </Region>
                            </Border>
                        </Region>
                        <Region
                            name="gift_card_container"
                            params={13369360}
                            layout={{ width: 306, height: 149, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="gift_card"
                                params={16}
                                src={layoutImage('catalogue_giftcard_blank.png')}
                                layout={{ position: 'absolute', left: 0, width: 306, top: 0, height: 149 }}
                            />
                            <Region
                                name="avatar_image_container"
                                params={3932176}
                                layout={{ position: 'absolute', left: 6, width: 60, top: 2, height: 140, minWidth: 60, maxWidth: 60, minHeight: 140, maxHeight: 140 }}
                            >
                                <Region
                                    name="avatar_image_region"
                                    tooltip={t('widget.furni.present.sender.profile_tooltip')}
                                    params={3935441}
                                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 140 }}
                                >
                                    <ThemeImage
                                        name="avatar_image"
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 11, width: 37, top: 74, height: 48 }}
                                    />
                                    <Region
                                        name="staff_image"
                                        params={3932176}
                                        layout={{ position: 'absolute', left: 3, width: 54, top: 20, height: 54 }}
                                    >
                                        <ThemeImage
                                            name="staff_image_background"
                                            params={3932176}
                                            src={layoutImage('catalogue_giftcard_icon_bgstar.png')}
                                            layout={{ position: 'absolute', left: 0, width: 54, top: 0, height: 54 }}
                                        />
                                        <ThemeImage
                                            name="staff_image_foreground"
                                            params={3934224}
                                            src={layoutImage('catalogue_giftcard_staff_icon.png')}
                                            layout={{ position: 'absolute', left: 10, width: 34, top: 10, height: 34 }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                            <Region
                                name="message_text"
                                params={1}
                                layout={{ position: 'absolute', left: 95, width: 190, top: 31, height: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            />
                            <Region
                                name="message_from"
                                tooltip={t('widget.furni.present.sender.profile_tooltip')}
                                params={1}
                                layout={{ position: 'absolute', left: 95, width: 190, top: 120, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                                onPointerTap={onMessageFrom}
                                cursor="pointer"
                            />
                        </Region>
                        <Region
                            name="button_list"
                            params={12730385}
                            layout={{ width: 306, height: 66, flexShrink: 0, minWidth: 330, maxWidth: 306, flexDirection: 'column', gap: 10 }}
                        >
                            <ButtonThick
                                variant="5"
                                name="open_gift_button"
                                params={147665}
                                tintColor="#00aa00"
                                onPointerTap={onOpenGiftButton}
                                layout={{ width: 206, height: 28, flexShrink: 0, minWidth: 206, maxWidth: 328, minHeight: 28 }}
                            >
                                {t('widget.furni.present.open_gift')}
                            </ButtonThick>
                            <Button
                                variant="3"
                                name="give_gift_button"
                                params={131281}
                                onPointerTap={onGiveGiftButton}
                                layout={{ width: 206, height: 28, flexShrink: 0, minWidth: 206, maxWidth: 330, minHeight: 28 }}
                            >
                                {t('widget.furni.present.give_gift')}
                            </Button>
                        </Region>
                        <Region
                            name="separator"
                            params={3932176}
                            layout={{ width: 306, height: 1, flexShrink: 0 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
