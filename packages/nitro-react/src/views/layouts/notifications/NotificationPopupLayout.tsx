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
    visibleLink?: boolean;
}

export const NotificationPopupLayout = ({ captionLink, captionMessage, layout, onAction, onClose, onLink, srcIllustration, visibleAction, visibleLink }: NotificationPopupLayoutProps) => {
    return (
        <Frame
            variant="3"
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 306, height: 92, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 3, top: 2, flexDirection: 'row' }}>
                <ThemeImage
                    name="illustration"
                    src={srcIllustration}
                    layout={{ width: 1, height: 1, flexShrink: 0 }}
                />
                <Region layout={{ flexShrink: 0, flexDirection: 'column' }}>
                    <Region
                        name="message"
                        layout={{ width: 293, height: 12, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMessage ?? ''}
                            textOptions={{ wordWrap: true, wordWrapWidth: 293 }}
                        />
                    </Region>
                    {(visibleLink ?? false) && (
                        <Region
                            name="link"
                            layout={{ width: 293, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            onPointerTap={onLink}
                            cursor="pointer"
                        >
                            <ThemeText
                                text={captionLink ?? ''}
                                textOptions={{ wordWrap: true, wordWrapWidth: 293, align: 'center' }}
                            />
                        </Region>
                    )}
                    {(visibleAction ?? false) && (
                        <Button
                            variant="3"
                            name="action"
                            onPointerTap={onAction}
                            layout={{ width: 20, height: 30, flexShrink: 0 }}
                        />
                    )}
                </Region>
            </Region>
        </Frame>
    );
};
