import { BoxLayout, Region } from '#base/theme';

/** Generated from `2591_dropmenu_item_black_xml` (layout "habbo_window_layout_dropmenu_item", 8x12) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DropmenuItemBlackLayoutProps {
    layout?: BoxLayout;
}

export const DropmenuItemBlackLayout = ({ layout }: DropmenuItemBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 8, height: 12, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            />
        </Region>
    );
};
