import { BoxLayout, Region } from '#base/theme';

/** Generated from `1139_container_view_xml` (layout "container_view", 0x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ContainerViewLayoutProps {
    layout?: BoxLayout;
}

export const ContainerViewLayout = ({ layout }: ContainerViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 0, height: 0, ...layout }}>
            <Region
                name="container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 0, top: 0, height: 0 }}
            />
        </Region>
    );
};
