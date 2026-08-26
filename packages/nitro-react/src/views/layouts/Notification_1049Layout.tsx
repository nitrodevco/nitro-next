import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1049_notification_xml` (layout "notification", 315x191) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Notification_1049LayoutProps {
    layout?: BoxLayout;
    onButtonOk?: () => void;
    onClose?: () => void;
}

export const Notification_1049Layout = ({ layout, onButtonOk, onClose }: Notification_1049LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="1"
            id="widget_notification_frame"
            name="widget_notification_frame"
            tags={[ 'room_widget_teaser' ]}
            params={32769}
            caption="widget.notification.header"
            tintColor="#4c4c4c"
            onClose={onClose}
            layout={{ width: 315, height: 191, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    params={2192}
                    tintColor="#4c4c4c"
                    blend={0}
                    layout={{ position: 'absolute', left: 0, width: 303, top: 0, height: 159 }}
                >
                    <Border
                        variant="0"
                        name="white_border"
                        params={2192}
                        layout={{ position: 'absolute', left: 0, width: 303, top: 0, height: 159 }}
                    />
                    <Region
                        name="text_title"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 284, top: 12, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="widget.notification.title"
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#666666' }}
                        />
                    </Region>
                    <Region
                        name="text_description"
                        params={2192}
                        layout={{ position: 'absolute', left: 10, width: 282, top: 35, height: 58, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="widget.notification.description"
                            textOptions={{ fill: '#888888', wordWrap: true, wordWrapWidth: 282 }}
                        />
                    </Region>
                    <ContainerButton
                        variant="1"
                        name="button_ok"
                        params={787665}
                        onPointerTap={onButtonOk}
                        layout={{ position: 'absolute', left: 101, width: 100, top: 102, height: 46, minHeight: 46, maxHeight: 46 }}
                    >
                        widget.notification.header
                        <Border
                            variant="3"
                            params={144}
                            tintColor="#006d00"
                            layout={{ position: 'absolute', left: 3, width: 94, top: 3, height: 40 }}
                        />
                        <Border
                            variant="3"
                            params={144}
                            tintColor="#309d00"
                            layout={{ position: 'absolute', left: 6, width: 88, top: 6, height: 17 }}
                        />
                        <Region
                            params={3932368}
                            layout={{ position: 'absolute', left: 37, width: 25, top: 10, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('ok')}
                                textStyle="text-style-bold"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </ContainerButton>
                    <ThemeImage
                        name="deco_img"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 20, width: 90, top: 15, height: 90, minWidth: 90, maxWidth: 90, minHeight: 90, maxHeight: 90 }}
                    />
                </Border>
            </Region>
        </Frame>
    );
};
