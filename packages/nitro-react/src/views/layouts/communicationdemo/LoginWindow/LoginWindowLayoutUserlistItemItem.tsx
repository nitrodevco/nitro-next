import { BoxLayout, Button } from '#base/theme';

/** Row template `userlist_item` of LoginWindowLayout - pass real rows through its `items…` slot. */
export interface LoginWindowLayoutUserlistItemItemProps {
    layout?: BoxLayout;
    onUserlistItem?: () => void;
}

export const LoginWindowLayoutUserlistItemItem = ({ layout, onUserlistItem }: LoginWindowLayoutUserlistItemItemProps) => {
    return (
        <Button
            variant="102"
            name="userlist_item"
            onPointerTap={onUserlistItem}
            layout={{ alignSelf: 'stretch', height: 28, flexShrink: 0, minWidth: 196, maxWidth: 196, ...layout }}
        >
            username
        </Button>
    );
};
