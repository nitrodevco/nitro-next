import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `862_nestBreedingSuccessDialog_xml` (layout "nestBreedingSuccessDialog", 323x221) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NestBreedingSuccessDialogLayoutProps {
    captionPetName?: string;
    captionPetRaritycategory?: string;
    layout?: BoxLayout;
    onButtonOk?: () => void;
    onClose?: () => void;
    srcPetImage?: string;
    tintPetImage?: string;
}

export const NestBreedingSuccessDialogLayout = ({ captionPetName, captionPetRaritycategory, layout, onButtonOk, onClose, srcPetImage, tintPetImage }: NestBreedingSuccessDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('breedpets.nestbreeding.success.header')}
            onClose={onClose}
            layout={{ width: 323, height: 221, minWidth: 323, minHeight: 221, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <ThemeText
                    text={t('breedpets.nestbreeding.success.title')}
                    textOptions={{ align: 'center' }}
                    layout={{ position: 'absolute', left: 39, width: 252, top: 15, height: 16 }}
                />
                <ThemeText
                    text={captionPetName ?? t('breedpets.nestbreeding.success.name')}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ align: 'center' }}
                    name="pet.name"
                    layout={{ position: 'absolute', left: 42, width: 252, top: 116, height: 15 }}
                />
                <ThemeText
                    text={captionPetRaritycategory ?? t('breedpets.nestbreeding.success.raritycategory.0')}
                    textOptions={{ align: 'center' }}
                    name="pet.raritycategory"
                    layout={{ position: 'absolute', left: 42, width: 252, top: 127, height: 16 }}
                />
                <Button
                    variant="102"
                    name="button.ok"
                    onPointerTap={onButtonOk}
                    layout={{ position: 'absolute', marginLeft: 15.5, marginRight: -15.5, width: 172, bottom: 5, height: 32, minWidth: 100 }}
                >
                    {t('breedpets.nestbreeding.success.button.ok')}
                </Button>
                <ThemeImage
                    src={layoutImage('icons_hilighter_yellow.png')}
                    layout={{ position: 'absolute', left: 127, width: 82, top: 33, height: 83 }}
                />
                <ThemeImage
                    name="pet_image"
                    src={srcPetImage}
                    tint={tintPetImage}
                    layout={{ position: 'absolute', left: 146, width: 40, top: 54, height: 40 }}
                />
            </Region>
        </Frame>
    );
};
