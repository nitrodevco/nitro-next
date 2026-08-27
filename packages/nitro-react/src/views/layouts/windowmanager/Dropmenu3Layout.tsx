import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1775_dropmenu_3_xml` (layout "habbo_window_layout_dropmenu_3", 40x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Dropmenu3LayoutProps {
    captionDROPLISTTITLETEXT?: string;
    layout?: BoxLayout;
}

export const Dropmenu3Layout = ({ captionDROPLISTTITLETEXT, layout }: Dropmenu3LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 20, ...layout }}>
            <Region
                name="_DROPLIST_TITLETEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 6, width: 10, top: 4, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDROPLISTTITLETEXT ?? ''}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 2, width: 36, top: 2, height: 14 }}
            >
                <Region
                    name="_DROPLIST_ITEMLIST"
                    tags={[ '_EXCLUDE', 'list' ]}
                    layout={{ flexDirection: 'column', width: '100%' }}
                />
            </ScrollArea>
            <Region
                name="_DROPLIST_REGION"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                layout={{ position: 'absolute', left: 6, width: 28, top: 2, height: 18 }}
            />
        </Region>
    );
};
