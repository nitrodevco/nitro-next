import { useTranslation } from '#base/context';
import { BoxLayout, RadioButton } from '#base/theme';

/** Row template `122` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayout_122ItemProps {
    layout?: BoxLayout;
    on_122?: () => void;
}

export const EmergencyHelpRequestLayout_122Item = ({ layout, on_122 }: EmergencyHelpRequestLayout_122ItemProps) => {
    const t = useTranslation();

    return (
        <RadioButton
            variant="100"
            name="122"
            onPointerTap={on_122}
            layout={{ width: 270, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100, ...layout }}
        >
            {t('help.emergency.main.step.one.topic.122')}
        </RadioButton>
    );
};
