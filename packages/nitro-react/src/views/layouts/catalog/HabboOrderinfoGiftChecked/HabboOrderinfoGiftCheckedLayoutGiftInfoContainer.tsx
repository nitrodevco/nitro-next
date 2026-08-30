import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, Region, TextInput, ThemeText } from '#base/theme';

/** Named region `giftInfoContainer` of HabboOrderinfoGiftCheckedLayout - configured through the parent's `giftInfoContainer` prop. */
export interface HabboOrderinfoGiftCheckedLayoutGiftInfoContainerProps {
    layout?: BoxLayout;
    onBuyAsGift?: () => void;
}

export const HabboOrderinfoGiftCheckedLayoutGiftInfoContainer = ({ layout, onBuyAsGift }: HabboOrderinfoGiftCheckedLayoutGiftInfoContainerProps) => {
    const t = useTranslation();
    const [ receiverValue, setReceiverValue ] = useState('');
    const [ messageValue, setMessageValue ] = useState('');

    return (
        <Region
            name="giftInfoContainer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 105, height: 127, ...layout }}
        >
            <CheckBox
                variant="3"
                name="buyAsGift"
                onPointerTap={onBuyAsGift}
                layout={{ position: 'absolute', left: 21, width: 20, top: 0, height: 20 }}
            />
            <ThemeText
                text={t('catalog.purchase.confirmation.dialog.buyasgift.checkbox')}
                textStyle="text-style-u-small"
                layout={{ position: 'absolute', left: 43, width: 78, top: 1, height: 15 }}
            />
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 25, width: 220, top: 24, height: 20 }}
            >
                <TextInput
                    value={receiverValue}
                    onChange={setReceiverValue}
                    layout={{ position: 'absolute', left: 5, width: 200, top: 5, bottom: 3 }}
                />
            </Border>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 25, width: 220, bottom: 5, height: 50 }}
            >
                <TextInput
                    value={messageValue}
                    onChange={setMessageValue}
                    layout={{ position: 'absolute', left: 5, width: 200, top: 5, bottom: 5 }}
                />
            </Border>
            <ThemeText
                text={t('catalog.purchase.confirmation.dialog.buyasgift.greetings.info')}
                textStyle="text-style-u-small"
                textOptions={{ wordWrap: true, wordWrapWidth: 213 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 25, width: 213, alignSelf: 'center', marginTop: -3.5, marginBottom: 3.5, height: 26 }}
            />
        </Region>
    );
};
