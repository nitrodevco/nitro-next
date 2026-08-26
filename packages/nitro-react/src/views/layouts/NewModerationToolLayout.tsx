import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1126_new_moderation_tool_xml` (layout "new_moderation_tool", 238x206) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewModerationToolLayoutProps {
    layout?: BoxLayout;
    onAddCoinsBtn?: () => void;
    onAddFurniBtn?: () => void;
    onBanBtn?: () => void;
    onBanRadio?: () => void;
    onBanUserBtn?: () => void;
    onClose?: () => void;
    onDurationSelector?: () => void;
    onGiveCoinsBtn?: () => void;
    onGiveFurniBtn?: () => void;
    onHotelAlertBtn?: () => void;
    onMinusBtnCoins?: () => void;
    onMinusBtnFurni?: () => void;
    onPlusBtnCoins?: () => void;
    onPlusBtnFurni?: () => void;
    onReturnBtn?: () => void;
    onSendHotelAlertBtn?: () => void;
    onSendWarningBtn?: () => void;
    onSendWarningBtn2?: () => void;
    onUnbanRadio?: () => void;
}

export const NewModerationToolLayout = ({ layout, onAddCoinsBtn, onAddFurniBtn, onBanBtn, onBanRadio, onBanUserBtn, onClose, onDurationSelector, onGiveCoinsBtn, onGiveFurniBtn, onHotelAlertBtn, onMinusBtnCoins, onMinusBtnFurni, onPlusBtnCoins, onPlusBtnFurni, onReturnBtn, onSendHotelAlertBtn, onSendWarningBtn, onSendWarningBtn2, onUnbanRadio }: NewModerationToolLayoutProps) => {
    const t = useTranslation();
    const [ hotelAlertInputValue, setHotelAlertInputValue ] = useState('');
    const [ warningUsernameInputValue, setWarningUsernameInputValue ] = useState('');
    const [ warningInputValue, setWarningInputValue ] = useState('');
    const [ giveCoinsUsernameInputValue, setGiveCoinsUsernameInputValue ] = useState('');
    const [ amountCoinsInputValue, setAmountCoinsInputValue ] = useState('');
    const [ giveFurniUsernameInputValue, setGiveFurniUsernameInputValue ] = useState('');
    const [ amountFurniInputValue, setAmountFurniInputValue ] = useState('');
    const [ productNameInputValue, setProductNameInputValue ] = useState('');
    const [ banUsernameInputValue, setBanUsernameInputValue ] = useState('');

    return (
        <Frame
            variant="100"
            params={32769}
            caption={t('moderation.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 238, height: 206, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="main_view"
                    params={2192}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 173 }}
                >
                    <Region
                        params={144}
                        layout={{ position: 'absolute', left: 11, width: 215, top: 7, height: 154, flexDirection: 'column', gap: 7 }}
                    >
                        <Button
                            variant="102"
                            name="ban_user_btn"
                            params={131089}
                            tintColor="#eeeeee"
                            onPointerTap={onBanUserBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.ban_users')}
                        </Button>
                        <Button
                            variant="102"
                            name="hotel_alert_btn"
                            params={131089}
                            tintColor="#eeeeee"
                            onPointerTap={onHotelAlertBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.hotel_alert')}
                        </Button>
                        <Button
                            variant="102"
                            name="send_warning_btn"
                            params={131089}
                            tintColor="#eeeeee"
                            onPointerTap={onSendWarningBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.send_warning')}
                        </Button>
                        <Button
                            variant="102"
                            name="give_coins_btn"
                            params={131089}
                            tintColor="#eeeeee"
                            onPointerTap={onGiveCoinsBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.give_coins')}
                        </Button>
                        <Button
                            variant="102"
                            name="give_furni_btn"
                            params={131089}
                            tintColor="#eeeeee"
                            onPointerTap={onGiveFurniBtn}
                            layout={{ width: 214, height: 25, flexShrink: 0, minWidth: 214 }}
                        >
                            {t('moderation.main.give_furni')}
                        </Button>
                    </Region>
                </Region>
                <Region
                    name="subview_wrapper"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 173 }}
                >
                    <ContainerButton
                        variant="103"
                        name="return_btn"
                        params={17}
                        onPointerTap={onReturnBtn}
                        layout={{ position: 'absolute', left: 9, width: 27, top: 133, height: 26 }}
                    >
                        <Icon
                            variant="2"
                            params={16}
                            tintColor="#555555"
                            layout={{ position: 'absolute', left: 8, width: 14, top: 9, height: 11 }}
                        />
                    </ContainerButton>
                    <Region
                        name="hotel_alert_view"
                        params={2192}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 173 }}
                    >
                        <Region
                            name="hotel_alert_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 9, width: 106, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.hotel_alert.title')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Border
                            variant="105"
                            name="message_border"
                            params={144}
                            layout={{ position: 'absolute', left: 9, width: 217, top: 29, height: 96 }}
                        >
                            <TextInput
                                value={hotelAlertInputValue}
                                onChange={setHotelAlertInputValue}
                                multiline
                                layout={{ position: 'absolute', left: 5, width: 207, top: 5, height: 86 }}
                            />
                        </Border>
                        <Button
                            variant="103"
                            name="send_hotel_alert_btn"
                            params={131089}
                            onPointerTap={onSendHotelAlertBtn}
                            layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                        >
                            {t('moderation.hotel_alert.send')}
                        </Button>
                    </Region>
                    <Region
                        name="send_warning_view"
                        params={2192}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 173 }}
                    >
                        <Region
                            name="user_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.warning.user')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Border
                            variant="105"
                            params={144}
                            layout={{ position: 'absolute', left: 9, width: 217, top: 29, height: 26 }}
                        >
                            <TextInput
                                value={warningUsernameInputValue}
                                onChange={setWarningUsernameInputValue}
                                layout={{ position: 'absolute', left: 5, width: 207, top: 5, height: 16 }}
                            />
                        </Border>
                        <Region
                            name="text_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 9, width: 72, top: 59, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.warning.text')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Border
                            variant="105"
                            params={144}
                            layout={{ position: 'absolute', left: 9, width: 217, top: 81, height: 44 }}
                        >
                            <TextInput
                                value={warningInputValue}
                                onChange={setWarningInputValue}
                                multiline
                                layout={{ position: 'absolute', left: 5, width: 207, top: 5, height: 34 }}
                            />
                        </Border>
                        <Button
                            variant="103"
                            name="send_warning_btn"
                            params={131089}
                            onPointerTap={onSendWarningBtn2}
                            layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                        >
                            {t('moderation.warning.send')}
                        </Button>
                    </Region>
                    <Region
                        name="give_coins_view"
                        params={2192}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 173 }}
                    >
                        <Region
                            name="user_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.give_coins.user')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Border
                            variant="105"
                            params={144}
                            layout={{ position: 'absolute', left: 9, width: 217, top: 29, height: 26 }}
                        >
                            <TextInput
                                value={giveCoinsUsernameInputValue}
                                onChange={setGiveCoinsUsernameInputValue}
                                layout={{ position: 'absolute', left: 5, width: 204, top: 5, height: 16 }}
                            />
                        </Border>
                        <Region
                            name="amount_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 9, width: 131, top: 66, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.give_coins.amount')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Border
                            variant="105"
                            params={144}
                            layout={{ position: 'absolute', left: 10, width: 86, top: 87, height: 26 }}
                        >
                            <TextInput
                                value={amountCoinsInputValue}
                                onChange={setAmountCoinsInputValue}
                                multiline
                                layout={{ position: 'absolute', left: 5, width: 76, top: 5, height: 16 }}
                            />
                        </Border>
                        <Button
                            variant="103"
                            name="add_coins_btn"
                            params={131089}
                            onPointerTap={onAddCoinsBtn}
                            layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                        >
                            {t('moderation.give_coins.add')}
                        </Button>
                        <ContainerButton
                            variant="4"
                            name="minus_btn_coins"
                            params={17}
                            onPointerTap={onMinusBtnCoins}
                            layout={{ position: 'absolute', left: 103, width: 30, top: 89, height: 30 }}
                        />
                        <ContainerButton
                            variant="3"
                            name="plus_btn_coins"
                            params={17}
                            onPointerTap={onPlusBtnCoins}
                            layout={{ position: 'absolute', left: 132, width: 30, top: 89, height: 30 }}
                        />
                    </Region>
                    <Region
                        name="give_furni_view"
                        params={2192}
                        layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 173 }}
                    >
                        <Region
                            name="user_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.give_furni.user')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Border
                            variant="105"
                            params={144}
                            layout={{ position: 'absolute', left: 9, width: 217, top: 29, height: 26 }}
                        >
                            <TextInput
                                value={giveFurniUsernameInputValue}
                                onChange={setGiveFurniUsernameInputValue}
                                layout={{ position: 'absolute', left: 5, width: 204, top: 5, height: 16 }}
                            />
                        </Border>
                        <Region
                            name="amount_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 134, width: 45, top: 66, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.give_furni.amount')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Border
                            variant="105"
                            params={144}
                            layout={{ position: 'absolute', left: 134, width: 34, top: 87, height: 26 }}
                        >
                            <TextInput
                                value={amountFurniInputValue}
                                onChange={setAmountFurniInputValue}
                                multiline
                                layout={{ position: 'absolute', left: 5, width: 24, top: 5, height: 16 }}
                            />
                        </Border>
                        <Region
                            name="product_name_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 9, width: 76, top: 66, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.give_furni.product')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Border
                            variant="105"
                            params={144}
                            layout={{ position: 'absolute', left: 9, width: 110, top: 87, height: 26 }}
                        >
                            <TextInput
                                value={productNameInputValue}
                                onChange={setProductNameInputValue}
                                layout={{ position: 'absolute', left: 5, width: 97, top: 5, height: 16 }}
                            />
                        </Border>
                        <ContainerButton
                            variant="4"
                            name="minus_btn_furni"
                            params={17}
                            onPointerTap={onMinusBtnFurni}
                            layout={{ position: 'absolute', left: 175, width: 30, top: 89, height: 30 }}
                        />
                        <ContainerButton
                            variant="3"
                            name="plus_btn_furni"
                            params={17}
                            onPointerTap={onPlusBtnFurni}
                            layout={{ position: 'absolute', left: 204, width: 30, top: 89, height: 30 }}
                        />
                        <Button
                            variant="103"
                            name="add_furni_btn"
                            params={131089}
                            onPointerTap={onAddFurniBtn}
                            layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                        >
                            {t('moderation.give_furni.add')}
                        </Button>
                    </Region>
                    <Region
                        name="ban_view"
                        params={2192}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 238, top: 0, height: 173 }}
                    >
                        <Region
                            name="user_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 9, width: 57, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.ban_management.user')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Border
                            variant="105"
                            params={144}
                            layout={{ position: 'absolute', left: 9, width: 217, top: 29, height: 26 }}
                        >
                            <TextInput
                                value={banUsernameInputValue}
                                onChange={setBanUsernameInputValue}
                                layout={{ position: 'absolute', left: 5, width: 204, top: 5, height: 16 }}
                            />
                        </Border>
                        <Region
                            name="ban_type"
                            params={145}
                            layout={{ position: 'absolute', left: 13, width: 210, top: 62, height: 54 }}
                        >
                            <RadioButton
                                variant="100"
                                name="unban_radio"
                                params={17}
                                onPointerTap={onUnbanRadio}
                                layout={{ position: 'absolute', left: 0, width: 13, top: 25, height: 16, minHeight: 16, maxHeight: 16 }}
                            />
                            <RadioButton
                                variant="100"
                                name="ban_radio"
                                params={17}
                                onPointerTap={onBanRadio}
                                layout={{ position: 'absolute', left: 0, width: 12, top: 4, height: 16, minHeight: 16, maxHeight: 16 }}
                            />
                        </Region>
                        <Button
                            variant="103"
                            name="ban_btn"
                            params={131089}
                            onPointerTap={onBanBtn}
                            layout={{ position: 'absolute', left: 44, width: 181, top: 133, height: 26, minWidth: 181 }}
                        >
                            {t('moderation.ban_management.do')}
                        </Button>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 28, width: 47, top: 65, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.ban_management.ban')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 28, width: 63, top: 86, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('moderation.ban_management.unban')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                        <Dropmenu
                            variant="100"
                            name="duration_selector"
                            params={81}
                            onPointerTap={onDurationSelector}
                            layout={{ position: 'absolute', left: 124, width: 101, top: 63, height: 22 }}
                        >
                            1 Month
                        </Dropmenu>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
