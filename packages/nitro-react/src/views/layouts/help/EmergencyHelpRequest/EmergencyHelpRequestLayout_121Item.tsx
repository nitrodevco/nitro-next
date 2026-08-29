import { useTranslation } from '#base/context';
import { BoxLayout, RadioButton } from '#base/theme';

/** Row template `121` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayout_121ItemProps {
    layout?: BoxLayout;
    on_121?: () => void;
}

export const EmergencyHelpRequestLayout_121Item = ({ layout, on_121 }: EmergencyHelpRequestLayout_121ItemProps) => {
    const t = useTranslation();

    return (
        <RadioButton
            variant="100"
            name="121"
            onPointerTap={on_121}
            layout={{ width: 270, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100, ...layout }}
        >
            {t('help.emergency.main.step.one.topic.121')}
        </RadioButton>
    );
};
