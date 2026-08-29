import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `report_thread` of ThreadListItemLayout - pass real rows through its `items…` slot. */
export interface ThreadListItemLayoutReportThreadItemProps {
    layout?: BoxLayout;
    onReportThread?: () => void;
    srcIcon?: string;
    visibleIcon?: boolean;
}

export const ThreadListItemLayoutReportThreadItem = ({ layout, onReportThread, srcIcon, visibleIcon }: ThreadListItemLayoutReportThreadItemProps) => {
    return (
        <Region
            name="report_thread"
            backgroundColor="#ff9c65"
            onPointerTap={onReportThread}
            cursor="pointer"
            layout={{ width: 25, height: 40, flexShrink: 0, ...layout }}
        >
            {(visibleIcon ?? true) && (
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('forum_forum_report.png')}
                    layout={{ position: 'absolute', left: 4, right: 4, top: 12, bottom: 13 }}
                />
            )}
        </Region>
    );
};
