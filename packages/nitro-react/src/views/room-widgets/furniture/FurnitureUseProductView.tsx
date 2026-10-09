import { TemplateBindings, TemplateWindow, TemplateWindows, useTemplate, useTemplateFrame } from '#base/theme';

/** `setWindowContent`: the frame fitted round the controller it was given. */
const fitFrame = ({ root }: TemplateWindows) => root()?.resizeToFitContent();

export interface FurnitureUseProductViewProps {
    /** The `use_product_widget_frame*_xml` the product's view builds. */
    frameTemplate: string;
    /** The `use_product_controller_*_xml` it puts in the frame's content. */
    controllerTemplate: string;
    /** Over the frame's own caption, where the view sets one (`PurchasableClothingConfirmationView`). */
    caption?: string;
    /** What the view sets in the controller beyond its buttons: its preview, mostly. */
    bindings?: TemplateBindings;
    /** The parameters it registers for the texts (`registerParameter`): the pet's or product's name. */
    parameters?: Readonly<Record<string, Record<string, string>>>;
    /** `resizeToFitContent`: the frame fitted round the controller - only the pet products' view does. */
    fitToContent?: boolean;
    /** `save_button`. */
    onConfirm: () => void;
    /** `cancel_text` and the header close. */
    onCancel: () => void;
}

/**
 * The "use this product" dialog every room product shares - `UseProductConfirmationView`,
 * `MonsterPlantSeedConfirmationView` and `PurchasableClothingConfirmationView` each build a
 * `use_product_widget_frame*_xml` frame, centre it, and put the product's
 * `use_product_controller_*_xml` in its content (`setWindowContent` / `createWindow`) - the pet
 * products' view fitting the frame round it (`resizeToFitContent`). Each controller carries its own texts; the view fills in
 * the preview and the parameters its texts name. `save_button` confirms, and `cancel_text` and the
 * header close cancel (`onMouseClick`).
 */
export const FurnitureUseProductView = ({ frameTemplate, controllerTemplate, caption, bindings, parameters, fitToContent = false, onConfirm, onCancel }: FurnitureUseProductViewProps) => {
    const content = useTemplate(controllerTemplate);
    const frame = useTemplateFrame({ id: 'use_product', centered: true, rememberPosition: false, onClose: onCancel });

    if (!content) return null;

    return (
        <TemplateWindow
            id={frameTemplate}
            frame={frame}
            parameters={parameters}
            arrange={fitToContent ? fitFrame : undefined}
            bindings={{
                '': {
                    ...(caption !== undefined ? { caption } : {}),
                    added: [ {
                        key: 'content',
                        from: content,
                        bindings: {
                            ...bindings,
                            save_button: { onPointerTap: onConfirm },
                            cancel_text: { onPointerTap: onCancel },
                        },
                    } ],
                },
            }}
        />
    );
};
