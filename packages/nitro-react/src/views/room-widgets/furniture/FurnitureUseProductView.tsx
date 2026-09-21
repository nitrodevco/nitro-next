import { ReactNode } from 'react';

import { useTranslation } from '#base/context/system';
import { ButtonThick, Frame, Region, ThemeText } from '#base/theme';

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
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * The shape every "use this product" dialog in the room shares - planting a seed, binding
 * clothing, saddling a pet, fertilising a monsterplant - on the `use_product_widget_frame`
 * (388x220) around one 386x180 body: the thing on the left, what it will do on the right, and
 * a confirm the caller names.
 *
 * Flash built a window per product from near-identical XML; the only differences that matter
 * are the four texts and what fills the preview, so they are props.
 */
export const FurnitureUseProductView = ({
    captionKey, descriptionKey, infoKey, confirmKey, preview, onConfirm, onCancel,
}: FurnitureUseProductViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="furniture-use-product"
            caption={t(captionKey)}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onCancel}
            defaultPosition={{ x: 90, y: 70 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 388, height: 220 }}
        >
            <Region layout={{ position: 'relative', width: 386, height: 180 }}>
                <Region layout={{ position: 'absolute', left: 10, width: 122, top: 10, height: 130, alignItems: 'center', justifyContent: 'flex-end' }}>
                    {preview}
                </Region>
                <ThemeText
                    text={t(descriptionKey)}
                    textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 15, height: 61 }}
                />
                {infoKey && (
                    <ThemeText
                        text={t(infoKey)}
                        textStyle="u_italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 140, width: 200, top: 60, height: 40 }}
                    />
                )}
                <Region
                    cursor="pointer"
                    onPointerTap={onCancel}
                    layout={{ position: 'absolute', left: 14, width: 70, top: 118, height: 25 }}
                >
                    <ThemeText text={t('useproduct.widget.cancel')} />
                </Region>
                <ButtonThick
                    variant="3"
                    onPointerTap={onConfirm}
                    layout={{ position: 'absolute', right: 11, width: 145, top: 112, height: 28 }}
                >
                    {t(confirmKey)}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
