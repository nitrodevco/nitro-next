import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `sanction_info` of SanctionInfoLayout - pass real rows through its `items…` slot. */
export interface SanctionInfoLayoutSanctionInfoItemProps {
    captionSanctionInfo?: string;
    layout?: BoxLayout;
}

export const SanctionInfoLayoutSanctionInfoItem = ({ captionSanctionInfo, layout }: SanctionInfoLayoutSanctionInfoItemProps) => {
    return (
        <ThemeText
            text={captionSanctionInfo ?? 'sanction info'}
            textOptions={{ wordWrap: true, wordWrapWidth: 404 }}
            name="sanction_info"
            verticalAlign="top"
            layout={{ width: 404, flexShrink: 0, ...layout }}
        />
    );
};
