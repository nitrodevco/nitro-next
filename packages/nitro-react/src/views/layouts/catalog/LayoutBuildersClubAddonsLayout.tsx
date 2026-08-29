import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { BuilderAddonsWidget, BuilderAddonsWidgetProps } from '#base/views/layouts/catalog/widgets/BuilderAddonsWidget';

/** Generated from `1673_layout_builders_club_addons_xml` (layout "layout_builders_club_addons", 360x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutBuildersClubAddonsLayoutProps {
    ctlgBuildersClubAddons?: LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddonsProps;
    layout?: BoxLayout;
}

export const LayoutBuildersClubAddonsLayout = ({ ctlgBuildersClubAddons, layout }: LayoutBuildersClubAddonsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 508, ...layout }}>
            <LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddons {...ctlgBuildersClubAddons} />
        </Region>
    );
};

/** Named region `ctlg_builders_club_addons` of LayoutBuildersClubAddonsLayout - configured through the parent's `ctlgBuildersClubAddons` prop. */
export interface LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddonsProps {
    builderAddonsWidget?: BuilderAddonsWidgetProps;
    captionCtlgDescription?: string;
    layout?: BoxLayout;
}

export const LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddons = ({ builderAddonsWidget, captionCtlgDescription, layout }: LayoutBuildersClubAddonsLayoutCtlgBuildersClubAddonsProps) => {
    return (
        <Region
            name="ctlg_builders_club_addons"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_description"
                params={1}
                layout={{ position: 'absolute', left: 15, width: 276, top: 28, height: 80, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? '<b>Formatted</b> text'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 276 }}
                />
            </Region>
            <ThemeImage
                params={16}
                src="${image.library.url}catalogue/bc_bottom.png"
                layout={{ position: 'absolute', left: 290, width: 72, top: 316, height: 90 }}
            />
            <BuilderAddonsWidget
                layout={{ position: 'absolute', left: 14, width: 300, top: 108, bottom: 20 }}
                {...builderAddonsWidget}
            />
            <ThemeImage
                params={16}
                src="${image.library.url}catalogue/bc_top.png"
                layout={{ position: 'absolute', left: 249, width: 111, top: 21, height: 282 }}
            />
        </Region>
    );
};
