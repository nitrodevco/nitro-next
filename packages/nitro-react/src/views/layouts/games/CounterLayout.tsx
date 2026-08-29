import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `286_counter_xml` (layout "counter", 164x164) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CounterLayoutProps {
    layout?: BoxLayout;
    srcCounterBitmap?: string;
}

export const CounterLayout = ({ layout, srcCounterBitmap }: CounterLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 164, height: 164, ...layout }}>
            <ThemeImage
                name="counterBitmap"
                tags={[ 'bitmap' ]}
                params={3264}
                src={srcCounterBitmap ?? layoutImage('explosion001.png')}
                layout={{ position: 'absolute', marginLeft: 171, marginRight: -171, width: 164, alignSelf: 'center', marginTop: 131, marginBottom: -131, height: 164, minWidth: 164, minHeight: 164 }}
            />
        </Region>
    );
};
