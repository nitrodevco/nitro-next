import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1601_layout_info_duckets_xml` (layout "ctlg_info_duckets", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoDuckets_1601LayoutProps {
    layout?: BoxLayout;
}

export const LayoutInfoDuckets_1601Layout = ({ layout }: LayoutInfoDuckets_1601LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_info_duckets"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="ctlg_description"
                    params={1}
                    layout={{ position: 'absolute', left: 24, width: 226, top: 89, height: 332, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('loremipsum.html')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 226 }}
                    />
                </Region>
                <ThemeImage
                    name="duckets_info_illustration"
                    tags={[ 'S' ]}
                    src="${image.library.url}catalogue/duckets_info_illustration.gif"
                    layout={{ position: 'absolute', left: 236, width: 123, top: 80, height: 360 }}
                />
            </Region>
        </Region>
    );
};
