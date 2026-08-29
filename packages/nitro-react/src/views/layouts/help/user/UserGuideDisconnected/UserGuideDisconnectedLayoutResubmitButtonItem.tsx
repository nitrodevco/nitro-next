import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `resubmit_button` of UserGuideDisconnectedLayout - pass real rows through its `items…` slot. */
export interface UserGuideDisconnectedLayoutResubmitButtonItemProps {
    layout?: BoxLayout;
    onResubmitButton?: () => void;
}

export const UserGuideDisconnectedLayoutResubmitButtonItem = ({ layout, onResubmitButton }: UserGuideDisconnectedLayoutResubmitButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="101"
            name="resubmit_button"
            tintColor="#bbbbbb"
            onPointerTap={onResubmitButton}
            layout={{ width: 346, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48, ...layout }}
        >
            {t('guide.help.request.user.guide.disconnected.resubmit.button')}
        </Button>
    );
};
