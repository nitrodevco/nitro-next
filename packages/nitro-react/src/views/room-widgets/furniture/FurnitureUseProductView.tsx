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
 * clothing, saddling a pet, a shampoo or a custom part - `use_product_widget_frame` (388x220,
 * margins 3, 36, 3, 3), centred, with one 386x180 `use_product_controller_*` body in its content:
 * the thing on the left, what it will do on the right, the underlined cancel text and a confirm
 * the caller names. Flash built a body per product from near-identical XML; the only differences
 * that matter are the four texts and what fills the preview, so they are props.
 *
 * `save_button` fits its caption between its `width_min` 130 and `width_max` 145 and grows right
 * from x 230. Every text is 13px in the frame's Ubuntu theme; the description and info are
 * `auto_size="none"` word-wrapped fields cut at their boxes, and they overlap by the layout's own
 * numbers. The monsterplant products' bodies (`use_product_controller_*_monsterplant`) are a
 * different, 290 wide item list layout that this view does not draw.
 */
export const FurnitureUseProductView = ({
    captionKey, descriptionKey, infoKey, confirmKey, preview, onConfirm, onCancel,
}: FurnitureUseProductViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t(captionKey)}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onCancel}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 3, 36, 3, 3 ]}
            layout={{ width: 388, height: 220 }}
        >
            <Region layout={{ position: 'absolute', left: 0, top: 0, width: 386, height: 180 }}>
                <ButtonThick
                    variant="3"
                    onPointerTap={onConfirm}
                    layout={{ position: 'absolute', left: 230, top: 112, height: 28, minWidth: 130, maxWidth: 145 }}
                >
                    {t(confirmKey)}
                </ButtonThick>
                <Region layout={{ position: 'absolute', left: 10, top: 10, width: 122, height: 130 }}>
                    {preview}
                </Region>
                <ThemeText
                    text={t(descriptionKey)}
                    textStyle="u_regular"
                    textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 196 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 140, top: 15, width: 200, height: 61 }}
                />
                <Region
                    cursor="pointer"
                    onPointerTap={onCancel}
                    layout={{ position: 'absolute', left: 160, top: 118, width: 65, height: 25 }}
                />
                <ThemeText
                    text={t('useproduct.widget.cancel')}
                    textStyle="u_regular"
                    textOptions={{ fontSize: 13 }}
                    flashFormat={{ underline: true }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 160, top: 120, width: 70, height: 25 }}
                />
                {infoKey && (
                    <ThemeText
                        text={t(infoKey)}
                        textStyle="u_italic"
                        textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 196 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 140, top: 60, width: 200, height: 40 }}
                    />
                )}
            </Region>
        </Frame>
    );
};
