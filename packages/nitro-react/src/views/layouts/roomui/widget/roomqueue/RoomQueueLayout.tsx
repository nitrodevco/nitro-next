import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `913_room_queue_xml` (layout "room_queue", 229x118) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomQueueLayoutProps {
    captionInfoText?: string;
    captionSpectatorInfo?: string;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onChangeButton?: () => void;
    onClose?: () => void;
    visibleChangeButton?: boolean;
}

export const RoomQueueLayout = ({ captionInfoText, captionSpectatorInfo, layout, onCancelButton, onChangeButton, onClose, visibleChangeButton }: RoomQueueLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('room.queue.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 229, height: 118, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    name="info_text"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 217, top: 21, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionInfoText ?? 'Your position in the queue: 5'}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 217, align: 'center' }}
                    />
                </Region>
                <Region
                    name="spectator_info"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 21, width: 266, top: 68, height: 29, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSpectatorInfo ?? t('room.queue.spectator.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 266 }}
                    />
                </Region>
                <Button
                    variant="3"
                    name="cancel_button"
                    params={917521}
                    onPointerTap={onCancelButton}
                    layout={{ position: 'absolute', marginLeft: -6.5, marginRight: 6.5, width: 154, top: 50, height: 27 }}
                >
                    {t('room.queue.button.exit')}
                </Button>
                <Region
                    visible={visibleChangeButton ?? false}
                    layout={{ position: 'absolute', marginLeft: 41.5, marginRight: -41.5, width: 178, top: 140, height: 26 }}
                >
                    <Button
                        variant="3"
                        name="change_button"
                        params={917521}
                        onPointerTap={onChangeButton}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        {t('room.queue.spectatormode')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};
