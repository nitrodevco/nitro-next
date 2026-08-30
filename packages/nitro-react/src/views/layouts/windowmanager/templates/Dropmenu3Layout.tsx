import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1775_dropmenu_3_xml` (layout "habbo_window_layout_dropmenu_3", 40x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface Dropmenu3LayoutProps {
    captionDROPLISTTITLETEXT?: string;
    dROPLISTREGION?: ReactNode;
    itemsDROPLISTITEMLIST?: ReactNode;
    layout?: BoxLayout;
    onDROPLISTREGION?: () => void;
}

export const Dropmenu3Layout = ({ captionDROPLISTTITLETEXT, dROPLISTREGION, itemsDROPLISTITEMLIST, layout, onDROPLISTREGION }: Dropmenu3LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 20, ...layout }}>
            <ThemeText
                text={captionDROPLISTTITLETEXT ?? ''}
                textStyle="text-style-u-regular"
                name="_DROPLIST_TITLETEXT"
                layout={{ position: 'absolute', left: 6, right: 24, top: 4, height: 12 }}
            />
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 14 }}
            >
                <Region
                    name="_DROPLIST_ITEMLIST"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    {itemsDROPLISTITEMLIST}
                </Region>
            </ScrollArea>
            <Region
                name="_DROPLIST_REGION"
                onPointerTap={onDROPLISTREGION}
                cursor="pointer"
                layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18 }}
            >
                {dROPLISTREGION}
            </Region>
        </Region>
    );
};
