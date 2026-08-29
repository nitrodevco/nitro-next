import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region } from '#base/theme';

/** Row template `buttonContainer` of HabboOrderinfoDialogLayout - pass real rows through its `items…` slot. */
export interface HabboOrderinfoDialogLayoutButtonContainerItemProps {
    layout?: BoxLayout;
    onButtonCancel?: () => void;
    onButtonOk?: () => void;
    visibleButtonCancel?: boolean;
    visibleButtonOk?: boolean;
}

export const HabboOrderinfoDialogLayoutButtonContainerItem = ({ layout, onButtonCancel, onButtonOk, visibleButtonCancel, visibleButtonOk }: HabboOrderinfoDialogLayoutButtonContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttonContainer"
            layout={{ width: 281, height: 34, flexShrink: 0, ...layout }}
        >
            {(visibleButtonCancel ?? true) && (
                <Button
                    variant="3"
                    name="button_cancel"
                    onPointerTap={onButtonCancel}
                    layout={{ position: 'absolute', left: 151, right: 74, top: 3, height: 22, maxWidth: 130 }}
                >
                    {t('generic.cancel')}
                </Button>
            )}
            {(visibleButtonOk ?? true) && (
                <Button
                    variant="3"
                    name="button_ok"
                    onPointerTap={onButtonOk}
                    layout={{ position: 'absolute', left: 80, right: 166, top: 3, height: 22, maxWidth: 130 }}
                >
                    {t('generic.ok')}
                </Button>
            )}
        </Region>
    );
};
