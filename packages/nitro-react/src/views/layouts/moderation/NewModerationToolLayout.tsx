import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeText } from '#base/theme';

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

/** Named region `send_warning_view` of NewModerationToolLayout - configured through the parent's `sendWarningView` prop. */
export interface NewModerationToolLayoutSendWarningViewProps {
    captionTextTxt?: string;
    captionUserTxt?: string;
    layout?: BoxLayout;
    onSendWarningBtn?: () => void;
    visibleSendWarningView?: boolean;
}

export const NewModerationToolLayoutSendWarningView = ({ captionTextTxt, captionUserTxt, layout, onSendWarningBtn, visibleSendWarningView }: NewModerationToolLayoutSendWarningViewProps) => {
    const t = useTranslation();
    const [ warningUsernameInputValue, setWarningUsernameInputValue ] = useState('');
    const [ warningInputValue, setWarningInputValue ] = useState('');

    return (
        (visibleSendWarningView ?? false) && (
            <Region
                name="send_warning_view"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <Region
                    name="user_txt"
                    layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUserTxt ?? t('moderation.warning.user')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 9, right: 12, top: 29, height: 26 }}
                >
                    <TextInput
                        value={warningUsernameInputValue}
                        onChange={setWarningUsernameInputValue}
                        layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
                    />
                </Border>
                <Region
                    name="text_txt"
                    layout={{ position: 'absolute', left: 9, width: 72, top: 59, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextTxt ?? t('moderation.warning.text')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 9, right: 12, top: 81, height: 44 }}
                >
                    <TextInput
                        value={warningInputValue}
                        onChange={setWarningInputValue}
                        multiline
                        layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
                    />
                </Border>
                <Button
                    variant="103"
                    name="send_warning_btn"
                    onPointerTap={onSendWarningBtn}
                    layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                >
                    {t('moderation.warning.send')}
                </Button>
            </Region>
        )
    );
};

/** Named region `give_coins_view` of NewModerationToolLayout - configured through the parent's `giveCoinsView` prop. */
export interface NewModerationToolLayoutGiveCoinsViewProps {
    captionAmountTxt?: string;
    captionUserTxt?: string;
    layout?: BoxLayout;
    onAddCoinsBtn?: () => void;
    onMinusBtnCoins?: () => void;
    onPlusBtnCoins?: () => void;
    visibleGiveCoinsView?: boolean;
}

export const NewModerationToolLayoutGiveCoinsView = ({ captionAmountTxt, captionUserTxt, layout, onAddCoinsBtn, onMinusBtnCoins, onPlusBtnCoins, visibleGiveCoinsView }: NewModerationToolLayoutGiveCoinsViewProps) => {
    const t = useTranslation();
    const [ giveCoinsUsernameInputValue, setGiveCoinsUsernameInputValue ] = useState('');
    const [ amountCoinsInputValue, setAmountCoinsInputValue ] = useState('');

    return (
        (visibleGiveCoinsView ?? false) && (
            <Region
                name="give_coins_view"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <Region
                    name="user_txt"
                    layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUserTxt ?? t('moderation.give_coins.user')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 9, right: 12, top: 29, height: 26 }}
                >
                    <TextInput
                        value={giveCoinsUsernameInputValue}
                        onChange={setGiveCoinsUsernameInputValue}
                        layout={{ position: 'absolute', left: 5, right: 8, top: 5, bottom: 5 }}
                    />
                </Border>
                <Region
                    name="amount_txt"
                    layout={{ position: 'absolute', left: 9, width: 131, top: 66, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAmountTxt ?? t('moderation.give_coins.amount')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 10, right: 142, top: 87, height: 26 }}
                >
                    <TextInput
                        value={amountCoinsInputValue}
                        onChange={setAmountCoinsInputValue}
                        multiline
                        layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
                    />
                </Border>
                <Button
                    variant="103"
                    name="add_coins_btn"
                    onPointerTap={onAddCoinsBtn}
                    layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                >
                    {t('moderation.give_coins.add')}
                </Button>
                <ContainerButton
                    variant="4"
                    name="minus_btn_coins"
                    onPointerTap={onMinusBtnCoins}
                    layout={{ position: 'absolute', left: 103, width: 30, top: 89, height: 30 }}
                />
                <ContainerButton
                    variant="3"
                    name="plus_btn_coins"
                    onPointerTap={onPlusBtnCoins}
                    layout={{ position: 'absolute', left: 132, width: 30, top: 89, height: 30 }}
                />
            </Region>
        )
    );
};

/** Named region `give_furni_view` of NewModerationToolLayout - configured through the parent's `giveFurniView` prop. */
export interface NewModerationToolLayoutGiveFurniViewProps {
    captionAmountTxt?: string;
    captionProductNameTxt?: string;
    captionUserTxt?: string;
    layout?: BoxLayout;
    onAddFurniBtn?: () => void;
    onMinusBtnFurni?: () => void;
    onPlusBtnFurni?: () => void;
}

export const NewModerationToolLayoutGiveFurniView = ({ captionAmountTxt, captionProductNameTxt, captionUserTxt, layout, onAddFurniBtn, onMinusBtnFurni, onPlusBtnFurni }: NewModerationToolLayoutGiveFurniViewProps) => {
    const t = useTranslation();
    const [ giveFurniUsernameInputValue, setGiveFurniUsernameInputValue ] = useState('');
    const [ amountFurniInputValue, setAmountFurniInputValue ] = useState('');
    const [ productNameInputValue, setProductNameInputValue ] = useState('');

    return (
        <Region
            name="give_furni_view"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="user_txt"
                layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUserTxt ?? t('moderation.give_furni.user')}
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 9, right: 12, top: 29, height: 26 }}
            >
                <TextInput
                    value={giveFurniUsernameInputValue}
                    onChange={setGiveFurniUsernameInputValue}
                    layout={{ position: 'absolute', left: 5, right: 8, top: 5, bottom: 5 }}
                />
            </Border>
            <Region
                name="amount_txt"
                layout={{ position: 'absolute', left: 134, width: 45, top: 66, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAmountTxt ?? t('moderation.give_furni.amount')}
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 134, right: 70, top: 87, height: 26 }}
            >
                <TextInput
                    value={amountFurniInputValue}
                    onChange={setAmountFurniInputValue}
                    multiline
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 5 }}
                />
            </Border>
            <Region
                name="product_name_txt"
                layout={{ position: 'absolute', left: 9, width: 76, top: 66, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionProductNameTxt ?? t('moderation.give_furni.product')}
                    textOptions={{ fill: '#333333' }}
                />
            </Region>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 9, right: 119, top: 87, height: 26 }}
            >
                <TextInput
                    value={productNameInputValue}
                    onChange={setProductNameInputValue}
                    layout={{ position: 'absolute', left: 5, right: 8, top: 5, bottom: 5 }}
                />
            </Border>
            <ContainerButton
                variant="4"
                name="minus_btn_furni"
                onPointerTap={onMinusBtnFurni}
                layout={{ position: 'absolute', left: 175, width: 30, top: 89, height: 30 }}
            />
            <ContainerButton
                variant="3"
                name="plus_btn_furni"
                onPointerTap={onPlusBtnFurni}
                layout={{ position: 'absolute', left: 204, width: 30, top: 89, height: 30 }}
            />
            <Button
                variant="103"
                name="add_furni_btn"
                onPointerTap={onAddFurniBtn}
                layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
            >
                {t('moderation.give_furni.add')}
            </Button>
        </Region>
    );
};

/** Named region `ban_view` of NewModerationToolLayout - configured through the parent's `banView` prop. */
export interface NewModerationToolLayoutBanViewProps {
    captionUserTxt?: string;
    layout?: BoxLayout;
    onBanBtn?: () => void;
    onBanRadio?: () => void;
    onDurationSelector?: () => void;
    onUnbanRadio?: () => void;
    visibleBanView?: boolean;
}

export const NewModerationToolLayoutBanView = ({ captionUserTxt, layout, onBanBtn, onBanRadio, onDurationSelector, onUnbanRadio, visibleBanView }: NewModerationToolLayoutBanViewProps) => {
    const t = useTranslation();
    const [ banUsernameInputValue, setBanUsernameInputValue ] = useState('');

    return (
        (visibleBanView ?? false) && (
            <Region
                name="ban_view"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <Region
                    name="user_txt"
                    layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUserTxt ?? t('moderation.ban_management.user')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Border
                    variant="105"
                    layout={{ position: 'absolute', left: 9, right: 12, top: 29, height: 26 }}
                >
                    <TextInput
                        value={banUsernameInputValue}
                        onChange={setBanUsernameInputValue}
                        layout={{ position: 'absolute', left: 5, right: 8, top: 5, bottom: 5 }}
                    />
                </Border>
                <Region
                    name="ban_type"
                    layout={{ position: 'absolute', left: 13, right: 15, top: 62, height: 54 }}
                >
                    <RadioButton
                        variant="100"
                        name="unban_radio"
                        onPointerTap={onUnbanRadio}
                        layout={{ position: 'absolute', left: 0, width: 13, top: 25, height: 16, minHeight: 16, maxHeight: 16 }}
                    />
                    <RadioButton
                        variant="100"
                        name="ban_radio"
                        onPointerTap={onBanRadio}
                        layout={{ position: 'absolute', left: 0, width: 12, top: 4, height: 16, minHeight: 16, maxHeight: 16 }}
                    />
                </Region>
                <Button
                    variant="103"
                    name="ban_btn"
                    onPointerTap={onBanBtn}
                    layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                >
                    {t('moderation.ban_management.do')}
                </Button>
                <Region layout={{ position: 'absolute', left: 28, width: 47, top: 65, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('moderation.ban_management.ban')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 28, width: 63, top: 86, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('moderation.ban_management.unban')}
                        textOptions={{ fill: '#333333' }}
                    />
                </Region>
                <Dropmenu
                    variant="100"
                    name="duration_selector"
                    onPointerTap={onDurationSelector}
                    layout={{ position: 'absolute', right: 13, width: 101, top: 63, height: 22 }}
                >
                    1 Month
                </Dropmenu>
            </Region>
        )
    );
};

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
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 33, ...layout }}
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
                    <Region
                        name="hotel_alert_txt"
                        layout={{ position: 'absolute', left: 9, width: 106, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionHotelAlertTxt ?? t('moderation.hotel_alert.title')}
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
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
