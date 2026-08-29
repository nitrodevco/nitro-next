import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, TextInput, ThemeText } from '#base/theme';

/** Row template `puppy_namelist` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPuppyNamelistItemProps {
    layout?: BoxLayout;
    visiblePuppyNameInput?: boolean;
}

export const ConfirmPetBreedingLayoutPuppyNamelistItem = ({ layout, visiblePuppyNameInput }: ConfirmPetBreedingLayoutPuppyNamelistItemProps) => {
    const t = useTranslation();
    const [ puppyNameInputValue, setPuppyNameInputValue ] = useState('');

    return (
        <Region
            name="puppy_namelist"
            layout={{ width: 300, height: 52, flexShrink: 0, minWidth: 300, flexDirection: 'column', gap: 2, ...layout }}
        >
            <Region layout={{ width: 70, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.baby.name')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            <Border
                variant="105"
                tintColor="#f0f0f0"
                layout={{ alignSelf: 'stretch', height: 31, flexShrink: 0 }}
            >
                {(visiblePuppyNameInput ?? true) && (
                    <TextInput
                        value={puppyNameInputValue}
                        onChange={setPuppyNameInputValue}
                        maxLength={32}
                        layout={{ position: 'absolute', left: 5, right: 6, top: 5, bottom: 6 }}
                    />
                )}
            </Border>
        </Region>
    );
};
