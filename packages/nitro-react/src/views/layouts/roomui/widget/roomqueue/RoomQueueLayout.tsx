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
    visibleSpectatorInfo?: boolean;
}

export const RoomQueueLayout = ({ captionInfoText, captionSpectatorInfo, layout, onCancelButton, onChangeButton, onClose, visibleChangeButton, visibleSpectatorInfo }: RoomQueueLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('room.queue.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 229, height: 118, minWidth: 229, minHeight: 118, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <ThemeText
                    text={captionInfoText ?? 'Your position in the queue: 5'}
                    textStyle="text-style-u-bold"
                    textOptions={{ wordWrap: true, wordWrapWidth: 217, align: 'center' }}
                    name="info_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 21, height: 17 }}
                />
                {(visibleSpectatorInfo ?? false) && (
                    <ThemeText
                        text={captionSpectatorInfo ?? t('room.queue.spectator.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 266 }}
                        name="spectator_info"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 21, width: 266, top: 68, height: 29 }}
                    />
                )}
                <Button
                    variant="3"
                    name="cancel_button"
                    onPointerTap={onCancelButton}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 154, bottom: 0, height: 27 }}
                >
                    {t('room.queue.button.exit')}
                </Button>
                {(visibleChangeButton ?? false) && (
                    <Button
                        variant="3"
                        name="change_button"
                        onPointerTap={onChangeButton}
                        layout={{ position: 'absolute', marginLeft: 47.5, marginRight: -47.5, width: 178, top: 140, height: 26 }}
                    >
                        {t('room.queue.spectatormode')}
                    </Button>
                )}
            </Region>
        </Frame>
    );
};
