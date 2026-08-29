import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1810_dropmenu_xml` (layout "habbo_window_layout_dropmenu", 40x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DropmenuLayoutProps {
    captionDROPLISTTITLETEXT?: string;
    dROPLISTITEMLIST?: DropmenuLayoutDROPLISTITEMLISTProps;
    dROPLISTREGION?: DropmenuLayoutDROPLISTREGIONProps;
    layout?: BoxLayout;
}

export const DropmenuLayout = ({ captionDROPLISTTITLETEXT, dROPLISTITEMLIST, dROPLISTREGION, layout }: DropmenuLayoutProps) => {
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
            <DropmenuLayoutDROPLISTITEMLIST {...dROPLISTITEMLIST} />
            <DropmenuLayoutDROPLISTREGION {...dROPLISTREGION} />
        </Region>
    );
};

/** Named region `_DROPLIST_ITEMLIST` of DropmenuLayout - configured through the parent's `dROPLISTITEMLIST` prop. */
export interface DropmenuLayoutDROPLISTITEMLISTProps {
    layout?: BoxLayout;
}

export const DropmenuLayoutDROPLISTITEMLIST = ({ layout }: DropmenuLayoutDROPLISTITEMLISTProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18, ...layout }}
        >
            <Region
                name="_DROPLIST_ITEMLIST"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `_DROPLIST_REGION` of DropmenuLayout - configured through the parent's `dROPLISTREGION` prop. */
export interface DropmenuLayoutDROPLISTREGIONProps {
    layout?: BoxLayout;
    onDROPLISTREGION?: () => void;
}

export const DropmenuLayoutDROPLISTREGION = ({ layout, onDROPLISTREGION }: DropmenuLayoutDROPLISTREGIONProps) => {
    return (
        <Region
            name="_DROPLIST_REGION"
            onPointerTap={onDROPLISTREGION}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18, ...layout }}
        />
    );
};
