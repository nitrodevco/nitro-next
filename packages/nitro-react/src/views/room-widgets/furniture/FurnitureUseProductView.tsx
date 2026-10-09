import { ReactNode } from 'react';

import { TemplateWindow, useTemplate, useTemplateFrame } from '#base/theme';

export interface FurnitureUseProductViewProps {
    /** Frame caption key, e.g. `useproduct.widget.title.plant_seed`. */
    captionKey: string;
    /** The paragraph saying what the product does. */
    descriptionKey: string;
    /** The italic line under it, warning what it costs or cannot be undone. */
    infoKey?: string;
    /** The confirm button's label key; each product names its own verb. */
    confirmKey: string;
    /** Whatever is being used, or who it is being used on: an image, an avatar, a plant. */
    preview?: ReactNode;
    /** The frame and controller templates, for a product with its own (`createWindow`); the shampoo's by default. */
    frameTemplate?: string;
    contentTemplate?: string;
    /** The controller element the preview goes in: `preview_image`, or the clothing's `avatar_preview` widget. */
    previewSlot?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const FRAME_TEMPLATE = 'habbo-room-ui-com/use_product_widget_frame_xml';
const CONTENT_TEMPLATE = 'habbo-room-ui-com/use_product_controller_shampoo_xml';

/**
 * The shape every "use this product" dialog in the room shares - `UseProductConfirmationView`,
 * `MonsterPlantSeedConfirmationView` and `PurchasableClothingConfirmationView` each build a
 * `use_product_widget_frame*_xml` frame, centre it, and put one 386x180 `use_product_controller_*_xml`
 * in its content (`setWindowContent` / `createWindow`): the thing on the left in `preview_image`,
 * what it will do in `description` and `info`, `cancel_text` and `save_button`.
 *
 * The port's callers name the texts rather than the layouts, so this draws the plain frame with the
 * shampoo controller by default - the shape the pet products and the seed share element for
 * element - and binds the caller's caption, texts and confirm verb over it, with the caller's
 * preview in `preview_image`. A product whose view builds other templates names them (the clothing:
 * `use_product_widget_frame_plant_seed_xml` and `use_product_controller_purchasable_clothing_xml`,
 * its preview in `avatar_preview`). `save_button` confirms and `cancel_text` and the header close
 * cancel (`onMouseClick`). Not carried: the seed's own frame and baked-in preview bitmaps, the
 * monsterplant products' item-list frames and controllers (`use_product_widget_frame_monsterplant*_xml`),
 * the `name` / `productName` parameters Flash registers for the texts, and `preview_image_region`
 * selecting the pet in the room.
 */
export const FurnitureUseProductView = ({
    captionKey, descriptionKey, infoKey, confirmKey, preview, frameTemplate = FRAME_TEMPLATE, contentTemplate = CONTENT_TEMPLATE, previewSlot = 'preview_image', onConfirm, onCancel,
}: FurnitureUseProductViewProps) => {
    const content = useTemplate(contentTemplate);
    const frame = useTemplateFrame({ id: 'use-product', centered: true, rememberPosition: false, onClose: onCancel });

    if (!content) return null;

    return (
        <TemplateWindow
            id={frameTemplate}
            frame={frame}
            bindings={{
                '': {
                    caption: `\${${captionKey}}`,
                    added: [ {
                        key: 'content',
                        from: content,
                        bindings: {
                            save_button: { caption: `\${${confirmKey}}`, onPointerTap: onConfirm },
                            [previewSlot]: { children: preview },
                            description: { caption: `\${${descriptionKey}}` },
                            info: infoKey ? { caption: `\${${infoKey}}` } : { visible: false },
                            cancel_text: { onPointerTap: onCancel },
                        },
                    } ],
                },
            }}
        />
    );
};
