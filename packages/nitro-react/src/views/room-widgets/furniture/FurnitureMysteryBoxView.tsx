import { useTranslation } from '#base/context/system';
import { Border, Button, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

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
 * `mystery_box_open_dialog` layout (361x271). Nothing here decides anything: the server says
 * when to show it, when to take it away, and what came out.
 */
export const FurnitureMysteryBoxView = ({ isOwner, onCancel, onClose }: FurnitureMysteryBoxViewProps) => {
    const t = useTranslation();
    const prefix = isOwner ? 'mysterybox.dialog.owner.' : 'mysterybox.dialog.other.';
    const mine = isOwner ? 'box' : 'key';
    const theirs = isOwner ? 'key' : 'box';

    return (
        <Frame
            variant="100"
            id="furniture-mystery-box"
            caption={t(`${prefix}title`)}
            dropShadow={{ angle: 0, alpha: 0.35, blur: 20 }}
            onClose={onClose}
            defaultPosition={{ x: 120, y: 80 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 361, height: 271 }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region layout={{ position: 'absolute', left: 41, width: 39, top: 43, height: 39 }}>
                    <ThemeImage
                        src={LayoutImage(`room-ui/mysterybox_${mine}_base.png`)}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 39, height: 39 }}
                    />
                    <ThemeImage
                        src={LayoutImage(`room-ui/mysterybox_${mine}_overlay.png`)}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 39, height: 39 }}
                    />
                </Region>
                <ThemeText
                    text={t(`${prefix}subtitle`)}
                    textStyle="text-style-il-heading-2"
                    textOptions={{ wordWrap: true, wordWrapWidth: 201 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 115, width: 201, top: 34, height: 60 }}
                />
                <Border
                    variant="102"
                    layout={{ position: 'absolute', left: 25, width: 310, top: 123, height: 60 }}
                >
                    <Region layout={{ position: 'absolute', left: 14, width: 39, top: 11, height: 39 }}>
                        <ThemeImage
                            src={LayoutImage(`room-ui/mysterybox_${theirs}_base.png`)}
                            layout={{ position: 'absolute', left: 0, top: 0, width: 39, height: 39 }}
                        />
                        <ThemeImage
                            src={LayoutImage(`room-ui/mysterybox_${theirs}_overlay.png`)}
                            layout={{ position: 'absolute', left: 0, top: 0, width: 39, height: 39 }}
                        />
                    </Region>
                    <ThemeText
                        text={t(`${prefix}waiting`)}
                        textOptions={{ wordWrap: true, wordWrapWidth: 228 }}
                        layout={{ position: 'absolute', left: 62, width: 228, top: 8, height: 44 }}
                    />
                </Border>
                <Button
                    variant="101"
                    tintColor="#bbbbbb"
                    onPointerTap={onCancel}
                    layout={{ position: 'absolute', left: 25, width: 124, top: 186, height: 48 }}
                >
                    {t(`${prefix}cancel`)}
                </Button>
            </Region>
        </Frame>
    );
};
