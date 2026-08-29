import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `sanction_info` of SanctionInfoLayout - pass real rows through its `items…` slot. */
export interface SanctionInfoLayoutSanctionInfoItemProps {
    captionSanctionInfo?: string;
    layout?: BoxLayout;
}

export const SanctionInfoLayoutSanctionInfoItem = ({ captionSanctionInfo, layout }: SanctionInfoLayoutSanctionInfoItemProps) => {
    return (
        <Region
            name="sanction_info"
            layout={{ width: 404, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionSanctionInfo ?? 'sanction info'}
                textOptions={{ wordWrap: true, wordWrapWidth: 404 }}
            />
        </Region>
    );
};
