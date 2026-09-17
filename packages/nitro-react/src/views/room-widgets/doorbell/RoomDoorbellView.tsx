import { useTranslation } from '#base/context/system';
import { Frame, Icon, Region, ScrollArea, ThemeText } from '#base/theme';

export interface RoomDoorbellViewProps {
    /** Everyone waiting at the door, in the order they rang. */
    users: string[];
    onAccept: (username: string) => void;
    onDeny: (username: string) => void;
    /** Closing the window turns everyone away, as the Flash close button did. */
    onClose: () => void;
}

/** `doorbell_list_entry` - one row per caller, striped by position. */
const ENTRY_HEIGHT = 20;

/**
 * Who is ringing at the door, on the `doorbell` layout (249x165). Only rooms you may answer for
 * ever fill it, and it is gone again as soon as the last caller has been let in or turned away.
 */
export const RoomDoorbellView = ({ users, onAccept, onDeny, onClose }: RoomDoorbellViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="room-doorbell"
            caption={t('widgets.doorbell.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 140, y: 110 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 249, height: 165 }}
        >
            <ThemeText
                text={t('widgets.doorbell.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, right: 12, top: 13, height: 32 }}
            />
            <Region
                name="user_list_container"
                backgroundColor="#eaece8"
                layout={{ position: 'absolute', left: 10, width: 217, top: 48, height: 82 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, bottom: 0 }}
                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column' }}
                >
                    {users.map((username, index) => (
                        <Region
                            key={username}
                            name={username}
                            // The rows alternate, the odd ones showing the list's own background.
                            backgroundColor={(index % 2 === 0) ? '#ffffff' : '#eeeeee'}
                            layout={{ width: '100%', height: ENTRY_HEIGHT, flexShrink: 0 }}
                        >
                            <ThemeText
                                text={username}
                                name="user_name"
                                layout={{ position: 'absolute', left: 3, width: 140, alignSelf: 'center', height: 17 }}
                            />
                            <Region
                                name="accept"
                                tooltip={t('widgets.doorbell.accept', 'Let in')}
                                onPointerTap={() => onAccept(username)}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 155, width: 18, top: 4, height: 15 }}
                            >
                                <Icon
                                    variant="8"
                                    tintColor="#00bb00"
                                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 15 }}
                                />
                            </Region>
                            <Region
                                name="deny"
                                tooltip={t('widgets.doorbell.deny', 'Turn away')}
                                onPointerTap={() => onDeny(username)}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 180, width: 15, top: 4, height: 13 }}
                            >
                                <Icon
                                    variant="9"
                                    tintColor="#ff0000"
                                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                                />
                            </Region>
                        </Region>
                    ))}
                </ScrollArea>
            </Region>
        </Frame>
    );
};
