import { BoxLayout, Region } from '#base/theme';

/** Generated from `1139_container_view_xml` (layout "container_view", 0x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ContainerViewLayoutProps {
    container?: ContainerViewLayoutContainerProps;
    layout?: BoxLayout;
}

export const ContainerViewLayout = ({ container, layout }: ContainerViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 0, height: 0, ...layout }}>
            <ContainerViewLayoutContainer {...container} />
        </Region>
    );
};

/** Named region `container` of ContainerViewLayout - configured through the parent's `container` prop. */
export interface ContainerViewLayoutContainerProps {
    layout?: BoxLayout;
}

export const ContainerViewLayoutContainer = ({ layout }: ContainerViewLayoutContainerProps) => {
    return (
        <Region
            name="container"
            layout={{ position: 'absolute', left: 0, width: 0, top: 0, height: 0, ...layout }}
        />
    );
};
