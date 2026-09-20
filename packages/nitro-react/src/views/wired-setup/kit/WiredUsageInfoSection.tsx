/**
 * `wired_setup.uibuilder.presets.sections.UsageInfoSection` - a collapsible section of help text:
 * the text wraps in the style's `softTextColor`, under the title `wiredfurni.params.general_box_info`
 * unless one is given. It starts expanded, or folded with `collapsed`
 * (`SectionParam.COLLAPSED` / `SectionParam.§_-MG§`).
 */
import { useTranslation } from '#base/context/system';

import { WiredSection } from './WiredSection';
import { useWiredStyle } from './WiredStyleContext';
import { WiredText } from './WiredText';

export interface WiredUsageInfoSectionProps {
    /** The text - a literal or `${key}`. */
    text: string;
    /** The constructor's `param5`: starts folded. Default `false`. */
    collapsed?: boolean;
    /** `param6` - a literal or `${key}`. Default: `wiredfurni.params.general_box_info`. */
    title?: string;
}

export const WiredUsageInfoSection = ({ text, collapsed = false, title }: WiredUsageInfoSectionProps) => {
    const style = useWiredStyle();
    const t = useTranslation();

    return (
        <WiredSection
            title={title ?? t('wiredfurni.params.general_box_info', 'general_box_info')}
            collapsible
            defaultCollapsed={collapsed}
        >
            <WiredText
                text={text}
                color={style.softTextColor}
            />
        </WiredSection>
    );
};
