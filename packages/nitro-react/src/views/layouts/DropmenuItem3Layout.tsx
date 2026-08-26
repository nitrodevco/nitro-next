import { BoxLayout, Region } from '#base/theme';

/** Generated from `2699_dropmenu_item_3_xml` (layout "habbo_window_layout_dropmenu_item_3", 8x12) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DropmenuItem3LayoutProps {
    layout?: BoxLayout;
}

export const DropmenuItem3Layout = ({ layout }: DropmenuItem3LayoutProps) => {
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
