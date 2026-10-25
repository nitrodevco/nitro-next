export interface ICraftableProduct {
    /** What the recipe is called on the wire; it is what the crafting request names. */
    recipeCode: string;
    productCode: string;
    /** The furni the recipe makes, for its icon and its name. */
    furnitureClassName: string;
}
