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
 * Who is ringing at the door, on the `doorbell` layout (249x165, frame style 3, margins
 * 6/25/6/7) that `DoorbellView.createMainWindow` builds, one `doorbell_list_entry` per caller. Only rooms you may answer for
 * ever fill it, and it is gone again as soon as the last caller has been let in or turned away.
 *
 * The accept and deny buttons carry no tooltip: `doorbell_list_entry` gives the two regions no
 * caption or tooltip and `DoorbellView` sets none, so Flash showed only the icons.
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
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ position: 'absolute', width: 249, height: 165 }}
        >
            <ThemeText
                text={t('widgets.doorbell.info')}
                textOptions={{ fontFamily: 'Ubuntu', fontSize: 12, wordWrap: true, wordWrapWidth: 211 }}
                flashFormat={{ antiAliasType: 'advanced' }}
                clip
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
                    variant="0"
                    // The layout's own `scrollbar` window at x 200: it stays, disabled, while the list fits.
                    hideDisabledScrollbar={false}
                    layout={{ position: 'absolute', left: 0, width: 217, top: 0, bottom: 0 }}
                    // `user_list` at 0,0 200x82 and the layout's `scrollbar` beside it at 200,0 17x82.
                    viewportLayout={{ position: 'absolute', left: 0, top: 0, width: 200, height: 82 }}
                    scrollbarLayout={{ position: 'absolute', left: 200, top: 0, width: 17, height: 82 }}
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
                                textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                                flashFormat={{ antiAliasType: 'advanced' }}
                                name="user_name"
                                verticalAlign="top"
                                // `auto_size="left"`: the 58px field grows with the name.
                                layout={{ position: 'absolute', left: 3, width: 58, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 17 }}
                            />
                            <Region
                                name="accept"
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
