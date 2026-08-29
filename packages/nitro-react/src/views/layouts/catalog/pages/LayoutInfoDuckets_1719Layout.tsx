import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1719_layout_info_duckets_xml` (layout "ctlg_info_duckets", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutInfoDuckets_1719LayoutProps {
    ctlgInfoDuckets?: LayoutInfoDuckets_1719LayoutCtlgInfoDucketsProps;
    layout?: BoxLayout;
}

export const LayoutInfoDuckets_1719Layout = ({ ctlgInfoDuckets, layout }: LayoutInfoDuckets_1719LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutInfoDuckets_1719LayoutCtlgInfoDuckets {...ctlgInfoDuckets} />
        </Region>
    );
};

/** Named region `ctlg_info_duckets` of LayoutInfoDuckets_1719Layout - configured through the parent's `ctlgInfoDuckets` prop. */
export interface LayoutInfoDuckets_1719LayoutCtlgInfoDucketsProps {
    captionCtlgDescription?: string;
    layout?: BoxLayout;
    srcDucketsInfoIllustration?: string;
}

export const LayoutInfoDuckets_1719LayoutCtlgInfoDuckets = ({ captionCtlgDescription, layout, srcDucketsInfoIllustration }: LayoutInfoDuckets_1719LayoutCtlgInfoDucketsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctlg_info_duckets"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ctlg_description"
                layout={{ position: 'absolute', left: 24, width: 226, top: 19, height: 420, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCtlgDescription ?? t('loremipsum.html')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 226 }}
                />
            </Region>
            <ThemeImage
                name="duckets_info_illustration"
                src={srcDucketsInfoIllustration ?? '${image.library.url}catalogue/duckets_info_illustration.gif'}
                layout={{ position: 'absolute', left: 236, width: 123, top: 10, height: 360 }}
            />
        </Region>
    );
};
