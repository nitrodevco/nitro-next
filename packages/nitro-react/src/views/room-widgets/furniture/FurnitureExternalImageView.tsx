import { useViewportSize } from '#base/hooks';
import { Border, CloseButton, Region, ThemeImage, ThemeText, useTextureFromUrl } from '#base/theme';

export interface FurnitureExternalImageViewProps {
    imageUrl: string;
    creatorName: string;
    /** Milliseconds since the epoch; 0 for a photo that never carried one. */
    time: number;
    caption: string;
    onClose: () => void;
}

/** `ExternalImageWidget.HORIZONTAL_ITEM_SPACING` / `VERTICAL_SPACE`. */
const HORIZONTAL_ITEM_SPACING = 10;
const VERTICAL_SPACE = 71;
/** The `previousButton` / `nextButton` regions of `stories_image_widget`. */
const BROWSE_BUTTON_SIZE = 64;
/** `imageLoader`'s layout size, which `clearImage` fills black (less its 1px outline) until the photo is in. */
const EMPTY_IMAGE_SIZE = 322;
/**
 * `buttonContainer` is a `boxsizer` that fits its visible children: padding 8/5, spacing 5, and of
 * its four children only the 19x28 `closebutton` and the 3x35 spacer are shown here.
 */
const BUTTON_CONTAINER_WIDTH = 8 + 19 + 5 + 3 + 8;
const BUTTON_CONTAINER_HEIGHT = 5 + 35 + 5;

/**
 * A photo hung on the wall, on the `stories_image_widget` layout. The layout's own geometry is only
 * a placeholder: `ExternalImageWidget.drawImage` sizes everything around the loaded photo - the
 * `imageLoader` bitmap is the photo plus a 1px outline (the photo drawn black at the four 1px
 * offsets, then itself), 84px in and 71px down; the translucent black `bgBorder` and the window
 * are 71px taller than it on each side and 10px + a browse button + 10px wider on each side; the
 * button box sits in the top right corner, the date under the photo's left edge and the sender
 * under its right. `updateWindowPosition` centres the window, or pins it 50px from the edge on an
 * axis the photo does not fit (stage less 100 across, less 200 down). The whole window drags
 * (`draggable_with_mouse`).
 *
 * Only the sender's name and the date are shown - `captionContainer` is `visible="false"` and
 * Flash never shows it. What this port leaves out: the report and remove buttons of
 * `buttonContainer` (the help flow and `deleteCard` confirmation are not ported), the next and
 * previous buttons (they browse the room's other wall items of the same type, which the widget
 * does not list), the sender's name opening their profile, and the share area.
 */
export const FurnitureExternalImageView = ({ imageUrl, creatorName, time, onClose }: FurnitureExternalImageViewProps) => {
    const viewport = useViewportSize();
    const texture = useTextureFromUrl(imageUrl || undefined);
    const date = new Date(time);

    const imageWidth = texture ? (texture.width + 2) : EMPTY_IMAGE_SIZE;
    const imageHeight = texture ? (texture.height + 2) : EMPTY_IMAGE_SIZE;
    const imageLeft = ((HORIZONTAL_ITEM_SPACING * 2) + BROWSE_BUTTON_SIZE);
    const imageBottom = (VERTICAL_SPACE + imageHeight);
    const width = (imageWidth + (HORIZONTAL_ITEM_SPACING * 4) + (BROWSE_BUTTON_SIZE * 2));
    const height = (imageHeight + (VERTICAL_SPACE * 2));
    const photoWidth = (imageWidth - 2);
    const photoHeight = (imageHeight - 2);

    return (
        <Region
            dragTarget
            dragTrigger
            layout={{
                position: 'absolute',
                left: (texture && (((viewport.width - 100) / texture.width) < 1)) ? 50 : Math.trunc((viewport.width - width) * 0.5),
                top: (texture && (((viewport.height - 200) / texture.height) < 1)) ? 50 : Math.trunc((viewport.height - height) * 0.5),
                width,
                height,
            }}
        >
            <Border
                variant="1"
                tintColor="#000000"
                blend={0.65}
                layout={{ position: 'absolute', left: 0, top: 0, width, height }}
            />
            <Region layout={{ position: 'absolute', left: imageLeft, top: VERTICAL_SPACE, width: imageWidth, height: imageHeight }}>
                <Region
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, top: 1, width: imageWidth, height: photoHeight }}
                />
                <Region
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 1, top: 0, width: photoWidth, height: imageHeight }}
                />
                {texture && (
                    <ThemeImage
                        texture={texture}
                        layout={{ position: 'absolute', left: 1, top: 1, width: photoWidth, height: photoHeight }}
                    />
                )}
            </Region>
            <Region layout={{ position: 'absolute', left: width - BUTTON_CONTAINER_WIDTH, top: 0, width: BUTTON_CONTAINER_WIDTH, height: BUTTON_CONTAINER_HEIGHT, flexDirection: 'row', alignItems: 'flex-start', gap: 5, paddingLeft: 8, paddingRight: 8, paddingTop: 5, paddingBottom: 5 }}>
                <CloseButton
                    variant="3"
                    tintColor="#de4537"
                    onPointerTap={onClose}
                    layout={{ width: 19, height: 28, flexShrink: 0 }}
                />
                <Region layout={{ width: 3, height: 35, flexShrink: 0 }} />
            </Region>
            {!!creatorName.length && (
                <>
                    <Region layout={{ position: 'absolute', right: width - (imageLeft + imageWidth) + 3, top: imageBottom + 2, height: 24, flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 4, paddingTop: 4, paddingRight: 4, paddingBottom: 4 }}>
                        <ThemeText
                            text={creatorName}
                            textStyle="id_link_regular"
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: imageLeft + 3, top: imageBottom, height: 24, flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 4, paddingTop: 4, paddingRight: 4, paddingBottom: 4 }}>
                        <ThemeText
                            text={`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}
                            textStyle="id_regular"
                        />
                    </Region>
                </>
            )}
        </Region>
    );
};
