import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1656_layout_petcustomization_xml` (layout "ctlg_petcustomization", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPetcustomization_1656LayoutProps {
    layout?: BoxLayout;
}

export const LayoutPetcustomization_1656Layout = ({ layout }: LayoutPetcustomization_1656LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_petcustomization"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_selectproduct"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 8, width: 107, top: 133, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('catalog_selectproduct')}
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
                <Region
                    name="itemGridWidget"
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 180 }}
                />
                <Region
                    name="petPreviewWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                >
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 175, top: 0, height: 275 }}
                    >
                        <Border
                            variant="4"
                            name="petPreviewBackground"
                            params={16}
                            tintColor="#cccccc"
                            layout={{ width: '100%', height: '100%' }}
                        />
                    </Region>
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                    />
                    <Region
                        name="ctlg_product_name"
                        params={16}
                        layout={{ position: 'absolute', left: 8, width: 74, top: 12, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <Region
                        name="ctlg_description"
                        params={16}
                        layout={{ position: 'absolute', left: 8, width: 162, top: 31, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 162 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="purchaseWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
            </Region>
        </Region>
    );
};
