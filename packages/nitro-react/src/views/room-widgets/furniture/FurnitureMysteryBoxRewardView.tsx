import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { useConfigValue, useTranslation } from '#base/context/system';
import { Button, Frame, ModalDialog, Region, ThemeImage, ThemeText } from '#base/theme';
import { useFurnitureImageTexture } from '#base/views/catalog/useFurnitureImageTexture';

export interface FurnitureMysteryBoxRewardViewProps {
    /** The prize's furni class name, for a floor (`s`) or wall (`i`) item; nothing is drawn for other prizes. */
    rewardType: string | undefined;
    rewardColorIndex: number;
    onClose: () => void;
}

/**
 * What the box held, on the `mystery_box_reward` layout (430x234) -
 * `MysteryBoxOpenDialogView.showRewardWindow`: the title, the prize drawn over the achievement star
 * in `bitmap_container`, and the close button, stacked by the layout's item list (at 0, 8, 4px
 * apart). The prize is the room engine's image of the furni at scale 64, facing 90 degrees.
 *
 * Flash also draws an effect's or a subscription's icon from the catalog for the `e` and `h`
 * prizes; the port has neither icon to hand, so those show the star alone. The dialog is modal in
 * Flash (`buildModalDialogFromXML`), so it is a `ModalDialog`, centred over the darkened desktop. The prize
 * is centred in its 109x109 container, where Flash re-centres it through the container's resize.
 */
export const FurnitureMysteryBoxRewardView = ({ rewardType, rewardColorIndex, onClose }: FurnitureMysteryBoxRewardViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const reward = useFurnitureImageTexture(rewardType, rewardColorIndex, 90, RoomGeometryScaleType.ZoomedIn);

    return (
        <ModalDialog>
            <Frame
                variant="100"
                caption={t('mysterybox.reward.text')}
                // The layout's frame (`params="1"`) is no `mouse_dragging_target`: Flash cannot drag it.
                draggable={false}
                dropShadow={{ angle: 0, alpha: 0.35, blur: 20 }}
                onClose={onClose}
                rememberPosition={false}
                resizeDirection="none"
                margins={[ 1, 30, 1, 1 ]}
                layout={{ width: 430, height: 234 }}
            >
                <Region layout={{ position: 'absolute', left: 0, top: 8, width: 428, flexDirection: 'column', gap: 4 }}>
                    <ThemeText
                        text={t('mysterybox.reward.title')}
                        textStyle="il_regular"
                        verticalAlign="top"
                        layout={{ marginLeft: 150, height: 16, flexShrink: 0 }}
                    />
                    <Region layout={{ marginLeft: 160, width: 109, height: 109, flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeImage
                            src={`${imageLibraryUrl}Quests/ach_receive_star.png`}
                            bitmap={{ fitSizeToContents: true }}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                        {reward.texture && (
                            <ThemeImage
                                texture={reward.texture}
                                width={reward.width}
                                height={reward.height}
                            />
                        )}
                    </Region>
                    <Button
                        variant="100"
                        onPointerTap={onClose}
                        layout={{ marginLeft: 127, height: 52, flexShrink: 0, alignSelf: 'flex-start' }}
                    >
                        {t('mysterybox.reward.close')}
                    </Button>
                </Region>
            </Frame>
        </ModalDialog>
    );
};
