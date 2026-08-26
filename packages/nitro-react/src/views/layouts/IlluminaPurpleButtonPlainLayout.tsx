import { BoxLayout, Region } from '#base/theme';

/** Generated from `1820_illumina_purple_button_plain_xml` (layout "illumina_purple_button_plain", 28x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaPurpleButtonPlainLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaPurpleButtonPlainLayout = ({ layout }: IlluminaPurpleButtonPlainLayoutProps) => {
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
