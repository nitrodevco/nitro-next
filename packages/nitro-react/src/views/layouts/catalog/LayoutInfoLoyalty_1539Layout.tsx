import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1539_layout_info_loyalty_xml` (layout "ctlg_info_loyalty", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoLoyalty_1539LayoutProps {
    ctlgInfoLoyalty?: LayoutInfoLoyalty_1539LayoutCtlgInfoLoyaltyProps;
    layout?: BoxLayout;
}

export const LayoutInfoLoyalty_1539Layout = ({ ctlgInfoLoyalty, layout }: LayoutInfoLoyalty_1539LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutInfoLoyalty_1539LayoutCtlgInfoLoyalty {...ctlgInfoLoyalty} />
        </Region>
    );
};

/** Named region `ctlg_info_loyalty` of LayoutInfoLoyalty_1539Layout - configured through the parent's `ctlgInfoLoyalty` prop. */
export interface LayoutInfoLoyalty_1539LayoutCtlgInfoLoyaltyProps {
    captionCtlgDescription?: string;
    layout?: BoxLayout;
    srcLoyaltyInfoIllustration?: string;
}

export const LayoutInfoLoyalty_1539LayoutCtlgInfoLoyalty = ({ captionCtlgDescription, layout, srcLoyaltyInfoIllustration }: LayoutInfoLoyalty_1539LayoutCtlgInfoLoyaltyProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_info_loyalty"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <Region
                name="ctlg_description"
                params={1}
                layout={{ position: 'absolute', left: 24, width: 226, top: 89, height: 322, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('loremipsum.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 226 }}
                />
            </Region>
            <ThemeImage
                name="loyalty_info_illustration"
                tags={[ 'S' ]}
                src={srcLoyaltyInfoIllustration ?? '${image.library.url}catalogue/diamond_info_illustration.gif'}
                layout={{ position: 'absolute', left: 237, width: 123, top: 109, height: 350 }}
            />
        </Region>
    );
};
