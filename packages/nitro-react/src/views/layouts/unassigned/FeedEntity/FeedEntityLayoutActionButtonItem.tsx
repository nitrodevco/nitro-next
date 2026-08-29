import { BoxLayout, Button } from '#base/theme';

/** Row template `action_button` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutActionButtonItemProps {
    layout?: BoxLayout;
    onActionButton?: () => void;
}

export const FeedEntityLayoutActionButtonItem = ({ layout, onActionButton }: FeedEntityLayoutActionButtonItemProps) => {
    return (
        <Button
            variant="3"
            name="action_button"
            onPointerTap={onActionButton}
            layout={{ width: 65, height: 22, flexShrink: 0, ...layout }}
        >
            _button
        </Button>
    );
};
