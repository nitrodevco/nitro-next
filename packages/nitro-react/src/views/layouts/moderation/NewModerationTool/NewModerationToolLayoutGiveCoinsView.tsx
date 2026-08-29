import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, TextInput, ThemeText } from '#base/theme';

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
