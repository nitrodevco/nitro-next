import { useViewportSize } from '#base/hooks';
import { Region, TemplateWindows, ThemeImage, useTextureFromUrl } from '#base/theme';

import { FurnitureTemplatePanel } from './FurnitureTemplatePanel';

export interface FurnitureExternalImageViewProps {
    imageUrl: string;
    creatorName: string;
    /** Milliseconds since the epoch; 0 for a photo that never carried one. */
    time: number;
    caption: string;
    /** `showWithRoomObject`: `reportButtonContainer` shows for a poster, or for a selfie under `stories.report.selfie.enabled`. */
    reportVisible: boolean;
    /** `reportButton`: `openReportImage`. */
    onReport: () => void;
    onClose: () => void;
}

/** `ExternalImageWidget.drawImage`'s spacing: 10 beside each browse button, 71 above and below the photo. */
const HORIZONTAL_ITEM_SPACING = 10;
const VERTICAL_SPACE = 71;
/** The `previousButton` / `nextButton` regions' width. */
const BROWSE_BUTTON_SIZE = 64;
/** `imageLoader`'s layout size, which `clearImage` fills black (less its 1px outline) until the photo is in. */
const EMPTY_IMAGE_SIZE = 322;

/**
 * A photo hung on the wall - `ExternalImageWidget` on `stories_image_widget_xml`. The layout's own
 * geometry is only a placeholder: `drawImage` sizes everything around the photo in `imageLoader` -
 * the photo plus a 1px outline (the photo drawn black at the four 1px offsets, then itself) - at
 * `10 * 2 + previousButton.width` across and 71 down; `bgBorder` and the window 71 taller than it
 * on each side and 10 + a browse button + 10 wider on each side; `buttonContainer` at the top right;
 * `creationDate` under the photo's left edge and `senderNameButton` under its right.
 * `updateWindowPosition` centres the window, or pins it 50 from the edge on an axis the photo does not
 * fit (stage less 100 across, less 200 down). The whole window drags (`draggable_with_mouse`).
 *
 * `loadPhoto` names the sender and the date only for a photo that has a sender (`senderNameButton`
 * hidden otherwise, by `clearImage`). `captionContainer` stays hidden, as Flash never shows it.
 * `reportButton` reports the photo (`openReportImage`, `HabboHelp.startPhotoReportingInNewCfhFlow`).
 * What this port leaves out: the remove button of `buttonContainer` (the `deleteCard` confirmation is
 * not ported), the next and previous buttons (they browse the room's
 * other wall items of the same type, which the widget does not list), the sender's name opening
 * their profile, the moderator's name copy (`name_copy_wrapper`) and the share area.
 */
export const FurnitureExternalImageView = ({ imageUrl, creatorName, time, reportVisible, onReport, onClose }: FurnitureExternalImageViewProps) => {
    const viewport = useViewportSize();
    const texture = useTextureFromUrl(imageUrl || undefined);
    const date = new Date(time);

    // `onImageLoaded`: `imageLoader` takes the photo's size plus its outline.
    const imageWidth = texture ? (texture.width + 2) : EMPTY_IMAGE_SIZE;
    const imageHeight = texture ? (texture.height + 2) : EMPTY_IMAGE_SIZE;
    const width = imageWidth + (HORIZONTAL_ITEM_SPACING * 4) + (BROWSE_BUTTON_SIZE * 2);
    const height = imageHeight + (VERTICAL_SPACE * 2);
    const photoWidth = imageWidth - 2;
    const photoHeight = imageHeight - 2;

    /** `drawImage`, in its order. */
    const arrange = ({ find, root }: TemplateWindows) => {
        const window = root();
        const image = find('imageLoader');
        const previous = find('previousButton');
        const next = find('nextButton');
        const border = find('bgBorder');
        const sender = find('senderNameButton');
        const creationDate = find('creationDate');
        const buttons = find('buttonContainer');

        if (!window || !image || !previous || !next || !border || !sender || !creationDate || !buttons) return;

        image.setRectangle(image.x, image.y, imageWidth, imageHeight);
        previous.setX(HORIZONTAL_ITEM_SPACING);
        border.setRectangle(0, 0, border.width, border.height);
        image.setRectangle((HORIZONTAL_ITEM_SPACING * 2) + previous.width, VERTICAL_SPACE, image.width, image.height);
        window.setHeight(image.height + (VERTICAL_SPACE * 2));
        border.setHeight(window.height);
        window.setWidth(image.width + (HORIZONTAL_ITEM_SPACING * 4) + (previous.width * 2));
        border.setWidth(window.width);
        sender.setX(image.x + image.width - sender.width - 3);
        creationDate.setRectangle(image.x + 3, image.y + image.height, creationDate.width, creationDate.height);
        sender.setY(image.y + image.height);
        buttons.setRectangle(border.x + border.width - buttons.width, 0, buttons.width, buttons.height);
        next.setX(image.x + image.width + HORIZONTAL_ITEM_SPACING);

        // `updateWindowPosition`: the browse buttons in the middle of the window's height, or of the stage's.
        const middle = Math.trunc(((border.height > viewport.height) ? (viewport.height / 2) : (border.height / 2)) - (previous.height / 2));

        previous.setY(middle);
        next.setY(middle);
    };

    return (
        <FurnitureTemplatePanel
            id="habbo-room-ui-com/stories_image_widget_xml"
            position={{
                x: (texture && (((viewport.width - 100) / texture.width) < 1)) ? 50 : Math.trunc((viewport.width - width) * 0.5),
                y: (texture && (((viewport.height - 200) / texture.height) < 1)) ? 50 : Math.trunc((viewport.height - height) * 0.5),
            }}
            size={{ width, height }}
            arrange={arrange}
            bindings={{
                imageLoader: {
                    children: (
                        <>
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
                        </>
                    ),
                },
                reportButtonContainer: { visible: reportVisible },
                reportButton: { onPointerTap: onReport },
                removeButtonContainer: { visible: false },
                closebutton: { onPointerTap: onClose },
                previousButton: { visible: false },
                nextButton: { visible: false },
                senderNameButton: { visible: !!creatorName.length },
                senderName: { caption: creatorName, setCaptionAfterBuild: true },
                creationDate: { caption: creatorName.length ? `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` : '', setCaptionAfterBuild: true },
            }}
        />
    );
};
