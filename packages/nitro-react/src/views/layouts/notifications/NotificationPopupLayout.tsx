import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `2959_notification_popup_xml` (layout "notification_popup", 306x92) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NotificationPopupLayoutProps {
    captionLink?: string;
    captionMessage?: string;
    layout?: BoxLayout;
    onAction?: () => void;
    onClose?: () => void;
    onLink?: () => void;
    srcIllustration?: string;
    visibleAction?: boolean;
}

export const NotificationPopupLayout = ({ captionLink, captionMessage, layout, onAction, onClose, onLink, srcIllustration, visibleAction }: NotificationPopupLayoutProps) => {
    return (
        <Frame
            variant="3"
            params={32769}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 306, height: 92, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={12730384}
                    layout={{ position: 'absolute', left: 3, width: 294, top: 2, height: 46, flexDirection: 'row' }}
                >
                    <ThemeImage
                        name="illustration"
                        params={16}
                        src={srcIllustration}
                        layout={{ width: 1, height: 1, flexShrink: 0 }}
                    />
                    <Region
                        params={8536080}
                        layout={{ width: 293, height: 46, flexShrink: 0, flexDirection: 'column' }}
                    >
                        <Region
                            name="message"
                            params={16}
                            layout={{ width: 293, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionMessage ?? ''}
                                textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
                            />
                        </Region>
                        <Region
                            name="link"
                            params={16385}
                            visible={false}
                            layout={{ width: 293, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            onPointerTap={onLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionLink ?? ''}
                                textOptions={{ wordWrap: true, wordWrapWidth: 293, align: 'center' }}
                            />
                        </Region>
                        <Region
                            visible={visibleAction ?? false}
                            layout={{ width: 20, height: 30, flexShrink: 0 }}
                        >
                            <Button
                                variant="3"
                                name="action"
                                params={131281}
                                onPointerTap={onAction}
                                layout={{ width: '100%', height: '100%' }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
