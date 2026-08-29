import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1775_dropmenu_3_xml` (layout "habbo_window_layout_dropmenu_3", 40x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Dropmenu3LayoutProps {
    captionDROPLISTTITLETEXT?: string;
    dROPLISTITEMLIST?: Dropmenu3LayoutDROPLISTITEMLISTProps;
    dROPLISTREGION?: Dropmenu3LayoutDROPLISTREGIONProps;
    layout?: BoxLayout;
}

export const Dropmenu3Layout = ({ captionDROPLISTTITLETEXT, dROPLISTITEMLIST, dROPLISTREGION, layout }: Dropmenu3LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 20, ...layout }}>
            <Region
                name="_DROPLIST_TITLETEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 6, right: 24, top: 4, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDROPLISTTITLETEXT ?? ''}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Dropmenu3LayoutDROPLISTITEMLIST
                tags={[ '_EXCLUDE', 'list' ]}
                {...dROPLISTITEMLIST}
            />
            <Dropmenu3LayoutDROPLISTREGION
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                {...dROPLISTREGION}
            />
        </Region>
    );
};

/** Named region `_DROPLIST_ITEMLIST` of Dropmenu3Layout - configured through the parent's `dROPLISTITEMLIST` prop. */
export interface Dropmenu3LayoutDROPLISTITEMLISTProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const Dropmenu3LayoutDROPLISTITEMLIST = ({ layout, tags }: Dropmenu3LayoutDROPLISTITEMLISTProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 14, ...layout }}
        >
            <Region
                name="_DROPLIST_ITEMLIST"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `_DROPLIST_REGION` of Dropmenu3Layout - configured through the parent's `dROPLISTREGION` prop. */
export interface Dropmenu3LayoutDROPLISTREGIONProps {
    layout?: BoxLayout;
    onDROPLISTREGION?: () => void;
    tags?: string[];
}

export const Dropmenu3LayoutDROPLISTREGION = ({ layout, onDROPLISTREGION, tags }: Dropmenu3LayoutDROPLISTREGIONProps) => {
    return (
        <Region
            name="_DROPLIST_REGION"
            tags={tags}
            onPointerTap={onDROPLISTREGION}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18, ...layout }}
        />
    );
};
