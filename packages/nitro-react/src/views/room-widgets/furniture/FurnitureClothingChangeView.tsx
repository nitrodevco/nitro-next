import { useTranslation } from '#base/context/system';
import { Border, Button, Frame, ThemeText } from '#base/theme';

export interface FurnitureClothingChangeViewProps {
    onSelectGender: (isMale: boolean) => void;
    onClose: () => void;
}

/**
 * Which of the booth's two outfits to dress, on the `boygirl` layout (308x151). A clothing
 * booth holds one look for each gender, so this is the only question it asks before handing
 * over to the avatar editor.
 */
export const FurnitureClothingChangeView = ({ onSelectGender, onClose }: FurnitureClothingChangeViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="furniture-clothing-change"
            caption={t('widget.furni.clothingchange.gender.title')}
            tintColor="#3d3d3d"
            dropShadow={false}
            onClose={onClose}
            defaultPosition={{ x: 110, y: 100 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 308, height: 151 }}
        >
            <Border
                variant="0"
                tintColor="#f0f0f0"
                layout={{ flex: 1 }}
            >
                <ThemeText
                    text={t('widget.furni.clothingchange.gender.info')}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 254 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 20, width: 254, top: 16, height: 42 }}
                />
                <Button
                    variant="0"
                    onPointerTap={() => onSelectGender(true)}
                    layout={{ position: 'absolute', right: 177, width: 100, bottom: 15, height: 22 }}
                >
                    {t('widget.furni.clothingchange.gender.male')}
                </Button>
                <Button
                    variant="0"
                    onPointerTap={() => onSelectGender(false)}
                    layout={{ position: 'absolute', right: 22, width: 100, bottom: 15, height: 22 }}
                >
                    {t('widget.furni.clothingchange.gender.female')}
                </Button>
            </Border>
        </Frame>
    );
};
