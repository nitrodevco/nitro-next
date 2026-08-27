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
}

export const NestBreedingSuccessDialogLayout = ({ captionPetName, captionPetRaritycategory, layout, onButtonOk, onClose, srcPetImage }: NestBreedingSuccessDialogLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={1}
            caption={t('breedpets.nestbreeding.success.header')}
            onClose={onClose}
            layout={{ width: 323, height: 221, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 39, width: 252, top: 15, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('breedpets.nestbreeding.success.title')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="pet.name"
                    params={16}
                    layout={{ position: 'absolute', left: 42, width: 252, top: 116, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPetName ?? t('breedpets.nestbreeding.success.name')}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="pet.raritycategory"
                    params={16}
                    layout={{ position: 'absolute', left: 42, width: 252, top: 127, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPetRaritycategory ?? t('breedpets.nestbreeding.success.raritycategory.0')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Button
                    variant="102"
                    name="button.ok"
                    params={917521}
                    onPointerTap={onButtonOk}
                    layout={{ position: 'absolute', left: 85, width: 172, top: 143, height: 32, minWidth: 100 }}
                >
                    {t('breedpets.nestbreeding.success.button.ok')}
                </Button>
                <ThemeImage
                    params={16}
                    src={layoutImage('icons_hilighter_yellow.png')}
                    layout={{ position: 'absolute', left: 127, width: 82, top: 33, height: 83 }}
                />
                <ThemeImage
                    name="pet_image"
                    params={16}
                    src={srcPetImage}
                    layout={{ position: 'absolute', left: 146, width: 40, top: 54, height: 40 }}
                />
            </Region>
        </Frame>
    );
};
