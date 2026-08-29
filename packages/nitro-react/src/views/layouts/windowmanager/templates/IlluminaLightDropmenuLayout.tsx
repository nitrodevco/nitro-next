import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1732_illumina_light_dropmenu_xml` (layout "illumina_light_layout_dropmenu", 40x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightDropmenuLayoutProps {
    captionDROPLISTTITLETEXT?: string;
    dROPLISTITEMLIST?: IlluminaLightDropmenuLayoutDROPLISTITEMLISTProps;
    dROPLISTREGION?: IlluminaLightDropmenuLayoutDROPLISTREGIONProps;
    layout?: BoxLayout;
}

export const IlluminaLightDropmenuLayout = ({ captionDROPLISTTITLETEXT, dROPLISTITEMLIST, dROPLISTREGION, layout }: IlluminaLightDropmenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 22, ...layout }}>
            <Region
                name="_DROPLIST_TITLETEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 10, right: 20, top: 3, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDROPLISTTITLETEXT ?? ''}
                    textStyle="text-style-il-regular"
                />
            </Region>
            <IlluminaLightDropmenuLayoutDROPLISTITEMLIST
                tags={[ '_EXCLUDE', 'list' ]}
                {...dROPLISTITEMLIST}
            />
            <IlluminaLightDropmenuLayoutDROPLISTREGION
                tags={[ '_EXCLUDE', '_INTERNAL' ]}
                {...dROPLISTREGION}
            />
        </Region>
    );
};

/** Named region `_DROPLIST_ITEMLIST` of IlluminaLightDropmenuLayout - configured through the parent's `dROPLISTITEMLIST` prop. */
export interface IlluminaLightDropmenuLayoutDROPLISTITEMLISTProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const IlluminaLightDropmenuLayoutDROPLISTITEMLIST = ({ layout, tags }: IlluminaLightDropmenuLayoutDROPLISTITEMLISTProps) => {
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

/** Named region `_DROPLIST_REGION` of IlluminaLightDropmenuLayout - configured through the parent's `dROPLISTREGION` prop. */
export interface IlluminaLightDropmenuLayoutDROPLISTREGIONProps {
    layout?: BoxLayout;
    onDROPLISTREGION?: () => void;
    tags?: string[];
}

export const IlluminaLightDropmenuLayoutDROPLISTREGION = ({ layout, onDROPLISTREGION, tags }: IlluminaLightDropmenuLayoutDROPLISTREGIONProps) => {
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
