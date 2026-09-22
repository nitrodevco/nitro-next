import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, Button, Frame, LayoutImage, ModalDialog, ThemeImage, ThemeText } from '#base/theme';

export interface FurnitureMysteryBoxViewProps {
    /**
     * Whether you are the one who put the box down. The box holder and the key holder see the
     * same dialog with the halves swapped: each waits for what the other has.
     */
    isOwner: boolean;
    onCancel: () => void;
    onClose: () => void;
}

/**
 * A mystery box that has been started and is waiting on the other half, on the
 * `mystery_box_open_dialog` layout (361x271) - `MysteryBoxOpenDialogView.showWaitWindow`, which
 * captions the window and its texts from `mysterybox.dialog.owner.*` or `.other.*` and puts your
 * half beside the star and the half you wait for in the box below. Nothing here decides anything:
 * the server says when to show it, when to take it away, and what came out.
 *
 * Flash builds it as a modal dialog (`buildModalDialogFromXML`), so it is a `ModalDialog`, centred
 * over the darkened desktop. Flash also tints both `*_base` bitmaps with
 * `MysteryBoxToolbarExtension.KEY_COLORS` of the session's box or key colour, which the port's
 * session does not keep, so they draw in their own colour. `cancel_button` fits its caption and
 * grows to the right from its layout x.
 */
export const FurnitureMysteryBoxView = ({ isOwner, onCancel, onClose }: FurnitureMysteryBoxViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const prefix = isOwner ? 'mysterybox.dialog.owner.' : 'mysterybox.dialog.other.';
    const mine = isOwner ? 'box' : 'key';
    const theirs = isOwner ? 'key' : 'box';

    return (
        <ModalDialog>
            <Frame
                variant="100"
                caption={t(`${prefix}title`)}
                // The layout's frame (`params="1"`) is no `mouse_dragging_target`: Flash cannot drag it.
                draggable={false}
                dropShadow={{ angle: 0, alpha: 0.35, blur: 20 }}
                onClose={onClose}
                rememberPosition={false}
                resizeDirection="none"
                margins={[ 1, 30, 1, 1 ]}
                layout={{ width: 361, height: 271 }}
            >
                <ThemeImage
                    src={`${imageLibraryUrl}Quests/ach_receive_star.png`}
                    bitmap={{ fitSizeToContents: true }}
                    layout={{ position: 'absolute', left: 7, top: 8 }}
                />
                <ThemeImage
                    src={LayoutImage(`room-ui/mysterybox_${mine}_base.png`)}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 41, top: 43, width: 39, height: 39 }}
                />
                <ThemeImage
                    src={LayoutImage(`room-ui/mysterybox_${mine}_overlay.png`)}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 41, top: 43, width: 39, height: 39 }}
                />
                <ThemeText
                    text={t(`${prefix}subtitle`)}
                    textStyle="il_heading_2"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 115, top: 34 }}
                />
                <Border
                    variant="102"
                    layout={{ position: 'absolute', left: 24, top: 123, width: 310, height: 60 }}
                >
                    <ThemeImage
                        src={LayoutImage(`room-ui/mysterybox_${theirs}_base.png`)}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 14, top: 11, width: 39, height: 39 }}
                    />
                    <ThemeImage
                        src={LayoutImage(`room-ui/mysterybox_${theirs}_overlay.png`)}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 14, top: 11, width: 39, height: 39 }}
                    />
                    <ThemeText
                        text={t(`${prefix}waiting`)}
                        textStyle="il_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 62, top: 22 }}
                    />
                </Border>
                <Button
                    variant="101"
                    tintColor="#bbbbbb"
                    onPointerTap={onCancel}
                    layout={{ position: 'absolute', left: 117, top: 186, height: 48 }}
                >
                    {t(`${prefix}cancel`)}
                </Button>
            </Frame>
        </ModalDialog>
    );
};
