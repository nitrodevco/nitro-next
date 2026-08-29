import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1813_illumina_light_dropmenu_item_xml` (layout "illumina_light_dropmenu_item", 8x12) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IlluminaLightDropmenuItemLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const IlluminaLightDropmenuItemLayout = ({ captionBTNTEXT, layout }: IlluminaLightDropmenuItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 8, height: 12, ...layout }}>
            <Region
                name="_BTN_TEXT"
                layout={{ position: 'absolute', left: 0, right: 0, alignSelf: 'center', height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-il-regular"
                />
            </Region>
        </Region>
    );
};
