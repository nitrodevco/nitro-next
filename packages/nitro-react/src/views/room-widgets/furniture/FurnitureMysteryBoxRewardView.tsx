import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { useFurnitureImageTexture } from '#base/hooks';
import { Box, ModalDialog, TemplateWindow, TemplateWindows, ThemeImage, useTemplateFrame } from '#base/theme';

export interface FurnitureMysteryBoxRewardViewProps {
    /** The prize's furni class name, for a floor (`s`) or wall (`i`) item; nothing is drawn for other prizes. */
    rewardType: string | undefined;
    rewardColorIndex: number;
    onClose: () => void;
}

/**
 * What the box held - `MysteryBoxOpenDialogView.showRewardWindow`, which builds `mystery_box_reward`
 * as a modal dialog (`buildModalDialogFromXML`): the prize is the room engine's image of the furni at
 * scale 64, facing 90 degrees, and `set rewardBitmap` puts it in `reward_image` and sizes
 * `bitmap_container` to it (then a pixel wider), over the achievement star. `close_button` and the
 * header close close (`rewardWindowProcedure`).
 *
 * The prize is drawn centred in `bitmap_container`, where Flash centres `reward_image` through the
 * container's resize. Flash also draws an effect's or a subscription's icon from the catalog for the
 * `e` and `h` prizes; the port has neither icon to hand, so those show the star alone.
 */
export const FurnitureMysteryBoxRewardView = ({ rewardType, rewardColorIndex, onClose }: FurnitureMysteryBoxRewardViewProps) => {
    const frame = useTemplateFrame({ id: 'mystery-box-reward', modal: true, draggable: false, rememberPosition: false, onClose });
    const reward = useFurnitureImageTexture(rewardType, rewardColorIndex, 90, RoomGeometryScaleType.ZoomedIn);

    // `set rewardBitmap`: the container takes the bitmap's size, then one more across.
    const arrange = ({ find }: TemplateWindows) => {
        const container = find('bitmap_container');

        if (!container || !reward.texture) return;

        container.setWidth(reward.width);
        container.setHeight(reward.height);
        container.setWidth(container.width + 1);
    };

    return (
        <ModalDialog>
            <TemplateWindow
                id="habbo-room-ui-com/mystery_box_reward"
                frame={frame}
                arrange={arrange}
                bindings={{
                    bitmap_container: {
                        children: reward.texture && (
                            <Box layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <ThemeImage
                                    texture={reward.texture}
                                    width={reward.width}
                                    height={reward.height}
                                />
                            </Box>
                        ),
                    },
                    close_button: { onPointerTap: onClose },
                }}
            />
        </ModalDialog>
    );
};
