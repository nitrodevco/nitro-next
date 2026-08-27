import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2350_updating_timestamp_xml` (layout "illumina_border", 100x16) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UpdatingTimestampLayoutProps {
    layout?: BoxLayout;
}

export const UpdatingTimestampLayout = ({ layout }: UpdatingTimestampLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 16, ...layout }}>
            <Region
                params={2192}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text="Just now."
                    textOptions={{ fill: '#555555', align: 'right' }}
                />
            </Region>
        </Region>
    );
};
