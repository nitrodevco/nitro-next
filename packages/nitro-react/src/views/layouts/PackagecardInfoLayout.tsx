import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `941_packagecard_info_xml` (layout "packagecard_new", 342x298) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardInfoLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onGiveGiftButton?: () => void;
    onMessageFrom?: () => void;
    onOpenGiftButton?: () => void;
}

export const PackagecardInfoLayout = ({ layout, onClose, onGiveGiftButton, onMessageFrom, onOpenGiftButton }: PackagecardInfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={33025}
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 342, height: 298, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={147472}
                    layout={{ position: 'absolute', left: -2, width: 336, top: 0, height: 246, minWidth: 330, maxWidth: 380 }}
                >
                    <Region
                        name="element_list"
                        params={13516817}
                        layout={{ position: 'absolute', left: 0, width: 336, top: 0, height: 246, minWidth: 330, maxWidth: 370, flexDirection: 'column', gap: 10 }}
                    >
                        <Region
                            name="gift_card_container"
                            params={12583120}
                            layout={{ width: 330, height: 159, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="gift_card"
                                params={16}
                                src={layoutImage('catalogue_giftcard_blank.png')}
                                layout={{ position: 'absolute', left: 10, width: 306, top: 10, height: 149 }}
                            />
                            <Region
                                name="avatar_image_container"
                                params={16}
                                layout={{ position: 'absolute', left: 15, width: 60, top: 5, height: 149, minWidth: 60, maxWidth: 60, minHeight: 149, maxHeight: 149 }}
                            >
                                <Region
                                    name="avatar_image_region"
                                    tooltip={t('widget.furni.present.sender.profile_tooltip')}
                                    params={3935441}
                                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 149 }}
                                >
                                    <ThemeImage
                                        name="avatar_image"
                                        params={16}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 149 }}
                                    />
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
                                layout={{ position: 'absolute', left: 95, width: 190, top: 123, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                                onPointerTap={onMessageFrom}
                                cursor="pointer"
                            />
                        </Region>
                        <Region
                            name="button_list"
                            params={12730385}
                            layout={{ width: 330, height: 66, flexShrink: 0, minWidth: 330, maxWidth: 360, flexDirection: 'column', gap: 10 }}
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
                            params={16}
                            layout={{ width: 336, height: 1, flexShrink: 0 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
