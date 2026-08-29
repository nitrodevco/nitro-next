import { BoxLayout, ContainerButton } from '#base/theme';

/** Row template `send_button` of ChatinputWindowLayout - pass real rows through its `items…` slot. */
export interface ChatinputWindowLayoutSendButtonItemProps {
    captionSendButtonText?: string;
    layout?: BoxLayout;
    onSendButton?: () => void;
}

export const ChatinputWindowLayoutSendButtonItem = ({ captionSendButtonText, layout, onSendButton }: ChatinputWindowLayoutSendButtonItemProps) => {
    return (
        <ContainerButton
            variant="4"
            name="send_button"
            onPointerTap={onSendButton}
            layout={{ width: 47, height: 38, flexShrink: 0, ...layout }}
        >
            {captionSendButtonText ?? '.'}
        </ContainerButton>
    );
};
