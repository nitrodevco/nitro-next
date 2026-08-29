import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2150_separator_xml` (layout "illumina_border", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SeparatorLayoutProps {
    children?: SeparatorLayoutChildrenProps;
    layout?: BoxLayout;
    srcCanvas?: string;
}

export const SeparatorLayout = ({ children, layout, srcCanvas }: SeparatorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="canvas"
                    src={srcCanvas}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <SeparatorLayoutChildren {...children} />
            </Region>
        </Region>
    );
};

/** Named region `children` of SeparatorLayout - configured through the parent's `children` prop. */
export interface SeparatorLayoutChildrenProps {
    layout?: BoxLayout;
}

export const SeparatorLayoutChildren = ({ layout }: SeparatorLayoutChildrenProps) => {
    return (
        <Region
            name="children"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};
