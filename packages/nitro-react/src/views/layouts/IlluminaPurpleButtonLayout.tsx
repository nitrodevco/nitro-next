import { BoxLayout, Region } from '#base/theme';

/** Generated from `2566_illumina_purple_button_xml` (layout "illumina_purple_button", 48x48) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaPurpleButtonLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaPurpleButtonLayout = ({ layout }: IlluminaPurpleButtonLayoutProps) => {
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
