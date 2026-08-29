import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region } from '#base/theme';

import { NewModerationToolLayoutSubviewWrapper, NewModerationToolLayoutSubviewWrapperProps } from './NewModerationToolLayoutSubviewWrapper';

/** Generated from `1126_new_moderation_tool_xml` (layout "new_moderation_tool", 238x206) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewModerationToolLayoutProps {
    layout?: BoxLayout;
    onBanUserBtn?: () => void;
    onClose?: () => void;
    onGiveCoinsBtn?: () => void;
    onGiveFurniBtn?: () => void;
    onHotelAlertBtn?: () => void;
    onSendWarningBtn?: () => void;
    subviewWrapper?: NewModerationToolLayoutSubviewWrapperProps;
    visibleMainView?: boolean;
}

export const NewModerationToolLayout = ({ layout, onBanUserBtn, onClose, onGiveCoinsBtn, onGiveFurniBtn, onHotelAlertBtn, onSendWarningBtn, subviewWrapper, visibleMainView }: NewModerationToolLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('moderation.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 238, height: 206, ...layout }}
        >
            {(visibleMainView ?? false) && (
                <Region
                    name="main_view"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 33 }}
                >
                    <Region layout={{ position: 'absolute', left: 11, right: 12, top: 7, height: 154, flexDirection: 'column', gap: 7 }}>
                        <Button
                            variant="102"
                            name="ban_user_btn"
                            tintColor="#eeeeee"
                            onPointerTap={onBanUserBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.ban_users')}
                        </Button>
                        <Button
                            variant="102"
                            name="hotel_alert_btn"
                            tintColor="#eeeeee"
                            onPointerTap={onHotelAlertBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.hotel_alert')}
                        </Button>
                        <Button
                            variant="102"
                            name="send_warning_btn"
                            tintColor="#eeeeee"
                            onPointerTap={onSendWarningBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.send_warning')}
                        </Button>
                        <Button
                            variant="102"
                            name="give_coins_btn"
                            tintColor="#eeeeee"
                            onPointerTap={onGiveCoinsBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.give_coins')}
                        </Button>
                        <Button
                            variant="102"
                            name="give_furni_btn"
                            tintColor="#eeeeee"
                            onPointerTap={onGiveFurniBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.give_furni')}
                        </Button>
                    </Region>
                </Region>
            )}
            <NewModerationToolLayoutSubviewWrapper {...subviewWrapper} />
        </Frame>
    );
};
