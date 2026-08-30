import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2591_dropmenu_item_black_xml` (layout "habbo_window_layout_dropmenu_item", 8x12) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DropmenuItemBlackLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const DropmenuItemBlackLayout = ({ captionBTNTEXT, layout }: DropmenuItemBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 8, height: 12, ...layout }}>
            <ThemeText
                text={captionBTNTEXT ?? ''}
                textStyle="text-style-regular"
                textOptions={{ fill: '#ffffff' }}
                name="_BTN_TEXT"
                layout={{ position: 'absolute', left: 0, right: 0, alignSelf: 'center', height: 12 }}
            />
        </Region>
    );
};
