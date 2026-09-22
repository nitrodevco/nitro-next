import { useTranslation } from '#base/context/system';
import { Border, Button, Frame, ThemeText } from '#base/theme';

export interface FurnitureClothingChangeViewProps {
    onSelectGender: (isMale: boolean) => void;
    onClose: () => void;
}

/**
 * Which of the booth's two outfits to dress, on the `boygirl` layout (308x151, frame style 0 with
 * margins 6, 25, 6, 7) that `ClothingChangeFurnitureWidget` builds and centres. A clothing booth
 * holds one look for each gender, so this is the only question it asks before handing over to the
 * avatar editor.
 *
 * The info text is a plain Volter 9 field with no word wrap, cut at its 254x42 box. Both buttons
 * fit their caption from their 100px `width_min`: `Boy` grows right from x 19, `Girl` keeps its
 * right edge (`on_accommodate_align_right`).
 */
export const FurnitureClothingChangeView = ({ onSelectGender, onClose }: FurnitureClothingChangeViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            caption={t('widget.furni.clothingchange.gender.title')}
            tintColor="#3d3d3d"
            dropShadow={false}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ width: 308, height: 151 }}
        >
            <Border
                variant="0"
                tintColor="#f0f0f0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Button
                    variant="0"
                    onPointerTap={() => onSelectGender(true)}
                    layout={{ position: 'absolute', left: 19, top: 82, height: 22, minWidth: 100 }}
                >
                    {t('widget.furni.clothingchange.gender.male')}
                </Button>
                <Button
                    variant="0"
                    onPointerTap={() => onSelectGender(false)}
                    layout={{ position: 'absolute', right: 22, top: 82, height: 22, minWidth: 100 }}
                >
                    {t('widget.furni.clothingchange.gender.female')}
                </Button>
                <ThemeText
                    text={t('widget.furni.clothingchange.gender.info')}
                    textOptions={{ fontFamily: 'Volter', fontSize: 9 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 20, top: 16, width: 254, height: 42 }}
                />
            </Border>
        </Frame>
    );
};
