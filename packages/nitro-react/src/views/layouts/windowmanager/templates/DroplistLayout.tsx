import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1947_droplist_xml` (layout "habbo_window_layout_droplist", 40x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DroplistLayoutProps {
    captionDROPLISTTITLETEXT?: string;
    dROPLISTITEMLIST?: DroplistLayoutDROPLISTITEMLISTProps;
    dROPLISTREGION?: DroplistLayoutDROPLISTREGIONProps;
    layout?: BoxLayout;
}

export const DroplistLayout = ({ captionDROPLISTTITLETEXT, dROPLISTITEMLIST, dROPLISTREGION, layout }: DroplistLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 22, ...layout }}>
            <Region
                name="_DROPLIST_TITLETEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 10, right: 20, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDROPLISTTITLETEXT ?? ''}
                    textStyle="text-style-regular"
                />
            </Region>
            <DroplistLayoutDROPLISTITEMLIST
                tags={[ '_EXCLUDE', 'list' ]}
                {...dROPLISTITEMLIST}
            />
            <DroplistLayoutDROPLISTREGION
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                {...dROPLISTREGION}
            />
        </Region>
    );
};

/** Named region `_DROPLIST_ITEMLIST` of DroplistLayout - configured through the parent's `dROPLISTITEMLIST` prop. */
export interface DroplistLayoutDROPLISTITEMLISTProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const DroplistLayoutDROPLISTITEMLIST = ({ layout, tags }: DroplistLayoutDROPLISTITEMLISTProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18, ...layout }}
        >
            <Region
                name="_DROPLIST_ITEMLIST"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `_DROPLIST_REGION` of DroplistLayout - configured through the parent's `dROPLISTREGION` prop. */
export interface DroplistLayoutDROPLISTREGIONProps {
    layout?: BoxLayout;
    onDROPLISTREGION?: () => void;
    tags?: string[];
}

export const DroplistLayoutDROPLISTREGION = ({ layout, onDROPLISTREGION, tags }: DroplistLayoutDROPLISTREGIONProps) => {
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
