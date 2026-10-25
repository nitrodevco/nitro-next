import { FurnitureTypeEnum, IFurnitureData } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { useTranslation } from '#base/context/system';
import { ModalDialog, TemplateItem, TemplateWindow, TemplateWindows, useTemplateFrame } from '#base/theme';

/**
 * A crafting table - `CraftingWidget.createMainWindow`, which builds
 * `habbo-room-ui-com/craftingwidget_xml` as a modal dialog (`buildModalDialogFromXML`). Every
 * grid item is a clone of `itemgrid_products`' first item, which the widget takes out of the grid
 * (`itemTemplate`): the furni icon in `bitmap`, its name as the `tooltip` region's caption and, for
 * an inventory furni, how many are left in `number_container` (`FurniThumbnailRendererBase`).
 *
 * - `itemgrid_products`: the recipes; the count hidden (`CraftingRecipeItemRenderer`).
 * - `itemgrid_inventory`: the furni the table takes, at 0.2 blend with none left
 *   (`CraftingInventoryItemRenderer.updateItemCount`).
 * - `itemgrid_mixer`: what is in the mixer, at 0.2 blend for an ingredient not held
 *   (`CraftingMixerItemRenderer.updateItemCount`).
 * - `header_mixer` is the selected recipe's name (`setInfoText`), `info_text1` / `info_text2` /
 *   `furniture_icon` and `btn_craft` what `CraftingInfoController.setState` left; on someone else's
 *   table the button reads `${crafting.btn.notowner}` and stays disabled.
 * - `progress_bar` replaces the button while a craft runs: its `bar` grows to `btn_cancel`'s width
 *   (`CraftingProgressBarController.setProgress`); a press on it cancels.
 */
export interface CraftingGridItem {
    key: string;
    furnitureData: IFurnitureData;
    /** The inventory's count; none for the recipes and the mixer. */
    count?: number;
    /** 0.2 when none is held. */
    available: boolean;
}

export interface FurnitureCraftingViewProps {
    recipes: CraftingGridItem[];
    inventory: CraftingGridItem[];
    mixer: CraftingGridItem[];
    infoText: string;
    infoText1: string;
    infoText2: string;
    icon?: IFurnitureData;
    buttonVisible: boolean;
    buttonEnabled: boolean;
    buttonCaption: string;
    /** Whether the table is the viewer's own - nobody else may craft on it. */
    isOwner: boolean;
    progressVisible: boolean;
    /** 0 to 1. */
    progress: number;
    onRecipe: (key: string) => void;
    onInventoryItem: (key: string) => void;
    onMixerItem: (key: string) => void;
    onCraft: () => void;
    onCancel: () => void;
    onClose: () => void;
}

/** `FurniThumbnailRendererBase.THUMB_BLEND_ITEMS_NOT_AVAILABLE`. */
const NOT_AVAILABLE_BLEND = 0.2;

/** `requestIconFromRoomEngine`: `getFurnitureIcon` for a floor item, `getWallItemIcon` for a wall one. */
const iconUrl = (furnitureData: IFurnitureData): string => {
    const engine = GetRoomEngine();

    return ((furnitureData.type === FurnitureTypeEnum.Wall) ? engine.getFurnitureWallIconUrl(furnitureData.id, undefined) : engine.getFurnitureFloorIconUrl(furnitureData.id)) ?? '';
};

const gridItems = (items: CraftingGridItem[], onPress: (key: string) => void): TemplateItem[] => items.map(item => ({
    key: item.key,
    from: 'itemgrid_products/@0',
    bindings: {
        '': { onPointerDown: () => onPress(item.key) },
        bitmap: { asset: iconUrl(item.furnitureData), blend: item.available ? 1 : NOT_AVAILABLE_BLEND },
        tooltip: { tooltip: item.furnitureData.localizedName },
        number_container: { visible: (item.count ?? 0) > 0 },
        number: { caption: String(item.count ?? 0) },
    },
}));

export const FurnitureCraftingView = ({
    recipes, inventory, mixer, infoText, infoText1, infoText2, icon, buttonVisible, buttonEnabled, buttonCaption, isOwner, progressVisible, progress, onRecipe, onInventoryItem, onMixerItem, onCraft, onCancel, onClose,
}: FurnitureCraftingViewProps) => {
    const t = useTranslation();
    const frame = useTemplateFrame({ id: 'furniture-crafting', modal: true, draggable: false, rememberPosition: false, onClose });
    const craftEnabled = isOwner && buttonEnabled;

    const arrange = ({ find }: TemplateWindows) => {
        const cancel = find('btn_cancel');

        if (cancel) find('bar')?.setWidth(cancel.width * progress);
    };

    return (
        <ModalDialog>
            <TemplateWindow
                id="habbo-room-ui-com/craftingwidget_xml"
                frame={frame}
                arrange={arrange}
                bindings={{
                    header_mixer: { caption: infoText },
                    info_text1: { caption: infoText1, setCaptionAfterBuild: true },
                    info_text2: { caption: infoText2, setCaptionAfterBuild: true },
                    furniture_icon: icon ? { asset: iconUrl(icon) } : { visible: false },
                    btn_craft: {
                        visible: buttonVisible,
                        caption: t(!isOwner ? 'crafting.btn.notowner' : buttonCaption),
                        disabled: !craftEnabled,
                        onPointerDown: craftEnabled ? onCraft : undefined,
                    },
                    progress_bar: { visible: progressVisible, onPointerDown: progressVisible ? onCancel : undefined },
                    itemgrid_products: { items: gridItems(recipes, onRecipe) },
                    itemgrid_inventory: { items: gridItems(inventory, onInventoryItem) },
                    itemgrid_mixer: { items: gridItems(mixer, onMixerItem) },
                }}
            />
        </ModalDialog>
    );
};
