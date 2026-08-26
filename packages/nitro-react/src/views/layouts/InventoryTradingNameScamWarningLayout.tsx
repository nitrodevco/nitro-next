import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1310_inventory_trading_name_scam_warning_xml` (layout "inventory_trading_name_scam_warning", 356x333) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingNameScamWarningLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
    onOpenProfileButton?: () => void;
}

export const InventoryTradingNameScamWarningLayout = ({ layout, onClose, onCloseButton, onOpenProfileButton }: InventoryTradingNameScamWarningLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="inventory_trading_name_scam_warning_frame"
            name="inventory_trading_name_scam_warning_frame"
            params={32769}
            caption={t('inventory.trading.namescam.title')}
            tintColor="#d43d59"
            onClose={onClose}
            layout={{ width: 356, height: 333, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="content_list"
                    params={8388752}
                    layout={{ position: 'absolute', left: 10, width: 330, top: 8, height: 280, flexDirection: 'column', gap: 8 }}
                >
                    <Region
                        name="warning_text"
                        params={144}
                        layout={{ width: 330, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('inventory.trading.namescam.warning')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                        />
                    </Region>
                    <Border
                        variant="4"
                        name="trader_section"
                        params={144}
                        tintColor="#f1f1f1"
                        layout={{ width: 330, height: 58, flexShrink: 0 }}
                    >
                        <WidgetSlot
                            widgetType="avatar_image"
                            name="trader_avatar"
                            params={16}
                            options={{ 'avatar_image:only_head': 'true' }}
                            layout={{ position: 'absolute', left: -10, width: 90, top: -24, height: 130 }}
                        />
                        <Region
                            name="trader_label"
                            params={16}
                            layout={{ position: 'absolute', left: 63, width: 72, top: 11, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('inventory.trading.namescam.trader')}
                                textOptions={{ fill: '#555555' }}
                            />
                        </Region>
                        <Region
                            name="trader_name_text"
                            params={16}
                            layout={{ position: 'absolute', left: 63, width: 44, top: 29, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Habbo" />
                        </Region>
                        <Button
                            variant="3"
                            name="open_profile_button"
                            params={393297}
                            onPointerTap={onOpenProfileButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ position: 'absolute', left: 224, width: 90, top: 16, height: 26 }}
                        >
                            {t('inventory.trading.namescam.open_profile')}
                        </Button>
                    </Border>
                    <Region
                        name="room_matches_section"
                        params={144}
                        layout={{ width: 330, height: 58, flexShrink: 0 }}
                    >
                        <Region
                            name="room_matches_header"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 138, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('inventory.trading.namescam.similar_in_room')} />
                        </Region>
                        <Region
                            name="room_matches_text"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 330, top: 20, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="User 1"
                                textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="friend_matches_section"
                        params={144}
                        layout={{ width: 330, height: 58, flexShrink: 0 }}
                    >
                        <Region
                            name="friend_matches_header"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 172, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('inventory.trading.namescam.similar_in_friends')} />
                        </Region>
                        <Region
                            name="friend_matches_text"
                            params={144}
                            layout={{ position: 'absolute', left: 0, width: 330, top: 20, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Friend 1"
                                textOptions={{ wordWrap: true, wordWrapWidth: 330 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="button_container"
                        params={786640}
                        layout={{ width: 73, height: 30, flexShrink: 0, flexDirection: 'row', gap: 7 }}
                    >
                        <Button
                            variant="3"
                            name="close_button"
                            params={131089}
                            onPointerTap={onCloseButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: 50, height: 26, flexShrink: 0 }}
                        >
                            {t('inventory.trading.namescam.close')}
                        </Button>
                        <Region
                            name="close_countdown_text"
                            params={16}
                            layout={{ width: 16, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="3s"
                                textOptions={{ fill: '#555555' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
