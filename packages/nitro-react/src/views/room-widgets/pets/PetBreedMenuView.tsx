import { useTranslation } from '#base/context/system';
import { Box, Bubble, Button, ThemeText } from '#base/theme';

export interface PetBreedMenuViewProps {
    /** The partner plant this bubble floats over. */
    name: string;
    onBreed: () => void;
}

/**
 * The bubble offering to breed with one particular plant - `BreedPetView` on the
 * `breed_pet_menu` layout: the plant's name and a single button.
 */
export const PetBreedMenuView = ({ name, onBreed }: PetBreedMenuViewProps) => {
    const t = useTranslation();

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ flexDirection: 'column' }}
        >
            <Box layout={{ minWidth: 107, maxWidth: 107, flexDirection: 'column', marginLeft: 1, marginRight: 1 }}>
                <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 24, maxHeight: 24 }}>
                    <ThemeText
                        text={name}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Box>
                <Button
                    variant="300"
                    tintColor="#2d2a27"
                    textColor="#ffffff"
                    onPointerTap={onBreed}
                    layout={{ minHeight: 25, maxHeight: 25, width: '100%' }}
                >
                    {t('breedpets.widget.use')}
                </Button>
            </Box>
        </Bubble>
    );
};
