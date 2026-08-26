import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage } from '#base/theme';

/** Generated from `835_packagecard_new_opened_xml` (layout "packagecard_new_opened", 342x360) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PackagecardNewOpenedLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onGiveGiftButton?: () => void;
    onKeepInRoomButton?: () => void;
    onPlaceInRoomButton?: () => void;
    onPutInInventoryButton?: () => void;
}

export const PackagecardNewOpenedLayout = ({ layout, onClose, onGiveGiftButton, onKeepInRoomButton, onPlaceInRoomButton, onPutInInventoryButton }: PackagecardNewOpenedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={33025}
            caption={t('widget.furni.present.window.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 342, height: 360, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={147472}
                    backgroundColor="#e9e9e9"
                    layout={{ position: 'absolute', left: 0, width: 336, top: 0, height: 305 }}
                >
                    <Region
                        name="element_list"
                        params={4341777}
                        layout={{ position: 'absolute', left: 0, width: 336, top: 0, height: 305, flexDirection: 'column', gap: 10 }}
                    >
                        <Region
                            name="message_element_list"
                            params={4194321}
                            layout={{ width: 275, height: 100, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                        >
                            <Region
                                name="image_container"
                                params={12582928}
                                layout={{ width: 81, height: 81, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    name="image_bg"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 80 }}
                                />
                                <ThemeImage
                                    name="gift_image"
                                    params={16}
                                    src={undefined}
                                    layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 80 }}
                                />
                            </Region>
                            <Region
                                name="message_container"
                                params={16515088}
                                layout={{ width: 184, height: 81, flexShrink: 0 }}
                            >
                                <Region
                                    name="gift_message"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 184, top: 20, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="button_list"
                            params={16662545}
                            layout={{ width: 336, height: 115, flexShrink: 0, flexDirection: 'column', gap: 10 }}
                        >
                            <ButtonThick
                                variant="3"
                                name="keep_in_room_button"
                                params={12714001}
                                onPointerTap={onKeepInRoomButton}
                                layout={{ width: 224, height: 28, flexShrink: 0, minWidth: 206 }}
                            >
                                {t('widget.furni.present.keep_in_room')}
                            </ButtonThick>
                            <ButtonThick
                                variant="3"
                                name="place_in_room_button"
                                params={12714001}
                                onPointerTap={onPlaceInRoomButton}
                                layout={{ width: 226, height: 28, flexShrink: 0, minWidth: 206 }}
                            >
                                {t('widget.furni.present.place_in_room')}
                            </ButtonThick>
                            <Button
                                variant="3"
                                name="put_in_inventory_button"
                                params={12714001}
                                onPointerTap={onPutInInventoryButton}
                                layout={{ width: 230, height: 28, flexShrink: 0, minWidth: 206 }}
                            >
                                {t('widget.furni.present.put_in_inventory')}
                            </Button>
                            <Region
                                name="separator"
                                params={16}
                                layout={{ width: 336, height: 1, flexShrink: 0 }}
                            />
                        </Region>
                        <Region
                            name="give_element_list"
                            params={16662545}
                            layout={{ width: 336, height: 70, flexShrink: 0, minWidth: 336, maxWidth: 336, flexDirection: 'column', gap: 10 }}
                        >
                            <Region
                                name="give_container"
                                params={16401}
                                backgroundColor="#96a4a5"
                                layout={{ width: 336, height: 70, flexShrink: 0, minWidth: 336, maxWidth: 336 }}
                            >
                                <ButtonThick
                                    variant="5"
                                    name="give_gift_button"
                                    params={16649425}
                                    tintColor="#00aa00"
                                    onPointerTap={onGiveGiftButton}
                                    layout={{ position: 'absolute', left: 0, width: 246, top: 0, height: 28, minWidth: 246, maxWidth: 330 }}
                                >
                                    {t('widget.furni.present.give_gift')}
                                </ButtonThick>
                                <Region
                                    name="avatar_image_container"
                                    params={3407888}
                                    layout={{ position: 'absolute', left: 290, width: 45, top: 13, height: 45 }}
                                >
                                    <Region
                                        name="avatar_image_region"
                                        tooltip={t('widget.furni.present.sender.profile_tooltip')}
                                        params={3935441}
                                        layout={{ position: 'absolute', left: 0, width: 45, top: 0, height: 45 }}
                                    >
                                        <ThemeImage
                                            name="avatar_image"
                                            params={16}
                                            src={undefined}
                                            layout={{ position: 'absolute', left: 0, width: 45, top: 0, height: 45 }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
