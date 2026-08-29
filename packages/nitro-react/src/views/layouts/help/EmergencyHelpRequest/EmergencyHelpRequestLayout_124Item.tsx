import { useTranslation } from '#base/context';
import { BoxLayout, RadioButton } from '#base/theme';

/** Row template `124` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayout_124ItemProps {
    layout?: BoxLayout;
    on_124?: () => void;
}

export const EmergencyHelpRequestLayout_124Item = ({ layout, on_124 }: EmergencyHelpRequestLayout_124ItemProps) => {
    const t = useTranslation();

    return (
        <RadioButton
            variant="100"
            name="124"
            onPointerTap={on_124}
            layout={{ width: 270, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100, ...layout }}
        >
            {t('help.emergency.main.step.one.topic.124')}
        </RadioButton>
    );
};
