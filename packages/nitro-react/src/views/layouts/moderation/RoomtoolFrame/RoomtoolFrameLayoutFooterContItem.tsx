import { BoxLayout, Button, Region } from '#base/theme';

/** Row template `footer_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutFooterContItemProps {
    layout?: BoxLayout;
    onSendCautionBut?: () => void;
    onSendMessageBut?: () => void;
    visibleSendCautionBut?: boolean;
    visibleSendMessageBut?: boolean;
}

export const RoomtoolFrameLayoutFooterContItem = ({ layout, onSendCautionBut, onSendMessageBut, visibleSendCautionBut, visibleSendMessageBut }: RoomtoolFrameLayoutFooterContItemProps) => {
    return (
        <Region
            name="footer_cont"
            layout={{ width: 230, height: 21, flexShrink: 0, ...layout }}
        >
            {(visibleSendCautionBut ?? true) && (
                <Button
                    variant="0"
                    name="send_caution_but"
                    onPointerTap={onSendCautionBut}
                    layout={{ position: 'absolute', left: 0, width: 97, top: 0, bottom: 0, minWidth: 97, maxWidth: 97 }}
                >
                    Send Caution
                </Button>
            )}
            {(visibleSendMessageBut ?? true) && (
                <Button
                    variant="0"
                    name="send_message_but"
                    onPointerTap={onSendMessageBut}
                    layout={{ position: 'absolute', left: 131, width: 97, top: 0, bottom: 0, minWidth: 97, maxWidth: 97 }}
                >
                    Send message
                </Button>
            )}
        </Region>
    );
};
