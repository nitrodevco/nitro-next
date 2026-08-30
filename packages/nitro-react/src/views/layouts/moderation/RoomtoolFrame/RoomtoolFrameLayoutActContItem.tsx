import { Border, BoxLayout, CheckBox, ThemeText } from '#base/theme';

/** Row template `act_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutActContItemProps {
    layout?: BoxLayout;
    onChangenameCheck?: () => void;
    onKickCheck?: () => void;
    onLockCheck?: () => void;
    visibleChangenameCheck?: boolean;
    visibleKickCheck?: boolean;
    visibleLockCheck?: boolean;
}

export const RoomtoolFrameLayoutActContItem = ({ layout, onChangenameCheck, onKickCheck, onLockCheck, visibleChangenameCheck, visibleKickCheck, visibleLockCheck }: RoomtoolFrameLayoutActContItemProps) => {
    return (
        <Border
            variant="0"
            name="act_cont"
            layout={{ width: 230, height: 76, flexShrink: 0, ...layout }}
        >
            {(visibleKickCheck ?? true) && (
                <CheckBox
                    variant="0"
                    name="kick_check"
                    onPointerTap={onKickCheck}
                    layout={{ position: 'absolute', left: 5, width: 16, top: 5, height: 16 }}
                >
                    Room Info
                </CheckBox>
            )}
            {(visibleLockCheck ?? true) && (
                <CheckBox
                    variant="0"
                    name="lock_check"
                    onPointerTap={onLockCheck}
                    layout={{ position: 'absolute', left: 5, width: 16, top: 30, height: 16 }}
                >
                    Room Info
                </CheckBox>
            )}
            {(visibleChangenameCheck ?? true) && (
                <CheckBox
                    variant="0"
                    name="changename_check"
                    onPointerTap={onChangenameCheck}
                    layout={{ position: 'absolute', left: 5, width: 16, top: 54, height: 16 }}
                >
                    Room Info
                </CheckBox>
            )}
            <ThemeText
                text="Kick users out of the room (automatically stops the event)"
                textOptions={{ wordWrap: true, wordWrapWidth: 199 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 24, width: 199, top: 5, height: 25 }}
            />
            <ThemeText
                text="Change room lock to doorbell"
                layout={{ position: 'absolute', left: 24, width: 199, top: 31, height: 16 }}
            />
            <ThemeText
                text="Change room name to 'Inappropriate to hotel management'"
                textOptions={{ wordWrap: true, wordWrapWidth: 199 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 24, width: 199, top: 48, height: 25 }}
            />
        </Border>
    );
};
