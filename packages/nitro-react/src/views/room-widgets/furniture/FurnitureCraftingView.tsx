import { useTranslation } from '#base/context';
import { Border, Box, Button, Frame, ScrollArea, ThemeText } from '#base/theme';

export interface CraftingProduct {
    recipeCode: string;
    /** The furni the recipe makes, already named for reading. */
    name: string;
}

export interface CraftingIngredient {
    count: number;
    name: string;
}

export interface FurnitureCraftingViewProps {
    products: CraftingProduct[];
    selectedRecipeCode: string;
    /** What the selected recipe takes, once the server has said. */
    ingredients: CraftingIngredient[];
    /** Whether what is in the mixer makes the selected recipe. */
    canCraft: boolean;
    /** What came out, once something has. */
    result: string;
    onSelectRecipe: (recipeCode: string) => void;
    onCraft: () => void;
    onClose: () => void;
}

/**
 * A crafting table, on the `craftingwidget` layout (543x407): what can be made on the left, what
 * the chosen recipe takes below it, and the button that makes it.
 *
 * Flash also let ingredients be dragged in from the inventory, which the port has no dragging
 * for yet - so the mixer is filled by putting the furni on the table in the room, and this shows
 * what that adds up to.
 */
export const FurnitureCraftingView = ({
    products, selectedRecipeCode, ingredients, canCraft, result, onSelectRecipe, onCraft, onClose,
}: FurnitureCraftingViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="furniture-crafting"
            caption={t('crafting.title')}
            onClose={onClose}
            defaultPosition={{ x: 70, y: 50 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 543, height: 407 }}
        >
            <Box layout={{ flex: 1, flexDirection: 'row', gap: 6, padding: 6 }}>
                <Box layout={{ width: 260, flexDirection: 'column', gap: 4 }}>
                    <ThemeText
                        text={t('crafting.title.products')}
                        textStyle="text-style-bold"
                    />
                    <Border layout={{ flex: 1 }}>
                        <ScrollArea
                            orientation="vertical"
                            layout={{ width: '100%', flex: 1 }}
                            contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 2 }}
                        >
                            {products.map(product => (
                                <Button
                                    key={product.recipeCode}
                                    variant="0"
                                    selected={product.recipeCode === selectedRecipeCode}
                                    onPointerTap={() => onSelectRecipe(product.recipeCode)}
                                    layout={{ width: '100%', height: 24, flexShrink: 0 }}
                                >
                                    {product.name}
                                </Button>
                            ))}
                        </ScrollArea>
                    </Border>
                </Box>
                <Box layout={{ flex: 1, flexDirection: 'column', gap: 4 }}>
                    <ThemeText
                        text={t('crafting.title.mixer')}
                        textStyle="text-style-bold"
                    />
                    <Border layout={{ flex: 1, flexDirection: 'column', padding: 4, gap: 2 }}>
                        {ingredients.map(ingredient => (
                            <ThemeText
                                key={ingredient.name}
                                text={`${ingredient.count}x ${ingredient.name}`}
                                textOptions={{ fill: '#000000' }}
                            />
                        ))}
                        {!!result.length && (
                            <ThemeText
                                text={result}
                                textStyle="text-style-bold"
                                textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 220 }}
                                verticalAlign="top"
                                layout={{ marginTop: 6 }}
                            />
                        )}
                    </Border>
                    <Button
                        variant="0"
                        disabled={!canCraft}
                        onPointerTap={onCraft}
                        layout={{ width: '100%', height: 30 }}
                    >
                        {t('crafting.button.craft')}
                    </Button>
                </Box>
            </Box>
        </Frame>
    );
};
