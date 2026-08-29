import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, TextInput, ThemeText } from '#base/theme';

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
