import { useTranslation } from '#base/context';
import { BoxLayout, Button } from '#base/theme';

/** Row template `save_branding_configuration` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutSaveBrandingConfigurationItemProps {
    layout?: BoxLayout;
    onSaveBrandingConfiguration?: () => void;
}

export const FurniViewLayoutSaveBrandingConfigurationItem = ({ layout, onSaveBrandingConfiguration }: FurniViewLayoutSaveBrandingConfigurationItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="1"
            name="save_branding_configuration"
            onPointerTap={onSaveBrandingConfiguration}
            layout={{ width: 175, height: 25, flexShrink: 0, ...layout }}
        >
            {t('infostand.button.savebranding')}
        </Button>
    );
};
