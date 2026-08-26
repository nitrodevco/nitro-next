import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1589_layout_info_pets2_xml` (layout "ctlg_pets2", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoPets2_1589LayoutProps {
    layout?: BoxLayout;
}

export const LayoutInfoPets2_1589Layout = ({ layout }: LayoutInfoPets2_1589LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_pets2"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Border
                    variant="2"
                    params={16}
                    tintColor="#8899a2"
                    layout={{ position: 'absolute', left: 10, width: 340, top: 140, height: 310 }}
                >
                    <ThemeImage
                        name="ctlg_teaserimg_1"
                        params={16}
                        src="${image.library.url}catalogue/ctlg_pet_note.gif"
                        layout={{ position: 'absolute', left: 20, width: 57, top: 10, height: 57 }}
                    />
                    <Region
                        name="ctlg_text_1"
                        params={16}
                        layout={{ position: 'absolute', left: 85, width: 234, top: 26, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.title')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 234 }}
                        />
                    </Region>
                    <Region
                        name="ctlg_text_2"
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 297, top: 72, height: 139, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.newline')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 297 }}
                        />
                    </Region>
                    <Region
                        name="ctlg_text_3"
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 306, top: 240, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('lorem.content')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 306 }}
                        />
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
