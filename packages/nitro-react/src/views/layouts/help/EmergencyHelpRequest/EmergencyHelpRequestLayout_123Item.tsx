import { useTranslation } from '#base/context';
import { BoxLayout, RadioButton } from '#base/theme';

/** Row template `123` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayout_123ItemProps {
    layout?: BoxLayout;
    on_123?: () => void;
}

export const EmergencyHelpRequestLayout_123Item = ({ layout, on_123 }: EmergencyHelpRequestLayout_123ItemProps) => {
    const t = useTranslation();

    return (
        <RadioButton
            variant="100"
            name="123"
            onPointerTap={on_123}
            layout={{ width: 270, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100, ...layout }}
        >
            {t('help.emergency.main.step.one.topic.123')}
        </RadioButton>
    );
};
