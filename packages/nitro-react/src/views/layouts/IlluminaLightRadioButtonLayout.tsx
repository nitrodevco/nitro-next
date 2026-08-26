import { BoxLayout, Region } from '#base/theme';

/** Generated from `2066_illumina_light_radio_button_xml` (layout "illumina_light_radio_button", 50x12) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightRadioButtonLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaLightRadioButtonLayout = ({ layout }: IlluminaLightRadioButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 12, ...layout }}>
            <Region
                name="_CAPTION_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 12, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            />
        </Region>
    );
};
