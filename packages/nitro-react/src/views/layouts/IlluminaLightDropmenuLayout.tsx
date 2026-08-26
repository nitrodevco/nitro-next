import { BoxLayout, Region, ScrollArea } from '#base/theme';

/** Generated from `1732_illumina_light_dropmenu_xml` (layout "illumina_light_layout_dropmenu", 40x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightDropmenuLayoutProps {
    layout?: BoxLayout;
}

export const IlluminaLightDropmenuLayout = ({ layout }: IlluminaLightDropmenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 22, ...layout }}>
            <Region
                name="_DROPLIST_TITLETEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 10, width: 10, top: 3, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            />
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 6, width: 28, top: 2, height: 18 }}
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
