import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1810_dropmenu_xml` (layout "habbo_window_layout_dropmenu", 40x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DropmenuLayoutProps {
    captionDROPLISTTITLETEXT?: string;
    layout?: BoxLayout;
    onDROPLISTREGION?: () => void;
}

export const DropmenuLayout = ({ captionDROPLISTTITLETEXT, layout, onDROPLISTREGION }: DropmenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 22, ...layout }}>
            <Region
                name="_DROPLIST_TITLETEXT"
                layout={{ position: 'absolute', left: 10, right: 20, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDROPLISTTITLETEXT ?? ''}
                    textStyle="text-style-regular"
                />
            </Region>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18 }}
            >
                <Region
                    name="_DROPLIST_ITEMLIST"
                    layout={{ flexDirection: 'column', width: '100%' }}
                />
            </ScrollArea>
            <Region
                name="_DROPLIST_REGION"
                onPointerTap={onDROPLISTREGION}
                cursor="pointer"
                layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18 }}
            />
        </Region>
    );
};
