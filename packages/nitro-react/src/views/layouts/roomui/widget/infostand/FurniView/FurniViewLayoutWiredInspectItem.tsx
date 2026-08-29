import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `wired_inspect` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutWiredInspectItemProps {
    layout?: BoxLayout;
    onWiredInspect?: () => void;
}

export const FurniViewLayoutWiredInspectItem = ({ layout, onWiredInspect }: FurniViewLayoutWiredInspectItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="wired_inspect"
            onPointerTap={onWiredInspect}
            layout={{ width: 59, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.wired_inspect')}
        </Button>
    );
};
