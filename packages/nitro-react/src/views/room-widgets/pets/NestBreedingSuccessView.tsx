import { useTranslation } from '#base/context/system';
import { Button, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { PetPortraitView } from './PetPortraitView';

export interface NestBreedingSuccessViewProps {
    petName: string;
    /** The baby's figure, once it has been placed in the room; empty draws no picture. */
    figure: string;
    posture: string;
    rarityCategory: number;
    onOk: () => void;
}

/**
 * A nest finished - `NestBreedingSuccessView` on the `nestBreedingSuccessDialog` layout
 * (323x221): the new pet on a spotlight, its name and rarity class, and one button.
 */
export const NestBreedingSuccessView = ({ petName, figure, posture, rarityCategory, onOk }: NestBreedingSuccessViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="nest-breeding-success"
            caption={t('breedpets.nestbreeding.success.header')}
            onClose={onOk}
            defaultPosition={{ x: 380, y: 200 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 323, height: 221 }}
        >
            <Region layout={{ flex: 1, width: '100%' }}>
                <ThemeText
                    text={t('breedpets.nestbreeding.success.title')}
                    textStyle="il_regular"
                    textOptions={{ fill: '#000000' }}
                    layout={{ position: 'absolute', left: 39, width: 252, top: 15 }}
                />
                <ThemeImage
                    src={LayoutImage('shared/icons_hilighter_yellow.png')}
                    layout={{ position: 'absolute', left: 127, width: 82, top: 33, height: 83 }}
                />
                {!!figure.length && (
                    <Region layout={{ position: 'absolute', left: 146, top: 54 }}>
                        <PetPortraitView
                            figure={figure}
                            posture={posture}
                            width={40}
                            height={40}
                        />
                    </Region>
                )}
                <ThemeText
                    text={petName}
                    textStyle="bold"
                    textOptions={{ fill: '#000000' }}
                    layout={{ position: 'absolute', left: 42, width: 252, top: 116 }}
                />
                <ThemeText
                    text={t(`breedpets.nestbreeding.success.raritycategory.${rarityCategory}`)}
                    textStyle="regular"
                    textOptions={{ fill: '#000000' }}
                    layout={{ position: 'absolute', left: 42, width: 252, top: 127 }}
                />
                <Button
                    variant="0"
                    onPointerTap={onOk}
                    layout={{ position: 'absolute', left: 70, width: 172, bottom: 5, height: 32 }}
                >
                    {t('breedpets.nestbreeding.success.button.ok')}
                </Button>
            </Region>
        </Frame>
    );
};
