/**
 * `wired_setup.uibuilder.presets.sections.UsageWarningSection` - a collapsible, initially
 * expanded section titled `wiredfurni.params.general_box_warning` whose text wraps in the style's
 * `redTextColor`.
 */
import { useTranslation } from '#base/context/system';

import { WiredSection } from './WiredSection';
import { useWiredStyle } from './WiredStyleContext';
import { WiredText } from './WiredText';

export interface WiredUsageWarningSectionProps {
    /** The warning - a literal or `${key}`. */
    text: string;
}

export const WiredUsageWarningSection = ({ text }: WiredUsageWarningSectionProps) => {
    const style = useWiredStyle();
    const t = useTranslation();

    return (
        <WiredSection
            title={t('wiredfurni.params.general_box_warning', 'general_box_warning')}
            collapsible
        >
            <WiredText
                text={text}
                color={style.redTextColor}
            />
        </WiredSection>
    );
};
