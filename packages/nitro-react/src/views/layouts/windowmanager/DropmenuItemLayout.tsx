import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2237_dropmenu_item_xml` (layout "habbo_window_layout_dropmenu_item", 8x12) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DropmenuItemLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const DropmenuItemLayout = ({ captionBTNTEXT, layout }: DropmenuItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 8, height: 12, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 0, width: 8, top: 0, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-regular"
                />
            </Region>
        </Region>
    );
};
