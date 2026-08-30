import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Icon, Region, TextInput, ThemeText } from '#base/theme';

import { NewModerationToolLayoutBanView, NewModerationToolLayoutBanViewProps } from './NewModerationToolLayoutBanView';
import { NewModerationToolLayoutGiveCoinsView, NewModerationToolLayoutGiveCoinsViewProps } from './NewModerationToolLayoutGiveCoinsView';
import { NewModerationToolLayoutGiveFurniView, NewModerationToolLayoutGiveFurniViewProps } from './NewModerationToolLayoutGiveFurniView';
import { NewModerationToolLayoutSendWarningView, NewModerationToolLayoutSendWarningViewProps } from './NewModerationToolLayoutSendWarningView';

/** Named region `subview_wrapper` of NewModerationToolLayout - configured through the parent's `subviewWrapper` prop. */
export interface NewModerationToolLayoutSubviewWrapperProps {
    banView?: NewModerationToolLayoutBanViewProps;
    captionHotelAlertTxt?: string;
    giveCoinsView?: NewModerationToolLayoutGiveCoinsViewProps;
    giveFurniView?: NewModerationToolLayoutGiveFurniViewProps;
    layout?: BoxLayout;
    onReturnBtn?: () => void;
    onSendHotelAlertBtn?: () => void;
    sendWarningView?: NewModerationToolLayoutSendWarningViewProps;
    visibleBanView?: boolean;
    visibleGiveCoinsView?: boolean;
    visibleHotelAlertView?: boolean;
    visibleSendWarningView?: boolean;
}

export const NewModerationToolLayoutSubviewWrapper = ({ banView, captionHotelAlertTxt, giveCoinsView, giveFurniView, layout, onReturnBtn, onSendHotelAlertBtn, sendWarningView, visibleBanView, visibleGiveCoinsView, visibleHotelAlertView, visibleSendWarningView }: NewModerationToolLayoutSubviewWrapperProps) => {
    const t = useTranslation();
    const [ hotelAlertInputValue, setHotelAlertInputValue ] = useState('');

    return (
        <Region
            name="subview_wrapper"
            layout={{ position: 'absolute', left: 0, right: -12, top: 0, bottom: -8, ...layout }}
        >
            <ContainerButton
                variant="103"
                name="return_btn"
                onPointerTap={onReturnBtn}
                layout={{ position: 'absolute', left: 9, width: 27, top: 133, height: 26 }}
            >
                <Icon
                    variant="2"
                    tintColor="#555555"
                    layout={{ position: 'absolute', left: 8, width: 14, top: 9, height: 11 }}
                />
            </ContainerButton>
            {(visibleHotelAlertView ?? false) && (
                <Region
                    name="hotel_alert_view"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <ThemeText
                        text={captionHotelAlertTxt ?? t('moderation.hotel_alert.title')}
                        textOptions={{ fill: '#333333' }}
                        name="hotel_alert_txt"
                        layout={{ position: 'absolute', left: 9, width: 106, top: 8, height: 16 }}
                    />
                    <Border
                        variant="105"
                        name="message_border"
                        layout={{ position: 'absolute', left: 9, right: 12, top: 29, height: 96 }}
                    >
                        <TextInput
                            value={hotelAlertInputValue}
                            onChange={setHotelAlertInputValue}
                            multiline
                            layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
                        />
                    </Border>
                    <Button
                        variant="103"
                        name="send_hotel_alert_btn"
                        onPointerTap={onSendHotelAlertBtn}
                        layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                    >
                        {t('moderation.hotel_alert.send')}
                    </Button>
                </Region>
            )}
            {(visibleSendWarningView ?? false) && (
                <NewModerationToolLayoutSendWarningView {...sendWarningView} />
            )}
            {(visibleGiveCoinsView ?? false) && (
                <NewModerationToolLayoutGiveCoinsView {...giveCoinsView} />
            )}
            <NewModerationToolLayoutGiveFurniView {...giveFurniView} />
            {(visibleBanView ?? false) && (
                <NewModerationToolLayoutBanView {...banView} />
            )}
        </Region>
    );
};
