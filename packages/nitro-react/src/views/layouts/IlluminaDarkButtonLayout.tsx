import { BoxLayout, Region } from '#base/theme';

/** Generated from `2594_illumina_dark_button_xml` (layout "illumina_dark_button", 28x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaDarkButtonLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaDarkButtonLayout = ({ layout }: IlluminaDarkButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 28, height: 28, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            />
        </Region>
    );
};
