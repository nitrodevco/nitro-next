import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1539_layout_info_loyalty_xml` (layout "ctlg_info_loyalty", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoLoyalty_1539LayoutProps {
    captionCtlgDescription?: string;
    layout?: BoxLayout;
    srcLoyaltyInfoIllustration?: string;
}

export const LayoutInfoLoyalty_1539Layout = ({ captionCtlgDescription, layout, srcLoyaltyInfoIllustration }: LayoutInfoLoyalty_1539LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_info_loyalty"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="ctlg_description"
                    layout={{ position: 'absolute', left: 24, width: 226, top: 89, height: 322, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCtlgDescription ?? t('loremipsum.html')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 226 }}
                    />
                </Region>
                <ThemeImage
                    name="loyalty_info_illustration"
                    src={srcLoyaltyInfoIllustration ?? '${image.library.url}catalogue/diamond_info_illustration.gif'}
                    layout={{ position: 'absolute', right: 0, width: 123, bottom: 1, height: 350 }}
                />
            </Region>
        </Region>
    );
};
