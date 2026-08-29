import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1589_layout_info_pets2_xml` (layout "ctlg_pets2", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoPets2_1589LayoutProps {
    ctlgPets2?: LayoutInfoPets2_1589LayoutCtlgPets2Props;
    layout?: BoxLayout;
}

export const LayoutInfoPets2_1589Layout = ({ ctlgPets2, layout }: LayoutInfoPets2_1589LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutInfoPets2_1589LayoutCtlgPets2 {...ctlgPets2} />
        </Region>
    );
};

/** Named region `ctlg_pets2` of LayoutInfoPets2_1589Layout - configured through the parent's `ctlgPets2` prop. */
export interface LayoutInfoPets2_1589LayoutCtlgPets2Props {
    captionCtlgText1?: string;
    captionCtlgText2?: string;
    captionCtlgText3?: string;
    layout?: BoxLayout;
    srcCtlgTeaserimg1?: string;
    tags?: string[];
}

export const LayoutInfoPets2_1589LayoutCtlgPets2 = ({ captionCtlgText1, captionCtlgText2, captionCtlgText3, layout, srcCtlgTeaserimg1, tags }: LayoutInfoPets2_1589LayoutCtlgPets2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_pets2"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#8899a2"
                layout={{ position: 'absolute', left: 10, width: 340, top: 140, height: 310 }}
            >
                <ThemeImage
                    name="ctlg_teaserimg_1"
                    src={srcCtlgTeaserimg1 ?? '${image.library.url}catalogue/ctlg_pet_note.gif'}
                    layout={{ position: 'absolute', left: 20, width: 57, top: 10, height: 57 }}
                />
                <Region
                    name="ctlg_text_1"
                    layout={{ position: 'absolute', left: 85, width: 234, top: 26, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgText1 ?? t('lorem.title')}
                        textStyle="text-style-u-headline-medium"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 234 }}
                    />
                </Region>
                <Region
                    name="ctlg_text_2"
                    layout={{ position: 'absolute', left: 20, width: 297, top: 72, height: 139, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgText2 ?? t('lorem.newline')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 297 }}
                    />
                </Region>
                <Region
                    name="ctlg_text_3"
                    layout={{ position: 'absolute', left: 20, width: 306, top: 240, height: 44, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgText3 ?? t('lorem.content')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 306 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
