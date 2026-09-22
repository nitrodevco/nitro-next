import { useTranslation } from '#base/context/system';
import { Button, Frame, LayoutImage, ModalDialog, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

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
    /** Whether the table is the viewer's own - nobody else may craft on it. */
    isOwner: boolean;
    /** Whether what is in the mixer makes the selected recipe. */
    canCraft: boolean;
    /** What came out, once something has. */
    result: string;
    onSelectRecipe: (recipeCode: string) => void;
    onCraft: () => void;
    onClose: () => void;
}

/** `header_recipes` / `header_inventory`: `Ubuntu bold` 14 in `0xcec7b6`, centred in 219px. */
const HEADER_TEXT_OPTIONS = { fill: '#cec7b6', fontFamily: 'UbuntuBold', fontSize: 14, align: 'center' } as const;

/**
 * A crafting table, on the `craftingwidget` layout that `CraftingWidget.createMainWindow` centres:
 * a style 3 frame tinted `0x2d4f64` (543x407, margins 3, 36, 3, 3) over the `craft_craft_bg`
 * backdrop, the recipes under `header_recipes` in `itemgrid_products` (26, 69, 246x108), the mixer
 * in `itemgrid_mixer` (294, 71, 216x85), the info texts from (304, 180) and `btn_craft` (style 6,
 * `0x299f3a`, 216x30) at (294, 317).
 *
 * The button reads `${crafting.btn.craft}`, or `${crafting.btn.notowner}` (and stays disabled) on
 * someone else's table, as `CraftingInfoController.enableButton` captioned `btn_craft`.
 *
 * What the port has is names, not items, so the grids hold text: each recipe is a row button in
 * the products grid rather than its 40x40 furni icon (the button the port drew before), the
 * selected recipe's ingredients are listed where the mixer's icons go, in the headers' colour, and
 * the result is `info_text1`. The inventory grid under
 * `header_inventory`, the `furniture_icon` preview, `header_mixer`, the progress bar and
 * `CraftingInfoController`'s state texts need the inventory, the room engine's icons and the
 * controller's states, none of which the widget carries - and Flash let ingredients be dragged in
 * from the inventory, which the port has no dragging for - so the mixer is filled by putting the
 * furni on the table in the room. Flash builds it as a modal dialog (`buildModalDialogFromXML`),
 * so it is a `ModalDialog`, centred over the darkened desktop.
 */
export const FurnitureCraftingView = ({
    products, selectedRecipeCode, ingredients, isOwner, canCraft, result, onSelectRecipe, onCraft, onClose,
}: FurnitureCraftingViewProps) => {
    const t = useTranslation();

    return (
        <ModalDialog>
            <Frame
                variant="3"
                id="furniture-crafting"
                caption={t('crafting.title')}
                tintColor="#2d4f64"
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                onClose={onClose}
                rememberPosition={false}
                resizeDirection="none"
                margins={[ 3, 36, 3, 3 ]}
                layout={{ width: 543, height: 407 }}
            >
                <ThemeImage
                    src={LayoutImage('room-ui/craft_craft_bg.png')}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                    layout={{ position: 'absolute', left: 8, top: 8, width: 521, height: 351 }}
                />
                <ThemeText
                    text={t('crafting.title.products')}
                    textStyle="u_regular"
                    textOptions={HEADER_TEXT_OPTIONS}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 26, top: 32, width: 219 }}
                />
                <ThemeText
                    text={t('crafting.title.mixer')}
                    textStyle="u_regular"
                    textOptions={HEADER_TEXT_OPTIONS}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 26, top: 200, width: 219 }}
                />
                <Region layout={{ position: 'absolute', left: 304, top: 180, width: 134, maxHeight: 120, flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
                    {!!result.length && (
                        <ThemeText
                            text={result}
                            textStyle="u_regular"
                            textOptions={{ fill: '#93999a', fontFamily: 'UbuntuBold', fontSize: 11, wordWrap: true, wordWrapWidth: 130 }}
                            verticalAlign="top"
                            layout={{ width: 134, flexShrink: 0 }}
                        />
                    )}
                </Region>
                <Button
                    variant="6"
                    tintColor="#299f3a"
                    disabled={!isOwner || !canCraft}
                    onPointerTap={onCraft}
                    layout={{ position: 'absolute', left: 294, top: 317, width: 216, height: 30 }}
                >
                    {t(isOwner ? 'crafting.btn.craft' : 'crafting.btn.notowner')}
                </Button>
                <ScrollArea
                    orientation="vertical"
                    variant="3"
                    layout={{ position: 'absolute', left: 26, top: 69, width: 246, height: 108 }}
                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 4 }}
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
                <Region layout={{ position: 'absolute', left: 294, top: 71, width: 216, height: 85, flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
                    {ingredients.map(ingredient => (
                        <ThemeText
                            key={ingredient.name}
                            text={`${ingredient.count}x ${ingredient.name}`}
                            textStyle="u_regular"
                            textOptions={{ fill: '#cec7b6' }}
                            verticalAlign="top"
                            layout={{ flexShrink: 0 }}
                        />
                    ))}
                </Region>
            </Frame>
        </ModalDialog>
    );
};
