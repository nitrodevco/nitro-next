/**
 * `conditions/§_-02a§.createTimezoneSection` - the `time.timezone_selection` section of
 * `TimeMatches` and `DateMatches`: a dropdown of the zones (`wiredfurni.tooltip.timezone` as its
 * caption), hidden while there is only one zone to choose.
 */
import { isTimezoneSectionVisible, TimezoneConditionForm } from '#base/wired';

import { WiredDropdown } from '../../../kit/WiredDropdown';
import { WiredSection } from '../../../kit/WiredSection';

export interface ConditionTimezoneSectionProps {
    form: TimezoneConditionForm;
    onSelect: (timezoneId: number) => void;
}

export const ConditionTimezoneSection = ({ form, onSelect }: ConditionTimezoneSectionProps) => {
    if (!isTimezoneSectionVisible(form)) return null;

    return (
        <WiredSection title="${wiredfurni.params.time.timezone_selection}">
            <WiredDropdown
                options={form.timezones.map((timezone, id) => ({ id, label: timezone }))}
                selected={form.timezoneId}
                onSelect={onSelect}
                caption="${wiredfurni.tooltip.timezone}"
            />
        </WiredSection>
    );
};
