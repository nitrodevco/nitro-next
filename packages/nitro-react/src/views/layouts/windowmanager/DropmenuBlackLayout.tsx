import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1893_dropmenu_black_xml` (layout "habbo_window_layout_dropmenu", 40x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DropmenuBlackLayoutProps {
    captionDROPLISTTITLETEXT?: string;
    layout?: BoxLayout;
    onDROPLISTREGION?: () => void;
}

export const DropmenuBlackLayout = ({ captionDROPLISTTITLETEXT, layout, onDROPLISTREGION }: DropmenuBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 22, ...layout }}>
            <Region
                name="_DROPLIST_TITLETEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                params={2147483792}
                layout={{ position: 'absolute', left: 10, right: 20, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDROPLISTTITLETEXT ?? ''}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18 }}
            >
                <Region
                    name="_DROPLIST_ITEMLIST"
                    tags={[ '_EXCLUDE', '_INTERNAL', 'list' ]}
                    params={131216}
                    layout={{ flexDirection: 'column', width: '100%' }}
                />
            </ScrollArea>
            <Region
                name="_DROPLIST_REGION"
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                params={2147483793}
                onPointerTap={onDROPLISTREGION}
                cursor="pointer"
                layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18 }}
            />
        </Region>
    );
};
