import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `entity_template` of SeasonalCalendarLayout - configured through the parent's `entityTemplate` prop. */
export interface SeasonalCalendarLayoutEntityTemplateProps {
    captionEntityIndicatorText?: string;
    entityMouseRegion?: ReactNode;
    layout?: BoxLayout;
    onEntityMouseRegion?: () => void;
    srcEntityBitmap?: string;
    srcEntityIndicatorStatus?: string;
    srcEntityMouseover?: string;
    tintEntityBitmap?: string;
    tintEntityIndicatorStatus?: string;
    tintEntityMouseover?: string;
}

export const SeasonalCalendarLayoutEntityTemplate = ({ captionEntityIndicatorText, entityMouseRegion, layout, onEntityMouseRegion, srcEntityBitmap, srcEntityIndicatorStatus, srcEntityMouseover, tintEntityBitmap, tintEntityIndicatorStatus, tintEntityMouseover }: SeasonalCalendarLayoutEntityTemplateProps) => {
    return (
        <Region
            name="entity_template"
            layout={{ position: 'absolute', left: 29, width: 79, top: 0, height: 312, ...layout }}
        >
            <ThemeImage
                name="entity_bitmap"
                src={srcEntityBitmap}
                tint={tintEntityBitmap}
                layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 289 }}
            />
            <Border
                variant="3"
                name="entity_indicator_edge"
                layout={{ position: 'absolute', left: 5, width: 67, top: 293, height: 18 }}
            />
            <Border
                variant="3"
                name="entity_indicator"
                tintColor="#408030"
                layout={{ position: 'absolute', left: 6, width: 65, top: 294, height: 16 }}
            >
                <Region
                    name="entity_indicator_text"
                    layout={{ position: 'absolute', left: 0, width: 66, top: -2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionEntityIndicatorText ?? 'date'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="entity_indicator_status"
                    src={srcEntityIndicatorStatus}
                    tint={tintEntityIndicatorStatus}
                    layout={{ position: 'absolute', left: 50, width: 16, top: 3, height: 14 }}
                />
            </Border>
            <ThemeImage
                name="entity_mouseover"
                src={srcEntityMouseover}
                tint={tintEntityMouseover}
                layout={{ position: 'absolute', left: 0, width: 79, top: 53, height: 81 }}
            />
            <Region
                name="entity_mouse_region"
                onPointerTap={onEntityMouseRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 313 }}
            >
                {entityMouseRegion}
            </Region>
        </Region>
    );
};
