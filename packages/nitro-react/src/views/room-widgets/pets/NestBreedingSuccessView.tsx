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
 * (323x221, illumina frame 100, margins 1/30/1/1) that `setWindowContent` builds and centres: the
 * new pet on a spotlight, its name and rarity class, and one button. The frame's `params="1"`
 * carry no `mouse_dragging_target`, so unlike the other breeding dialogs it cannot be dragged.
 */
export const NestBreedingSuccessView = ({ petName, figure, posture, rarityCategory, onOk }: NestBreedingSuccessViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="nest-breeding-success"
            caption={t('breedpets.nestbreeding.success.header')}
            dropShadow={{ angle: 0, alpha: 0.35, blur: 20 }}
            onClose={onOk}
            centered
            rememberPosition={false}
            draggable={false}
            resizeDirection="none"
            margins={[ 1, 30, 1, 1 ]}
            layout={{ position: 'absolute', width: 323, height: 221 }}
        >
            <ThemeText
                text={t('breedpets.nestbreeding.success.title')}
                textStyle="il_regular"
                textOptions={{ align: 'center' }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 39, width: 252, top: 15 }}
            />
            <ThemeText
                text={petName}
                textStyle="il_heading_3"
                textOptions={{ align: 'center' }}
                name="pet.name"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 42, width: 252, top: 116 }}
            />
            <ThemeText
                text={t(`breedpets.nestbreeding.success.raritycategory.${rarityCategory}`)}
                textStyle="il_regular"
                textOptions={{ align: 'center' }}
                name="pet.raritycategory"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 42, width: 252, top: 127 }}
            />
            <Button
                variant="102"
                name="button.ok"
                onPointerTap={onOk}
                layout={{ position: 'absolute', left: 85, width: 172, top: 143, height: 32, minWidth: 100 }}
            >
                {t('breedpets.nestbreeding.success.button.ok')}
            </Button>
            <ThemeImage
                src={LayoutImage('shared/icons_hilighter_yellow.png')}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 127, width: 82, top: 33, height: 83 }}
            />
            {!!figure.length && (
                <Region
                    name="pet_image"
                    layout={{ position: 'absolute', left: 146, width: 40, top: 54, height: 40 }}
                >
                    <PetPortraitView
                        figure={figure}
                        posture={posture}
                        width={40}
                        height={40}
                    />
                </Region>
            )}
        </Frame>
    );
};
