import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `report_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutReportContainerItemProps {
    layout?: BoxLayout;
    onReportRegion?: () => void;
    srcReportIcon?: string;
    visibleReportIcon?: boolean;
    visibleReportRegion?: boolean;
}

export const RoomInfoPopupBubbleLayoutReportContainerItem = ({ layout, onReportRegion, srcReportIcon, visibleReportIcon, visibleReportRegion }: RoomInfoPopupBubbleLayoutReportContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="report_container"
            layout={{ alignSelf: 'stretch', height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleReportRegion ?? true) && (
                <Region
                    name="report_region"
                    onPointerTap={onReportRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, bottom: 0 }}
                >
                    {(visibleReportIcon ?? true) && (
                        <ThemeImage
                            name="report_icon"
                            src={srcReportIcon ?? layoutImage('newnavigator_report_room.png')}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                        />
                    )}
                </Region>
            )}
            <ThemeText
                text={t('navigator.room.popup.report.room')}
                layout={{ position: 'absolute', left: 20, width: 202, top: 0, bottom: 3 }}
            />
        </Region>
    );
};
