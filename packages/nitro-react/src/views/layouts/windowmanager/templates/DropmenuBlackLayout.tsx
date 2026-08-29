import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

/** Generated from `1893_dropmenu_black_xml` (layout "habbo_window_layout_dropmenu", 40x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DropmenuBlackLayoutProps {
    captionDROPLISTTITLETEXT?: string;
    dROPLISTITEMLIST?: DropmenuBlackLayoutDROPLISTITEMLISTProps;
    dROPLISTREGION?: DropmenuBlackLayoutDROPLISTREGIONProps;
    layout?: BoxLayout;
}

export const DropmenuBlackLayout = ({ captionDROPLISTTITLETEXT, dROPLISTITEMLIST, dROPLISTREGION, layout }: DropmenuBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 40, height: 22, ...layout }}>
            <Region
                name="_DROPLIST_TITLETEXT"
                layout={{ position: 'absolute', left: 10, right: 20, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDROPLISTTITLETEXT ?? ''}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <DropmenuBlackLayoutDROPLISTITEMLIST {...dROPLISTITEMLIST} />
            <DropmenuBlackLayoutDROPLISTREGION {...dROPLISTREGION} />
        </Region>
    );
};

/** Named region `_DROPLIST_ITEMLIST` of DropmenuBlackLayout - configured through the parent's `dROPLISTITEMLIST` prop. */
export interface DropmenuBlackLayoutDROPLISTITEMLISTProps {
    layout?: BoxLayout;
}

export const DropmenuBlackLayoutDROPLISTITEMLIST = ({ layout }: DropmenuBlackLayoutDROPLISTITEMLISTProps) => {
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

/** Named region `_DROPLIST_REGION` of DropmenuBlackLayout - configured through the parent's `dROPLISTREGION` prop. */
export interface DropmenuBlackLayoutDROPLISTREGIONProps {
    layout?: BoxLayout;
    onDROPLISTREGION?: () => void;
}

export const DropmenuBlackLayoutDROPLISTREGION = ({ layout, onDROPLISTREGION }: DropmenuBlackLayoutDROPLISTREGIONProps) => {
    return (
        <Region
            name="_DROPLIST_REGION"
            onPointerTap={onDROPLISTREGION}
            cursor="pointer"
            layout={{ position: 'absolute', left: 6, right: 6, top: 2, height: 18, ...layout }}
        />
    );
};
