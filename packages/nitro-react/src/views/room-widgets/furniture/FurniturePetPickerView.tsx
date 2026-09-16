import { useTranslation } from '#base/context';
import { Border, Button, Frame, ScrollArea } from '#base/theme';

export interface FurniturePetPickerEntry {
    petId: number;
    name: string;
}

export interface FurniturePetPickerViewProps {
    pets: FurniturePetPickerEntry[];
    onSelect: (petId: number) => void;
    onClose: () => void;
}

/**
 * Which pet a product is meant for. Flash floated one of these over each eligible pet in the
 * room; here they are listed together, which says the same thing without needing a bubble per
 * animal. Pets the product cannot be used on were already filtered out by the widget.
 */
export const FurniturePetPickerView = ({ pets, onSelect, onClose }: FurniturePetPickerViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="furniture-pet-picker"
            caption={t('useproduct.widget.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 120, y: 90 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 240, height: 220 }}
        >
            <Border layout={{ flex: 1, padding: 4 }}>
                <ScrollArea
                    orientation="vertical"
                    layout={{ width: '100%', flex: 1 }}
                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 2 }}
                >
                    {pets.map(pet => (
                        <Button
                            key={pet.petId}
                            variant="0"
                            onPointerTap={() => onSelect(pet.petId)}
                            layout={{ width: '100%', height: 24, flexShrink: 0 }}
                        >
                            {pet.name}
                        </Button>
                    ))}
                </ScrollArea>
            </Border>
        </Frame>
    );
};
