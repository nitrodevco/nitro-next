import { BoxLayout, Region } from '#base/theme';

/** Generated from `2774_illumina_light_button_xml` (layout "illumina_light_button", 48x48) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightButtonLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaLightButtonLayout = ({ layout }: IlluminaLightButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 48, height: 48, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            />
        </Region>
    );
};
