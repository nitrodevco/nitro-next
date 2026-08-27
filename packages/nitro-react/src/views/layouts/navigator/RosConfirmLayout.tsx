import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `3029_ros_confirm_xml` (layout "ros_room_delete_confirm", 215x203) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosConfirmLayoutProps {
    captionMessage?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onOk?: () => void;
}

export const RosConfirmLayout = ({ captionMessage, layout, onClose, onOk }: RosConfirmLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            params={32769}
            caption="title"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 215, height: 203, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="message"
                    params={2177}
                    layout={{ position: 'absolute', left: 10, width: 190, top: 7, height: 122, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessage ?? 'message'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                    />
                </Region>
                <ButtonThick
                    variant="5"
                    name="ok"
                    params={132113}
                    tintColor="#bb2200"
                    onPointerTap={onOk}
                    layout={{ position: 'absolute', left: 5, width: 199, top: 129, height: 29, minWidth: 199, maxWidth: 199 }}
                >
                    {t('generic.ok')}
                </ButtonThick>
            </Region>
        </Frame>
    );
};
