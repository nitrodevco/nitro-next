import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';

/** Row template `extra_cont` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutExtraContItemProps {
    layout?: BoxLayout;
    onUnclaimedBtn?: () => void;
    visibleUnclaimedBtn?: boolean;
}

export const DailytasksLayoutExtraContItem = ({ layout, onUnclaimedBtn, visibleUnclaimedBtn }: DailytasksLayoutExtraContItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="extra_cont"
            layout={{ width: 428, height: 30, flexShrink: 0, ...layout }}
        >
            {(visibleUnclaimedBtn ?? true) && (
                <Button
                    variant="3"
                    name="unclaimed_btn"
                    tooltip={t('dailytasks.unclaimed.tooltip')}
                    onPointerTap={onUnclaimedBtn}
                    layout={{ position: 'absolute', right: 16, width: 133, top: 0, height: 30 }}
                >
                    {t('dailytasks.unclaimed')}
                </Button>
            )}
        </Region>
    );
};
