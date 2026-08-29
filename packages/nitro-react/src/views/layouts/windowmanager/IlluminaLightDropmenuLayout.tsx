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
                params={2147483792}
                layout={{ position: 'absolute', left: 10, right: 20, top: 3, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDROPLISTTITLETEXT ?? ''}
                    textStyle="text-style-il-regular"
                />
            </Region>
            <IlluminaLightDropmenuLayoutDROPLISTITEMLIST {...dROPLISTITEMLIST} />
            <IlluminaLightDropmenuLayoutDROPLISTREGION {...dROPLISTREGION} />
        </Region>
    );
};

/** Named region `_DROPLIST_ITEMLIST` of IlluminaLightDropmenuLayout - configured through the parent's `dROPLISTITEMLIST` prop. */
export interface IlluminaLightDropmenuLayoutDROPLISTITEMLISTProps {
    layout?: BoxLayout;
}

export const IlluminaLightDropmenuLayoutDROPLISTITEMLIST = ({ layout }: IlluminaLightDropmenuLayoutDROPLISTITEMLISTProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18, ...layout }}
        >
            <Region
                name="_DROPLIST_ITEMLIST"
                tags={[ '_EXCLUDE', 'list' ]}
                params={131216}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `_DROPLIST_REGION` of IlluminaLightDropmenuLayout - configured through the parent's `dROPLISTREGION` prop. */
export interface IlluminaLightDropmenuLayoutDROPLISTREGIONProps {
    layout?: BoxLayout;
    onDROPLISTREGION?: () => void;
}

export const IlluminaLightDropmenuLayoutDROPLISTREGION = ({ layout, onDROPLISTREGION }: IlluminaLightDropmenuLayoutDROPLISTREGIONProps) => {
    return (
        <Region
            name="_DROPLIST_REGION"
            tags={[ '_EXCLUDE', '_INTERNAL' ]}
            params={2147483793}
            onPointerTap={onDROPLISTREGION}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18, ...layout }}
        />
    );
};
