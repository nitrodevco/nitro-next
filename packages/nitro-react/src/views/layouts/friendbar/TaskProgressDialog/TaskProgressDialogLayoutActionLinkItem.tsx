import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `action_link` of TaskProgressDialogLayout - pass real rows through its `items…` slot. */
export interface TaskProgressDialogLayoutActionLinkItemProps {
    layout?: BoxLayout;
    onActionLink?: () => void;
}

export const TaskProgressDialogLayoutActionLinkItem = ({ layout, onActionLink }: TaskProgressDialogLayoutActionLinkItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="101"
            name="action_link"
            tintColor="#bbbbbb"
            onPointerTap={onActionLink}
            layout={{ width: 246, height: 55, flexShrink: 0, ...layout }}
        >
            {t('talent.track.task.progress.dialog.thanks')}
        </Button>
    );
};
